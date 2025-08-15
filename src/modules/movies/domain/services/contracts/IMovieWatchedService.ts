import { Movie } from "../../entities/Movie";

export interface IMovieWatchedService {
  markAsWatched(movie: Movie): void;
  markAsUnwatched(movie: Movie): void;
}
