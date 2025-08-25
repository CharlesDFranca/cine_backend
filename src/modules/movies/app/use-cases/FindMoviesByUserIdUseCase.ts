import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { MovieDetailsDto } from "../dtos/MovieDtos";
import { MovieMapper } from "../mappers/MovieMapper";

type FindMoviesByUserIdInput = {
  userId: string;
};

type FindMoviesByUserIdOutput = MovieDetailsDto[];

@injectable()
export class FindMoviesByUserIdUseCase
  implements IUseCase<FindMoviesByUserIdInput, FindMoviesByUserIdOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
  ) {}

  async execute(
    input: FindMoviesByUserIdInput,
  ): Promise<FindMoviesByUserIdOutput> {
    const userId = Id.refresh({ value: input.userId });

    const [user, movies] = await Promise.all([
      this.userRepository.findById(userId),
      this.movieRepository.findByUserId(userId),
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
