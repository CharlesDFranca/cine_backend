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
import { Movie } from "../../domain/entities/Movie";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import {
  IImageStorageService,
  ImageInput,
} from "@/shared/app/contracts/IImageStorageService";

type CreateMovieInput = {
  title: string;
  image?: ImageInput;
  genre: string;
  userId: string;
  classification: string;
  platform: string;
  showtime: Date;
  duration: number;
  observation?: string;
  watched: boolean;
  rating?: number;
};

type CreateMovieOutput = {
  movieId: string;
};

@injectable()
export class CreateMovieUseCase
  implements IUseCase<CreateMovieInput, CreateMovieOutput>
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

  async execute(input: CreateMovieInput): Promise<CreateMovieOutput> {
    const movieTitle = MovieTitle.create({ value: input.title });
    const movieGenre = MovieGenre.create({ value: input.genre });
    const movieUserId = Id.refresh({ value: input.userId });
    const moviePlatform = MoviePlatform.create({ value: input.platform });
    const movieDuration = MovieDuration.create({ value: input.duration });

    const movieImage = input.image
      ? MovieImage.create({ value: input.image.originalname })
      : undefined;

    const movieClassification = MovieClassification.create({
      value: input.classification,
    });

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
      this.uploadedPath = await this.imageStorageService.save(input.image);
    }

    const movie = Movie.create({
      title: movieTitle,
      classification: movieClassification,
      duration: movieDuration,
      genre: movieGenre,
      platform: moviePlatform,
      showtime: input.showtime,
      userId: movieUserId,
      watched: input.watched,
      image: movieImage,
      observation: movieObservation,
      rating: movieRating,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.movieUniquenessCheckerService.check(movie, async (movie) =>
      this.movieRepository.exitsByTitleAndShowtime(movie),
    );
    await this.movieRepository.save(movie);

    return { movieId: movie.id.value };
  }

  async rollback(): Promise<void> {
    await this.imageStorageService.delete(this.uploadedPath);
  }
}
