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
    const input = findUserByIdSchema.safeParse(req.params);

    if (!input.success) throw input.error;

    const usecase = container.resolve(FindUserByIdUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async update(req: Request, res: Response) {
    const inputUpdateData = updateUserSchema.safeParse(req.body);
    const inputUserId = findUserByIdSchema.safeParse(req.params);

    if (!inputUpdateData.success) throw inputUpdateData.error;
    if (!inputUserId.success) throw inputUserId.error;

    const usecase = container.resolve(UpdateUserUseCase);
    const data = await UseCaseExecutor.run(usecase, {
      ...inputUpdateData.data,
      ...inputUserId.data,
    });

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const input = findUserByIdSchema.safeParse(req.params);

    if (!input.success) throw input.error;

    const usecase = container.resolve(DeleteUserUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    const response = ResponseFormatter.success(data);

    res.status(204).json(response);
  }
}
