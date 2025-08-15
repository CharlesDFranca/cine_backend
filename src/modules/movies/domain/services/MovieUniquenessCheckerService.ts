import { Movie } from "../entities/Movie";
import { IMovieUniquenessCheckerService } from "./contracts/IMovieUniquenessCheckerService";

export class MovieUniquenessCheckerService
  implements IMovieUniquenessCheckerService
{
  check(currentMovie: Movie, movies: Movie[]): void {
    movies.forEach((movie) => {
      if (
        currentMovie.title.value === movie.title.value &&
        currentMovie.showtime.getTime() === movie.showtime.getTime()
      ) {
        throw new Error("O filme já foi registrado na data marcada");
      }
    });
  }
}
