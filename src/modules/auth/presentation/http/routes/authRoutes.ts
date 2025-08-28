import express, { Request, Response } from "express";
import { AuthControllers } from "../controllers/AuthControllers";
import { AuthMiddleware } from "../middlewares/AuthMiddlware";

export const authRoutes = express.Router();

authRoutes.post("/register", (req: Request, res: Response) =>
  AuthControllers.register(req, res),
);

authRoutes.post("/login", (req: Request, res: Response) =>
  AuthControllers.login(req, res),
);

authRoutes.post("/refreshToken", (req: Request, res: Response) =>
  AuthControllers.refresh(req, res),
);

authRoutes.post("/validate-email", (req: Request, res: Response) =>
  AuthControllers.validateEmailCode(req, res),
);

authRoutes.post("/resend-code", (req: Request, res: Response) =>
  AuthControllers.resendCode(req, res),
);

authRoutes.get(
  "/request-password-reset",
  AuthMiddleware.auth,
  (req: Request, res: Response) =>
    AuthControllers.requestPasswordReset(req, res),
);

authRoutes.post(
  "/reset-password",
  AuthMiddleware.auth,
  (req: Request, res: Response) => AuthControllers.resetPassword(req, res),
);
