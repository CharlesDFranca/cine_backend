import { Movie } from "../entities/Movie";
import { IMovieUniquenessCheckerService } from "./contracts/IMovieUniquenessCheckerService";

export class MovieUniquenessCheckerService
  implements IMovieUniquenessCheckerService
{
  async check(
    currentMovie: Movie,
    movieExists: (movie: Movie) => Promise<boolean>,
  ): Promise<void> {
    const movie = await movieExists(currentMovie);
    if (movie) {
      throw new Error("O filme já foi registrado na data marcada");
    }
  }
}
