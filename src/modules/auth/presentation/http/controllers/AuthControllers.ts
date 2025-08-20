import { Request, Response } from "express";
import { registerUserSchema } from "../../schema/authSchema";
import { container } from "tsyringe";
import { RegisterUserUseCase } from "@/modules/auth/app/use-cases/RegisterUserUseCase";
import { UseCaseExecutor } from "@/shared/app/use-cases/UseCaseExecutor";
import { ZodError } from "zod";

export class AuthControllers {
  private constructor() {}

  static async register(req: Request, res: Response) {
    try {
      const result = registerUserSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: {
            name: result.error.name,
            message: result.error.message,
          },
        });
      }

      const usecase = container.resolve(RegisterUserUseCase);
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
