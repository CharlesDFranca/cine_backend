import { Request, Response } from "express";
import {
  findUserByIdSchema,
  updateUserSchema,
} from "../../schemas/userSchemas";
import { container } from "tsyringe";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { FindUserByIdUseCase } from "@/modules/users/app/use-cases/FindUserByIdUseCase";
import { DeleteUserUseCase } from "@/modules/users/app/use-cases/DeleteUserUseCase";
import { UpdateUserUseCase } from "@/modules/users/app/use-cases/UpdateUserUseCase";
import { ResponseFormatter } from "@/shared/presentation/formatters/ResponseFormatter";

export class UserControllers {
  private constructor() {}

  static async findById(req: Request, res: Response) {
    const result = findUserByIdSchema.safeParse(req.params);

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

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async update(req: Request, res: Response) {
    const resultUpdateData = updateUserSchema.safeParse(req.body);
    const resultUserId = findUserByIdSchema.safeParse(req.params);

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

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const result = findUserByIdSchema.safeParse(req.params);

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

    const response = ResponseFormatter.success(data);

    res.status(204).json(response);
  }
}
