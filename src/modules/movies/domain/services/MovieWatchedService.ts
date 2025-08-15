import { Movie } from "../entities/Movie";
import { IMovieWatchedService } from "./contracts/IMovieWatchedService";

export class MovieWatchedService implements IMovieWatchedService {
  markAsWatched(movie: Movie): void {
    if (movie.watched) {
      throw new Error("O filme já está marcado como assistido");
    }
    movie.isWatched();
  }
  markAsUnwatched(movie: Movie): void {
    if (!movie.watched) {
      throw new Error("O filme já está marcado como não assistido");
    }
    movie.isNotWatched();
  }
}
