import { Id } from "@/shared/domain/value-objects/Id";
import { Movie } from "../../domain/entities/Movie";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { MovieTitle } from "../../domain/value-objects/MovieTitle";
import { AppDataSource } from "@/shared/infra/database/TypeormClient";
import { MovieEntity } from "@/shared/infra/database/entities/MovieEntity";
import { TypeormMovieMapper } from "../mappers/TypeormMovieMapper";
import { injectable } from "tsyringe";

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

  async findByUserId(userId: Id): Promise<Movie[]> {
    const movies = await this.repository.findBy({
      userId: userId.value,
    });

    return movies.map((movie) => TypeormMovieMapper.toDomain(movie));
  }

  async findByTitle(userId: Id, movieTitle: MovieTitle): Promise<Movie[]> {
    const movies = await this.repository.findBy({
      userId: userId.value,
      title: movieTitle.value,
    });

    return movies.map((movie) => TypeormMovieMapper.toDomain(movie));
  }

  async findWatched(userId: Id): Promise<Movie[]> {
    const movies = await this.repository.findBy({
      userId: userId.value,
      watched: true,
    });

    return movies.map((movie) => TypeormMovieMapper.toDomain(movie));
  }

  async findUnwatched(userId: Id): Promise<Movie[]> {
    const movies = await this.repository.findBy({
      userId: userId.value,
      watched: false,
    });

    return movies.map((movie) => TypeormMovieMapper.toDomain(movie));
  }

  async filterByWatched(userId: Id, watched: boolean): Promise<Movie[]> {
    const movies = await this.repository.findBy({
      userId: userId.value,
      watched,
    });

    return movies.map((movie) => TypeormMovieMapper.toDomain(movie));
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
}
