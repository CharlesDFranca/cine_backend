import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { JWTTokenProvider } from "../../infra/services/JWTTokenProvider";

export class AuthMiddleware {
  private constructor() {}

  static auth(req: Request, res: Response, next: NextFunction) {
    console.log("Pelo menos ta sendo chamado?");

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Os cabeçalhos não fora providos");
    }

    const [scheme, token] = authHeader.split(" ");

    if (!(scheme === "Bearer") || !token) {
      throw new Error("Cabeçalho mal formatado");
    }

    try {
      const tokenProvider = container.resolve(JWTTokenProvider);
      const payload = tokenProvider.verifyAccessToken(token);

      req.user = payload;

      next();
    } catch {
      throw new Error("Usuário não autorizado");
    }
  }
}
