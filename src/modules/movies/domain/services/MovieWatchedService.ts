import { Movie } from "../entities/Movie";
import { IMovieWatchedService } from "./contracts/IMovieWatchedService";

export class MovieWatchedService implements IMovieWatchedService {
  markAsWatched(movie: Movie): void {
    movie.isWatched();
  }
  markAsUnwatched(movie: Movie): void {
    movie.isNotWatched();
  }
}
