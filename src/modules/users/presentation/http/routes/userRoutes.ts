import express, { Request, Response } from "express";
import { UserControllers } from "../controllers/UserControllers";

export const userRoutes = express.Router();

userRoutes.post("", (req: Request, res: Response) =>
  UserControllers.create(req, res),
);
