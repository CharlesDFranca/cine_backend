import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { Id } from "@/shared/domain/value-objects/Id";

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
  ) {}
  async execute(input: DeleteMovieInput): Promise<void> {
    const movieId = Id.refresh({ value: input.movieId });

    await this.movieRepository.delete(movieId);
  }
}
