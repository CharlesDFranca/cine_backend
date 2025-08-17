import { container } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/IMoviesRepository";
import { MovieRepository } from "../repositories/MovieRepository";

container.register<IMoviesRepository>("MovieRepository", MovieRepository);
