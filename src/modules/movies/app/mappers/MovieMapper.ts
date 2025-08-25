import { Movie } from "../../domain/entities/Movie";
import { MovieDetailsDto } from "../dtos/MovieDtos";

export class MovieMapper {
  private constructor() {}

  static toDetailsDto(movie: Movie): MovieDetailsDto {
    return {
      userId: movie.userId.value,
      movieId: movie.id.value,
      title: movie.title.value,
      genre: movie.genre.value,
      classification: movie.classification.value,
      duration: movie.duration.value,
      image: movie.image?.value,
      showtime: movie.showtime,
      observation: movie.observation?.value,
      platform: movie.platform.value,
      rating: movie.rating?.value,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      watched: movie.watched,
    };
  }
}
