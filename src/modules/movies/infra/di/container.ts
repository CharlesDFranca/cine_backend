import { container } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { MovieRepository } from "../repositories/MovieRepository";
import { IMovieUniquenessCheckerService } from "../../domain/services/contracts/IMovieUniquenessCheckerService";
import { MovieUniquenessCheckerService } from "../../domain/services/MovieUniquenessCheckerService";
import { IMovieWatchedService } from "../../domain/services/contracts/IMovieWatchedService";
import { MovieWatchedService } from "../../domain/services/MovieWatchedService";

container.register<IMoviesRepository>("MovieRepository", {
  useClass: MovieRepository,
});
container.register<IMovieUniquenessCheckerService>(
  "MovieUniquenessCheckerService",
  {
    useClass: MovieUniquenessCheckerService,
  },
);
container.register<IMovieWatchedService>("MovieWatchedService", {
  useClass: MovieWatchedService,
});
