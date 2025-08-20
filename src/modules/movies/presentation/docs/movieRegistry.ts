import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  createMovieSchema,
  findMovieByIdSchema,
  findMovieByTitleSchema,
} from "../schemas/movieSchema";

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

movieRegistry.registerPath({
  method: "get",
  path: "/movies/title",
  description: "Find Movie By Title",
  summary: "Find Movie",
  request: {
    body: {
      content: {
        "application/json": {
          schema: findMovieByTitleSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Movie Found",
      content: {
        "application/json": {
          schema: z.any(),
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

movieRegistry.registerPath({
  method: "delete",
  path: "/movies/{movieId}",
  description: "Delete a Movie",
  summary: "Delete Movie",
  request: {
    body: {
      content: {
        "application/json": {
          schema: findMovieByIdSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Movie Deleted",
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

movieRegistry.registerPath({
  method: "patch",
  path: "/movies/toggleWatched/{movieId}",
  description: "Toggles the watched status of a movie",
  summary: "Toggles Watched",
  request: {
    body: {
      content: {
        "application/json": {
          schema: findMovieByIdSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Watched Status Changed",
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
