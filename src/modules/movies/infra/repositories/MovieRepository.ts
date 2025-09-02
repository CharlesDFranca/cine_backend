import { Id } from "@/shared/domain/value-objects/Id";
import { Movie } from "../../domain/entities/Movie";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { MovieTitle } from "../../domain/value-objects/MovieTitle";
import { AppDataSource } from "@/shared/infra/database/TypeormClient";
import { MovieEntity } from "@/shared/infra/database/entities/MovieEntity";
import { TypeormMovieMapper } from "../mappers/TypeormMovieMapper";
import { injectable } from "tsyringe";
import { SortCriteria, SortDirection } from "../../domain/types/MovieTypes";

@injectable()
export class MovieRepository implements IMoviesRepository {
  private readonly repository = AppDataSource.getRepository(MovieEntity);

  async save(movie: Movie): Promise<void> {
    await this.repository.save(TypeormMovieMapper.toPersistence(movie));
  }

  async findById(movieId: Id): Promise<Movie | null> {
    const movie = await this.repository.findOneBy({ id: movieId.value });
    if (!movie) return null;

    return TypeormMovieMapper.toDomain(movie);
  }

  async findByTitle(
    userId: Id,
    movieTitle: MovieTitle,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]> {
    return await this.findWithOrder(
      { title: movieTitle.value, userId: userId.value },
      orderBy,
    );
  }

  async findByUserId(
    userId: Id,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]> {
    return await this.findWithOrder({ userId: userId.value }, orderBy);
  }

  async filterByWatched(
    userId: Id,
    watched: boolean,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]> {
    return await this.findWithOrder({ userId: userId.value, watched }, orderBy);
  }

  async exitsByTitleAndShowtime(movie: Movie): Promise<boolean> {
    const movieExists = await this.repository.findOneBy({
      title: movie.title.value,
      showtime: movie.showtime,
      userId: movie.userId.value,
    });

    return !!movieExists;
  }

  async update(movie: Movie): Promise<void> {
    await this.repository.save(TypeormMovieMapper.toPersistence(movie));
  }

  async delete(movieId: Id): Promise<void> {
    await this.repository.delete({ id: movieId.value });
  }

  private async findWithOrder(
    where: Partial<MovieEntity>,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]> {
    const movies = await this.repository.find({
      where,
      order: orderBy,
    });
    return movies.map(TypeormMovieMapper.toDomain);
  }
}
