import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { MovieMapper } from "../mappers/MovieMapper";
import { MovieDetailsDto } from "../dtos/MovieDtos";
import { SortCriteria, SortDirection } from "../../domain/types/MovieTypes";

type FilterMovieByWatchedInput = {
  userId: string;
  watched: boolean;
  orderBy?: Partial<Record<SortCriteria, SortDirection>>;
};

type FilterMovieByWatchedOutput = MovieDetailsDto[];

@injectable()
export class FilterMovieByWatchedUseCase
  implements IUseCase<FilterMovieByWatchedInput, FilterMovieByWatchedOutput>
{
  constructor(
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    input: FilterMovieByWatchedInput,
  ): Promise<FilterMovieByWatchedOutput> {
    const userId = Id.refresh({ value: input.userId });

    const [user, movies] = await Promise.all([
      this.userRepository.findById(userId),
      this.movieRepository.filterByWatched(
        userId,
        input.watched,
        input.orderBy,
      ),
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
