import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { JWTTokenProvider } from "../../infra/services/JWTTokenProvider";
import { UnauthorizedError } from "../../app/errors/UnauthorizedError";
import { MissingAuthHeaderError } from "../../app/errors/MissigAuthHeaderError";
import { MalformedAuthHeaderError } from "../../app/errors/MalformedAuthHeaderError";

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
