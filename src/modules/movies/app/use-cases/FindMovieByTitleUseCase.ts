import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { Movie } from "../../domain/entities/Movie";
import { MovieTitle } from "../../domain/value-objects/MovieTitle";

type FindMovieByTitleInput = {
  title: string;
};

type FindMovieByTitleOutput = {
  movie: Movie;
};

@injectable()
export class FindMovieByTitleUseCase
  implements IUseCase<FindMovieByTitleInput, FindMovieByTitleOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
  ) {}
  async execute(input: FindMovieByTitleInput): Promise<FindMovieByTitleOutput> {
    const movieTitle = MovieTitle.create({ value: input.title });

    const movie = await this.movieRepository.findByTitle(movieTitle);
    if (!movie) {
      throw new Error("O filme não foi cadastrado");
    }
    return { movie };
  }
}
