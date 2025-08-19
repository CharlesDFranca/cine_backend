import express, { Request, Response } from "express";
import { MovieControllers } from "../controllers/MovieControllers";

export const movieRoutes = express.Router();
movieRoutes.post("", (req: Request, res: Response) =>
  MovieControllers.create(req, res),
);
movieRoutes.get("/title", (req: Request, res: Response) =>
  MovieControllers.findByTitle(req, res),
);
movieRoutes.delete("/:movieId", (req: Request, res: Response) =>
  MovieControllers.delete(req, res),
);
