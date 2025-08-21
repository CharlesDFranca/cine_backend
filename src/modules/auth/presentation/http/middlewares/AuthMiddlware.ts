import { MalformedAuthHeaderError } from "@/modules/auth/app/errors/MalformedAuthHeaderError";
import { MissingAuthHeaderError } from "@/modules/auth/app/errors/MissigAuthHeaderError";
import { UnauthorizedError } from "@/modules/auth/app/errors/UnauthorizedError";
import { JWTTokenProvider } from "@/modules/auth/infra/services/JWTTokenProvider";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export class AuthMiddleware {
  private constructor() {}

  static auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new MissingAuthHeaderError();
    }

    const [scheme, token] = authHeader.split(" ");

    if (!(scheme === "Bearer") || !token) {
      throw new MalformedAuthHeaderError();
    }

    try {
      const tokenProvider = container.resolve(JWTTokenProvider);
      const payload = tokenProvider.verifyAccessToken(token);

      req.user = payload;

      next();
    } catch {
      throw new UnauthorizedError();
    }
  }
}
