import express, { Request, Response } from "express";
import { MovieControllers } from "../controllers/MovieControllers";

export const movieRoutes = express.Router();
movieRoutes.post("", (req: Request, res: Response) =>
  MovieControllers.create(req, res),
);
