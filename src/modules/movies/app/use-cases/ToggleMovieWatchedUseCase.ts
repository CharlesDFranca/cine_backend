import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { Id } from "@/shared/domain/value-objects/Id";
import { IMovieWatchedService } from "../../domain/services/contracts/IMovieWatchedService";
import { MovieNotFoundError } from "../errors/MovieNotFoundError";

type ToggleMovieWatchedInput = {
  movieId: string;
};

type ToggleMovieWatchedOutput = void;

@injectable()
export class ToggleMovieWatchedUseCase
  implements IUseCase<ToggleMovieWatchedInput, ToggleMovieWatchedOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("MovieWatchedService")
    private readonly movieWatchedService: IMovieWatchedService,
  ) {}
  async execute(input: ToggleMovieWatchedInput): Promise<void> {
    const movieId = Id.refresh({ value: input.movieId });

    const movie = await this.movieRepository.findById(movieId);

    if (!movie) {
      throw new MovieNotFoundError("O filme não foi cadastrado", {
        errorClass: this.constructor.name,
        movieId: movieId.value,
      });
    }

    if (movie.watched) {
      this.movieWatchedService.markAsUnwatched(movie);
    } else {
      this.movieWatchedService.markAsWatched(movie);
    }

    await this.movieRepository.update(movie);
  }
}
