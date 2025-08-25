import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { MovieDetailsDto } from "../dtos/MovieDtos";
import { MovieMapper } from "../mappers/MovieMapper";

type FindMovieUnwatchedInput = {
  userId: string;
};

type FindMovieUnwatchedOutput = MovieDetailsDto[];

@injectable()
export class FindMovieUnwatchedUseCase
  implements IUseCase<FindMovieUnwatchedInput, FindMovieUnwatchedOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    input: FindMovieUnwatchedInput,
  ): Promise<FindMovieUnwatchedOutput> {
    const userId = Id.refresh({ value: input.userId });

    const [user, movies] = await Promise.all([
      this.userRepository.findById(userId),
      this.movieRepository.findUnwatched(userId),
    ]);

    if (!user) {
      throw new UserNotFoundError("O usuário não foi encontrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    return movies.map((movie) => MovieMapper.toDetailsDto(movie));
  }
}
