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
  }

  async execute(input: UpdateMovieInput): Promise<UpdateMovieOutput> {
    const movieId = Id.refresh({ value: input.movieId });
    const movie = await this.movieRepository.findById(movieId);

    if (!movie) {
      throw new MovieNotFoundError("O filme não foi cadastrado", {
        errorClass: this.constructor.name,
        movieId: movieId.value,
      });
    }

    const movieTitle = input.title
      ? MovieTitle.create({ value: input.title })
      : undefined;
    const movieGenre = input.genre
      ? MovieGenre.create({ value: input.genre })
      : undefined;
    const moviePlatform = input.platform
      ? MoviePlatform.create({ value: input.platform })
      : undefined;
    const movieDuration = input.duration
      ? MovieDuration.create({ value: input.duration })
      : undefined;

    const movieUserId = Id.refresh({ value: input.userId });

    const movieClassification = input.classification
      ? MovieClassification.create({
          value: input.classification,
        })
      : undefined;

    const movieObservation = input.observation
      ? MovieObservation.create({ value: input.observation })
      : undefined;

    const movieRating = input.rating
      ? MovieRating.create({ value: input.rating })
      : undefined;

    const user = await this.userRepository.findById(movieUserId);

    if (!user) {
      throw new UserNotFoundError("O usuário não existe", {
        errorClass: this.constructor.name,
        userId: movieUserId.value,
      });
    }

    if (input.image) {
      MovieImage.create({ value: input.image.originalname });
      this.uploadedPath = await this.imageStorageService.save(input.image);

      if (movie.image) {
        await this.imageStorageService.delete(movie.image.value);
      }
    }

    const movieImage = MovieImage.restore({ value: this.uploadedPath });

    movie.updateTitle(movieTitle ?? movie.title);

    movie.updateImage(movieImage ?? movie.image);

    movie.updateGenre(movieGenre ?? movie.genre);

    movie.updateClassification(movieClassification ?? movie.classification);

    movie.updatePlatform(moviePlatform ?? movie.platform);

    movie.updateShowtime(input.showtime ?? movie.showtime);

    movie.updateDuration(movieDuration ?? movie.duration);

    movie.updateObservation(movieObservation ?? movie.observation);

    movie.updateWatched(input.watched ?? movie.watched);

    movie.updateRating(movieRating ?? movie.rating);

    await this.movieUniquenessCheckerService.check(movie, async (movie) =>
      this.movieRepository.exitsByTitleAndShowtime(movie),
    );

    await this.movieRepository.update(movie);

    return { movieId: movie.id.value };
  }

  async rollback(): Promise<void> {
    await this.imageStorageService.delete(this.uploadedPath);
  }
}
