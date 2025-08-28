import { Request, Response } from "express";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
  resendCodeSchema,
  resetPasswordSchema,
  validateEmailCodeSchema,
} from "../../schema/authSchema";
import { container } from "tsyringe";
import { RegisterUserUseCase } from "@/modules/auth/app/use-cases/RegisterUserUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { LoginUserUseCase } from "@/modules/auth/app/use-cases/LoginUserUseCase";
import { RefreshTokenUseCase } from "@/modules/auth/app/use-cases/RefreshTokenUseCase";
import { ValidateEmailCodeUseCase } from "@/modules/auth/app/use-cases/ValidateEmailCodeUseCase";
import { ResendValidateCodeUseCase } from "@/modules/auth/app/use-cases/ResendValidateCodeUseCase";
import {
  findUserByEmailSchema,
  findUserByIdSchema,
} from "@/modules/users/presentation/schemas/userSchemas";
import { PasswordResetUseCase } from "@/modules/auth/app/use-cases/PasswordResetUseCase";
import { ResponseFormatter } from "@/shared/presentation/formatters/ResponseFormatter";
import { RequestPasswordResetByEmailUseCase } from "@/modules/auth/app/use-cases/RequestPasswordResetByEmailUseCase";
import { RequestPasswordResetByUserIdUseCase } from "@/modules/auth/app/use-cases/RequestPasswordResetByUserIdUseCase";

export class AuthControllers {
  private constructor() {}

  static async register(req: Request, res: Response) {
    const input = registerUserSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(RegisterUserUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    const response = ResponseFormatter.success(data);

    res.status(201).json(response);
  }

  static async login(req: Request, res: Response) {
    const input = loginUserSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(LoginUserUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async refresh(req: Request, res: Response) {
    const input = refreshTokenSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(RefreshTokenUseCase);
    const data = await UseCaseExecutor.run(usecase, input.data);

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async validateEmailCode(req: Request, res: Response) {
    const input = validateEmailCodeSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(ValidateEmailCodeUseCase);
    const data = await UseCaseExecutor.run(usecase, { ...input.data });

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async resendCode(req: Request, res: Response) {
    const userId = findUserByIdSchema.safeParse(req.body);
    const input = resendCodeSchema.safeParse(req.query);

    if (!userId.success) throw userId.error;
    if (!input.success) throw input.error;

    const usecase = container.resolve(ResendValidateCodeUseCase);
    const data = await UseCaseExecutor.run(usecase, {
      ...userId.data,
      ...input.data,
    });

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async requestPasswordResetByEmail(req: Request, res: Response) {
    const input = findUserByEmailSchema.safeParse(req.body);

    if (!input.success) throw input.error;

    const usecase = container.resolve(RequestPasswordResetByEmailUseCase);
    const data = await UseCaseExecutor.run(usecase, { ...input.data });

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async requestPasswordResetByUserId(req: Request, res: Response) {
    const input = findUserByIdSchema.safeParse(req.user);

    if (!input.success) throw input.error;

    const usecase = container.resolve(RequestPasswordResetByUserIdUseCase);
    const data = await UseCaseExecutor.run(usecase, { ...input.data });

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }

  static async resetPassword(req: Request, res: Response) {
    const input = resetPasswordSchema.safeParse(req.body);
    const userId = findUserByIdSchema.safeParse(req.user);

    if (!input.success) throw input.error;
    if (!userId.success) throw userId.error;

    const usecase = container.resolve(PasswordResetUseCase);
    const data = await UseCaseExecutor.run(usecase, {
      ...input.data,
      ...userId.data,
    });

    const response = ResponseFormatter.success(data);

    res.status(200).json(response);
  }
}
