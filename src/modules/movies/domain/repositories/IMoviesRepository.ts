import { Id } from "@/shared/domain/value-objects/Id";
import { Movie } from "../entities/Movie";
import { MovieTitle } from "../value-objects/MovieTitle";

export interface IMoviesRepository {
  save(movie: Movie): Promise<void>;
  findById(movieId: Id): Promise<Movie | null>;
  findByTitle(movieTitle: MovieTitle): Promise<Movie | null>;
  exitsByTitleAndShowtime(movie: Movie): Promise<boolean>;
  update(movie: Movie): Promise<void>;
  delete(movieId: Id): Promise<void>;
}
