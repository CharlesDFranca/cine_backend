import { Movie } from "../entities/Movie";
import { DuplicateMovieScheduleError } from "../errors/DuplicateMovieScheduleError";
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
      throw new DuplicateMovieScheduleError(
        "O filme já foi registrado na data marcada",
        {
          errorClass: this.constructor.name,
          showtime: currentMovie.showtime,
          title: currentMovie.title.value,
        },
      );
    }
  }
}
