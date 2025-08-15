import { Movie } from "../../entities/Movie";

export interface IMovieUniquenessCheckerService {
  check(currentMovie: Movie, movies: Movie[]): void;
}
