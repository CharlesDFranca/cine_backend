import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { IMovieUniquenessCheckerService } from "../../domain/services/contracts/IMovieUniquenessCheckerService";
import { inject, injectable } from "tsyringe";
import { MovieTitle } from "../../domain/value-objects/MovieTitle";
import { MovieImage } from "../../domain/value-objects/MovieImage";
import { MovieGenre } from "../../domain/value-objects/MovieGenre";
import { Id } from "@/shared/domain/value-objects/Id";
import { MovieClassification } from "../../domain/value-objects/MovieClassification";
import { MoviePlatform } from "../../domain/value-objects/MoviePlatform";
import { MovieDuration } from "../../domain/value-objects/MovieDuration";
import { MovieObservation } from "../../domain/value-objects/MovieObservation";
import { MovieRating } from "../../domain/value-objects/MovieRating";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import {
  IImageStorageService,
  ImageInput,
} from "@/shared/app/contracts/IImageStorageService";
import { MovieNotFoundError } from "../errors/MovieNotFoundError";
import { UnauthorizedError } from "@/modules/auth/app/errors/UnauthorizedError";

type UpdateMovieInput = {
  title?: string;
  image?: ImageInput;
  genre?: string;
  userId: string;
  movieId: string;
  classification?: string;
  platform?: string;
  showtime?: Date;
  duration?: number;
  observation?: string;
  watched?: boolean;
  rating?: number;
};

type UpdateMovieOutput = {
  movieId: string;
};

@injectable()
export class UpdateMovieUseCase
  implements IUseCase<UpdateMovieInput, UpdateMovieOutput>
{
  private uploadedPath: string;
  private oldImagePath: string | undefined;

  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("MovieRepository")
    private readonly movieRepository: IMoviesRepository,
    @inject("MovieUniquenessCheckerService")
    private readonly movieUniquenessCheckerService: IMovieUniquenessCheckerService,
    @inject("ImageStorageService")
    private readonly imageStorageService: IImageStorageService,
  ) {
    this.uploadedPath = "";
    this.oldImagePath = "";
  }

  async execute(input: UpdateMovieInput): Promise<UpdateMovieOutput> {
    const userId = Id.refresh({ value: input.userId });
    const movieId = Id.refresh({ value: input.movieId });

    const [user, movie] = await Promise.all([
      this.userRepository.findById(userId),
      this.movieRepository.findById(movieId),
    ]);

    if (!user) {
      throw new UserNotFoundError("O usuário não existe", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    if (!movie) {
      throw new MovieNotFoundError("O filme não foi cadastrado", {
        errorClass: this.constructor.name,
        movieId: movieId.value,
      });
    }

    if (!movie.userId.equals(user.id)) {
      throw new UnauthorizedError({
        errorClass: this.constructor.name,
        userId: userId.value,
        movieId: movieId.value,
      });
    }

    if (input.title) {
      movie.updateTitle(MovieTitle.create({ value: input.title }));
    }

    if (input.showtime) {
      movie.updateShowtime(input.showtime);
    }

    if (input.title || input.showtime) {
      await this.movieUniquenessCheckerService.check(movie, async (movie) =>
        this.movieRepository.exitsByTitleAndShowtime(movie),
      );
    }

    if (input.genre) {
      movie.updateGenre(MovieGenre.create({ value: input.genre }));
    }

    if (input.platform) {
      movie.updatePlatform(MoviePlatform.create({ value: input.platform }));
    }

    if (input.duration !== undefined) {
      movie.updateDuration(MovieDuration.create({ value: input.duration }));
    }

    if (input.classification) {
      movie.updateClassification(
        MovieClassification.create({ value: input.classification }),
      );
    }

    if (input.observation) {
      movie.updateObservation(
        MovieObservation.create({ value: input.observation }),
      );
    }

    if (input.rating !== undefined) {
      movie.updateRating(MovieRating.create({ value: input.rating }));
    }

    if (input.watched !== undefined) {
      movie.updateWatched(input.watched);
    }

    if (input.image) {
      this.uploadedPath = await this.imageStorageService.save(input.image);
      this.oldImagePath = movie.image?.value;
      movie.updateImage(MovieImage.restore({ value: this.uploadedPath }));
    }

    await this.movieRepository.update(movie);

    if (this.oldImagePath)
      await this.imageStorageService.delete(this.oldImagePath);

    return { movieId: movie.id.value };
  }

  async rollback(): Promise<void> {
    if (this.uploadedPath)
      await this.imageStorageService.delete(this.uploadedPath);
  }
}
