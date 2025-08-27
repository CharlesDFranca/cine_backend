import express, { Request, Response } from "express";
import { AuthControllers } from "../controllers/AuthControllers";

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
