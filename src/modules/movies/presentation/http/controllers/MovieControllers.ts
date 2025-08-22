import { Request, Response } from "express";
import {
  createMovieSchema,
  findMovieByIdSchema,
  findMovieByTitleSchema,
} from "../../schemas/movieSchema";
import { container } from "tsyringe";
import { CreateMovieUseCase } from "@/modules/movies/app/use-cases/CreateMovieUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { FindMovieByTitleUseCase } from "@/modules/movies/app/use-cases/FindMovieByTitleUseCase";
import { DeleteMovieUseCase } from "@/modules/movies/app/use-cases/DeleteMovieUseCase";
import { ToggleMovieWatchedUseCase } from "@/modules/movies/app/use-cases/ToggleMovieWatchedUseCase";

export class MovieControllers {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const result = createMovieSchema.safeParse(req.body);

    if (result.error) throw result.error;

    const usecase = container.resolve(CreateMovieUseCase);
    const data = await UseCaseExecutor.run(usecase, result.data);
    res.status(201).json(data);
  }
  static async findByTitle(req: Request, res: Response) {
    const result = findMovieByTitleSchema.safeParse(req.body);

    if (result.error) throw result.error;

    const usecase = container.resolve(FindMovieByTitleUseCase);
    const data = await UseCaseExecutor.run(usecase, result.data);
    res.status(200).json(data);
  }

  static async delete(req: Request, res: Response) {
    const result = findMovieByIdSchema.safeParse(req.params);

    if (result.error) throw result.error;

    const usecase = container.resolve(DeleteMovieUseCase);
    const data = await UseCaseExecutor.run(usecase, result.data);
    res.status(204).json(data);
  }
  static async toggleWatched(req: Request, res: Response) {
    const result = findMovieByIdSchema.safeParse(req.params);

    if (result.error) throw result.error;

    const usecase = container.resolve(ToggleMovieWatchedUseCase);
    const data = await UseCaseExecutor.run(usecase, result.data);
    res.status(204).json(data);
  }
}
