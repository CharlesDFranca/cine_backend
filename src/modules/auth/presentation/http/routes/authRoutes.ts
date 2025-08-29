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

authRoutes.post("/refresh-token", (req: Request, res: Response) =>
  AuthControllers.refresh(req, res),
);

authRoutes.post("/validate-email", (req: Request, res: Response) =>
  AuthControllers.validateEmailCode(req, res),
);

authRoutes.post("/resend-code", (req: Request, res: Response) =>
  AuthControllers.resendCode(req, res),
);

authRoutes.post("/request-password-reset", (req: Request, res: Response) =>
  AuthControllers.requestPasswordResetByEmail(req, res),
);

authRoutes.post("/change-password-by-email", (req: Request, res: Response) =>
  AuthControllers.resetPasswordByEmail(req, res),
);

authRoutes.post(
  "/change-password",
  AuthMiddleware.auth,
  (req: Request, res: Response) =>
    AuthControllers.requestPasswordResetByUserId(req, res),
);

authRoutes.post(
  "/change-password-by-user-id",
  AuthMiddleware.auth,
  (req: Request, res: Response) =>
    AuthControllers.resetPasswordByUserId(req, res),
);
