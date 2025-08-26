import express, { Request, Response } from "express";
import { MovieControllers } from "../controllers/MovieControllers";
import multer from "multer";
import { imageUploadConfig } from "@/config/uploads-config/imageUploadConfig";

export const movieRoutes = express.Router();

const postImageUpload = multer(imageUploadConfig.multer);

movieRoutes.post(
  "",
  postImageUpload.single("image"),
  (req: Request, res: Response) => MovieControllers.create(req, res),
);

movieRoutes.get("/search-title", (req: Request, res: Response) =>
  MovieControllers.findByTitle(req, res),
);

movieRoutes.get("", (req: Request, res: Response) =>
  MovieControllers.findByUserId(req, res),
);

movieRoutes.delete("/:movieId", (req: Request, res: Response) =>
  MovieControllers.delete(req, res),
);

movieRoutes.patch("/:movieId/watched", (req: Request, res: Response) =>
  MovieControllers.toggleWatched(req, res),
);

movieRoutes.get("/search-watched", (req: Request, res: Response) =>
  MovieControllers.fiterByWatched(req, res),
);

movieRoutes.put(
  "",
  postImageUpload.single("image"),
  (req: Request, res: Response) => MovieControllers.update(req, res),
);
