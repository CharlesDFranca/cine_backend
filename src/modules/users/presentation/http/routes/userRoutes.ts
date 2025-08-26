import express, { Request, Response } from "express";
import { UserControllers } from "../controllers/UserControllers";

export const userRoutes = express.Router();

userRoutes.get("/me", (req: Request, res: Response) =>
  UserControllers.findById(req, res),
);

userRoutes.delete("/me", (req: Request, res: Response) =>
  UserControllers.delete(req, res),
);

userRoutes.put("/me", (req: Request, res: Response) =>
  UserControllers.update(req, res),
);
