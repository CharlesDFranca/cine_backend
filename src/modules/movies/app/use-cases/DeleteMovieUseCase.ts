import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { Id } from "@/shared/domain/value-objects/Id";
import { MovieNotFoundError } from "../errors/MovieNotFoundError";
import { IImageStorageService } from "@/shared/app/contracts/IImageStorageService";

type DeleteMovieInput = {
  movieId: string;
};

type DeleteMovieOutput = void;

@injectable()
export class DeleteMovieUseCase
  implements IUseCase<DeleteMovieInput, DeleteMovieOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("ImageStorageService")
    private readonly imageStorageService: IImageStorageService,
  ) {}

  async execute(input: DeleteMovieInput): Promise<void> {
    const movieId = Id.refresh({ value: input.movieId });

    const movie = await this.movieRepository.findById(movieId);

    if (!movie) {
      throw new MovieNotFoundError("O filme não foi cadastrado", {
        errorClass: this.constructor.name,
        movieId: movieId.value,
      });
    }

    if (movie.image) {
      await this.imageStorageService.delete(movie.image?.value);
    }

    await this.movieRepository.delete(movieId);
  }
}
