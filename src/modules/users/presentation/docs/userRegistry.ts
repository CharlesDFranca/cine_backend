import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { findUserByIdSchema, updateUserSchema } from "../schemas/userSchemas";
import { z } from "zod";

export const userRegistry = new OpenAPIRegistry();

userRegistry.registerPath({
  method: "get",
  path: "/users/{userId}",
  description: "Find User by Id",
  summary: "Find User",
  request: {
    body: {
      content: {
        "application/json": {
          schema: findUserByIdSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Find User",
      content: {
        "application/json": {
          schema: z.object({
            name: z.string(),
            email: z.email(),
            createdAt: z.date(),
            updatedAt: z.date(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
  },
  tags: ["User"],
});

userRegistry.registerPath({
  method: "put",
  path: "/users/{userId}",
  description: "Update User by Id",
  summary: "Update User",
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Find User",
      content: {
        "application/json": {
          schema: z.object({
            userId: z.uuidv4(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
  },
  tags: ["User"],
});

userRegistry.registerPath({
  method: "delete",
  path: "/users/{userId}",
  description: "Delete User by Id",
  summary: "Delete User",
  request: {
    body: {
      content: {
        "application/json": {
          schema: findUserByIdSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Deleted User",
      content: {},
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
  },
  tags: ["User"],
});
