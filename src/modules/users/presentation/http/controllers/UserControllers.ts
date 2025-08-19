import { Request, Response } from "express";
import {
  createUserSchema,
  findByIdSchema,
  updateUserSchema,
} from "../../schemas/userSchemas";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../../../app/use-cases/CreateUserUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { ZodError } from "zod";
import { FindUserByIdUseCase } from "@/modules/users/app/use-cases/FindUserByIdUseCase";
import { DeleteUserUseCase } from "@/modules/users/app/use-cases/DeleteUserUseCase";
import { UpdateUserUseCase } from "@/modules/users/app/use-cases/UpdateUserUseCase";

export class UserControllers {
  private constructor() {}

  static async create(req: Request, res: Response) {
    try {
      const result = createUserSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: {
            name: result.error.name,
            message: result.error.message,
          },
        });
      }

      const usecase = container.resolve(CreateUserUseCase);
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

  static async findById(req: Request, res: Response) {
    try {
      const result = findByIdSchema.safeParse(req.params);

      if (!result.success) {
        return res.status(400).json({
          error: {
            name: result.error.name,
            message: result.error.message,
          },
        });
      }

      const usecase = container.resolve(FindUserByIdUseCase);
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

  static async update(req: Request, res: Response) {
    try {
      const resultUpdateData = updateUserSchema.safeParse(req.body);
      const resultUserId = findByIdSchema.safeParse(req.params);

      if (!resultUpdateData.success || !resultUserId.success) {
        const result = resultUpdateData.error ? resultUpdateData : resultUserId;

        return res.status(400).json({
          error: {
            name: result.error?.name,
            message: result.error?.message,
          },
        });
      }

      const usecase = container.resolve(UpdateUserUseCase);
      const data = await UseCaseExecutor.run(usecase, {
        ...resultUpdateData.data,
        ...resultUserId.data,
      });

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
      const result = findByIdSchema.safeParse(req.params);

      if (!result.success) {
        return res.status(400).json({
          error: {
            name: result.error.name,
            message: result.error.message,
          },
        });
      }

      const usecase = container.resolve(DeleteUserUseCase);
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
