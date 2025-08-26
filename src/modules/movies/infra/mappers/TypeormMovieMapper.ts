import { MovieEntity } from "@/shared/infra/database/entities/MovieEntity";
import { Movie } from "../../domain/entities/Movie";
import { Id } from "@/shared/domain/value-objects/Id";
import { MovieClassification } from "../../domain/value-objects/MovieClassification";
import { MovieDuration } from "../../domain/value-objects/MovieDuration";
import { MovieGenre } from "../../domain/value-objects/MovieGenre";
import { MovieImage } from "../../domain/value-objects/MovieImage";
import { MovieObservation } from "../../domain/value-objects/MovieObservation";
import { MoviePlatform } from "../../domain/value-objects/MoviePlatform";
import { MovieRating } from "../../domain/value-objects/MovieRating";
import { MovieTitle } from "../../domain/value-objects/MovieTitle";

export class TypeormMovieMapper {
  private constructor() {}

  static toDomain(moviePersisted: MovieEntity): Movie {
    const title = MovieTitle.create({ value: moviePersisted.title });

    const genre = MovieGenre.create({ value: moviePersisted.genre });

    const duration = MovieDuration.create({
      value: moviePersisted.duration,
    });

    const id = Id.refresh({ value: moviePersisted.id });

    const platform = MoviePlatform.create({ value: moviePersisted.platform });

    const userId = Id.refresh({ value: moviePersisted.userId });

    const classification = MovieClassification.create({
      value: moviePersisted.classification,
    });

    return Movie.restore(id, {
      title,
      genre,
      duration,
      userId,
      image: moviePersisted.image
        ? MovieImage.restore({ value: moviePersisted.image })
        : undefined,
      observation: moviePersisted.observation
        ? MovieObservation.create({ value: moviePersisted.observation })
        : undefined,
      platform,
      rating: moviePersisted.rating
        ? MovieRating.create({ value: moviePersisted.rating })
        : undefined,
      createdAt: moviePersisted.createdAt,
      updatedAt: moviePersisted.updatedAt,
      showtime: moviePersisted.showtime,
      watched: moviePersisted.watched,
      classification,
    });
  }

  static toPersistence(movie: Movie): MovieEntity {
    return {
      title: movie.title.value,
      createdAt: movie.createdAt,
      duration: movie.duration.value,
      genre: movie.genre.value,
      id: movie.id.value,
      image: movie.image?.value,
      observation: movie.observation?.value,
      platform: movie.platform.value,
      rating: movie.rating?.value,
      showtime: movie.showtime,
      updatedAt: movie.updatedAt,
      userId: movie.userId.value,
      watched: movie.watched,
      classification: `${movie.classification.value}`,
    };
  }
}
