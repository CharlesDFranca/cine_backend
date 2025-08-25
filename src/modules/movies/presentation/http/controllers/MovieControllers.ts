import { Request, Response } from "express";
import {
  createMovieSchema,
  findMovieByIdSchema,
  findMovieByTitleSchema,
  updateMovieSchema,
} from "../../schemas/movieSchema";
import { container } from "tsyringe";
import { CreateMovieUseCase } from "@/modules/movies/app/use-cases/CreateMovieUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { FindMovieByTitleUseCase } from "@/modules/movies/app/use-cases/FindMovieByTitleUseCase";
import { DeleteMovieUseCase } from "@/modules/movies/app/use-cases/DeleteMovieUseCase";
import { ToggleMovieWatchedUseCase } from "@/modules/movies/app/use-cases/ToggleMovieWatchedUseCase";
import { imageSchema } from "@/shared/presentation/schemas/imageSchema";
import { findUserByIdSchema } from "@/modules/users/presentation/schemas/userSchemas";
import { FindMovieWatchedUseCase } from "@/modules/movies/app/use-cases/FindMovieWatchedUseCase";
import { FindMovieUnwatchedUseCase } from "@/modules/movies/app/use-cases/FindMovieUnwatchedUseCase";
import { ResponseFormatter } from "@/shared/presentation/formatters/ResponseFormatter";
import { FindMoviesByUserIdUseCase } from "@/modules/movies/app/use-cases/FindMoviesByUserIdUseCase";
import { UpdateMovieUseCase } from "@/modules/movies/app/use-cases/UpdateMovieUseCase";

export class MovieControllers {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const input = createMovieSchema.safeParse(req.body);
    const image = imageSchema.safeParse(req.file);

    if (input.error) throw input.error;
    if (image.error) throw image.error;

    const usecase = container.resolve(CreateMovieUseCase);
    const data = await UseCaseExecutor.run(usecase, {
      ...input.data,
      image: image.data,
    });
    const response = ResponseFormatter.success(data);

    res.status(201).json(response);
  }

  static async findByTitle(req: Request, res: Response) {
    const input = findMovieByTitleSchema.safeParse(req.body);
    const userId = findUserByIdSchema.safeParse(req.params);

    if (input.error) throw input.error;
    if (userId.error) throw userId.error;

    const usecase = container.resolve(FindMovieByTitleUseCase);
    const data = await UseCaseExecutor.run(usecase, {
      ...input.data,
      ...userId.data,
    });
    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async findByUserId(req: Request, res: Response) {
    const input = findUserByIdSchema.safeParse(req.params);

    if (input.error) throw input.error;

    const usecase = container.resolve(FindMoviesByUserIdUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);
    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async findWatched(req: Request, res: Response) {
    const userId = findUserByIdSchema.safeParse(req.params);

    if (userId.error) throw userId.error;

    const usecase = container.resolve(FindMovieWatchedUseCase);
    const data = await UseCaseExecutor.run(usecase, userId.data);
    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async findUnwatched(req: Request, res: Response) {
    const userId = findUserByIdSchema.safeParse(req.params);

    if (userId.error) throw userId.error;

    const usecase = container.resolve(FindMovieUnwatchedUseCase);
    const data = await UseCaseExecutor.run(usecase, userId.data);
    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const input = findMovieByIdSchema.safeParse(req.params);

    if (input.error) throw input.error;

    const usecase = container.resolve(DeleteMovieUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);
    const response = ResponseFormatter.success(data);

    res.status(204).json(response);
  }
  static async toggleWatched(req: Request, res: Response) {
    const input = findMovieByIdSchema.safeParse(req.params);

    if (input.error) throw input.error;

    const usecase = container.resolve(ToggleMovieWatchedUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);
    const response = ResponseFormatter.success(data);

    res.status(204).json(response);
  }
  static async update(req: Request, res: Response) {
    const input = updateMovieSchema.safeParse(req.body);
    const image = imageSchema.safeParse(req.file);
    const userId = findUserByIdSchema.safeParse(req.params);

    if (userId.error) throw userId.error;
    if (input.error) throw input.error;
    if (image.error) throw image.error;

    const usecase = container.resolve(UpdateMovieUseCase);
    const data = await UseCaseExecutor.run(usecase, {
      ...input.data,
      image: image.data,
      ...userId.data,
    });
    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }
}
