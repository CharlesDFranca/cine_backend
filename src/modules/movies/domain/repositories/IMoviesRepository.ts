import { Id } from "@/shared/domain/value-objects/Id";
import { Movie } from "../entities/Movie";
import { MovieTitle } from "../value-objects/MovieTitle";
import { SortCriteria, SortDirection } from "../types/MovieTypes";

export interface IMoviesRepository {
  save(movie: Movie): Promise<void>;
  findById(movieId: Id): Promise<Movie | null>;
  findByTitle(
    userId: Id,
    movieTitle: MovieTitle,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]>;
  findByUserId(
    userId: Id,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]>;
  filterByWatched(
    userId: Id,
    watched: boolean,
    orderBy?: Partial<Record<SortCriteria, SortDirection>>,
  ): Promise<Movie[]>;
  exitsByTitleAndShowtime(movie: Movie): Promise<boolean>;
  update(movie: Movie): Promise<void>;
  delete(movieId: Id): Promise<void>;
}
