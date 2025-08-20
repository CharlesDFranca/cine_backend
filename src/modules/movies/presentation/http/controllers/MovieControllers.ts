import { Request, Response } from "express";
import {
  createMovieSchema,
  findMovieByIdSchema,
  findMovieByTitleSchema,
} from "../../schemas/movieSchema";
import { container } from "tsyringe";
import { CreateMovieUseCase } from "@/modules/movies/app/use-cases/CreateMovieUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { ZodError } from "zod";
import { FindMovieByTitleUseCase } from "@/modules/movies/app/use-cases/FindMovieByTitleUseCase";
import { DeleteMovieUseCase } from "@/modules/movies/app/use-cases/DeleteMovieUseCase";
import { ToggleMovieWatchedUseCase } from "@/modules/movies/app/use-cases/ToggleMovieWatchedUseCase";

export class MovieControllers {
  private constructor() {}

  static async create(req: Request, res: Response) {
    try {
      const result = createMovieSchema.safeParse(req.body);

      if (result.error) {
        return res.status(400).json({
          error: { name: result.error.name, message: result.error.message },
        });
      }
      const usecase = container.resolve(CreateMovieUseCase);
      const data = await UseCaseExecutor.run(usecase, result.data);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.message });
      }
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  static async findByTitle(req: Request, res: Response) {
    try {
      const result = findMovieByTitleSchema.safeParse(req.body);

      if (result.error) {
        return res.status(400).json({
          error: { name: result.error.name, message: result.error.message },
        });
      }
      const usecase = container.resolve(FindMovieByTitleUseCase);
      const data = await UseCaseExecutor.run(usecase, result.data);
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.message });
      }
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = findMovieByIdSchema.safeParse(req.params);

      if (result.error) {
        return res.status(400).json({
          error: { name: result.error.name, message: result.error.message },
        });
      }
      const usecase = container.resolve(DeleteMovieUseCase);
      const data = await UseCaseExecutor.run(usecase, result.data);
      res.status(204).json(data);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.message });
      }
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  static async toggleWatched(req: Request, res: Response) {
    try {
      const result = findMovieByIdSchema.safeParse(req.params);

      if (result.error) {
        return res.status(400).json({
          error: { name: result.error.name, message: result.error.message },
        });
      }
      const usecase = container.resolve(ToggleMovieWatchedUseCase);
      const data = await UseCaseExecutor.run(usecase, result.data);
      res.status(204).json(data);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.message });
      }
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
