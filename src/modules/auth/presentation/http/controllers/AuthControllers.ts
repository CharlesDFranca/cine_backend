import { Request, Response } from "express";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "../../schema/authSchema";
import { container } from "tsyringe";
import { RegisterUserUseCase } from "@/modules/auth/app/use-cases/RegisterUserUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { LoginUserUseCase } from "@/modules/auth/app/use-cases/LoginUserUseCase";
import { RefreshTokenUseCase } from "@/modules/auth/app/use-cases/RefreshTokenUseCase";

export class AuthControllers {
  private constructor() {}

  static async register(req: Request, res: Response) {
    const input = registerUserSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(RegisterUserUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    res.status(201).json(data);
  }

  static async login(req: Request, res: Response) {
    const input = loginUserSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(LoginUserUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    res.status(200).json(data);
  }

  static async refresh(req: Request, res: Response) {
    const input = refreshTokenSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(RefreshTokenUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    res.status(200).json(data);
  }
}
