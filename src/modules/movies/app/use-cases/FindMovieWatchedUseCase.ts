import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { Movie } from "../../domain/entities/Movie";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";

type FindMovieWatchedInput = {
  userId: string;
};

type FindMovieWatchedOutput = Movie[];

@injectable()
export class FindMovieWatchedUseCase
  implements IUseCase<FindMovieWatchedInput, FindMovieWatchedOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: FindMovieWatchedInput): Promise<FindMovieWatchedOutput> {
    const userId = Id.refresh({ value: input.userId });

    const [user, movies] = await Promise.all([
      this.userRepository.findById(userId),
      this.movieRepository.findWatched(userId),
    ]);

    if (!user) {
      throw new UserNotFoundError("O usuário não foi encontrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    return movies;
  }
}
