import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { Movie } from "../../domain/entities/Movie";
import { MovieTitle } from "../../domain/value-objects/MovieTitle";
import { Id } from "@/shared/domain/value-objects/Id";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";

type FindMovieByTitleInput = {
  title: string;
  userId: string;
};

type FindMovieByTitleOutput = Movie[];
@injectable()
export class FindMovieByTitleUseCase
  implements IUseCase<FindMovieByTitleInput, FindMovieByTitleOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: FindMovieByTitleInput): Promise<FindMovieByTitleOutput> {
    const movieTitle = MovieTitle.create({ value: input.title });
    const userId = Id.refresh({ value: input.userId });

    const [user, movies] = await Promise.all([
      this.userRepository.findById(userId),
      this.movieRepository.findByTitle(userId, movieTitle),
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
