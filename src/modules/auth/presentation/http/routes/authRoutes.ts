import express, { Request, Response } from "express";
import { AuthControllers } from "../controllers/AuthControllers";

export const authRoutes = express.Router();

authRoutes.post("/register", (req: Request, res: Response) =>
  AuthControllers.register(req, res),
);

authRoutes.post("/login", (req: Request, res: Response) =>
  AuthControllers.login(req, res),
);
