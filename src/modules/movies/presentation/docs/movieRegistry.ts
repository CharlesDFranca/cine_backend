import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { createMovieSchema } from "../schemas/movieSchema";

export const movieRegistry = new OpenAPIRegistry();
movieRegistry.registerPath({
  method: "post",
  path: "/movies",
  description: "Create a new Movie",
  summary: "Create Movie",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createMovieSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Movie Created",
      content: {
        "application/json": {
          schema: z.object({ movieId: z.uuidv4() }),
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
  },
  tags: ["Movie"],
});
