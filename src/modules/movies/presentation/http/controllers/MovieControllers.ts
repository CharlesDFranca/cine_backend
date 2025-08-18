import { Request, Response } from "express";
import { createMovieSchema } from "../../schemas/movieSchema";
import { container } from "tsyringe";
import { CreateMovieUseCase } from "@/modules/movies/app/use-cases/CreateMovieUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { ZodError } from "zod";

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
}
