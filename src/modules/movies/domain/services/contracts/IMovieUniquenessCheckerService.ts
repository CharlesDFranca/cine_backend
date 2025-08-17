import { Movie } from "../../entities/Movie";

export interface IMovieUniquenessCheckerService {
  check(
    currentMovie: Movie,
    movieExists: (movie: Movie) => Promise<boolean>,
  ): Promise<void>;
}
