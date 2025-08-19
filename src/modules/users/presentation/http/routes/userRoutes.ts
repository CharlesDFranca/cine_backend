import express, { Request, Response } from "express";
import { UserControllers } from "../controllers/UserControllers";

export const userRoutes = express.Router();

userRoutes.post("", (req: Request, res: Response) =>
  UserControllers.create(req, res),
);

userRoutes.get("/:userId", (req: Request, res: Response) =>
  UserControllers.findById(req, res),
);

userRoutes.delete("/:userId", (req: Request, res: Response) =>
  UserControllers.delete(req, res),
);
