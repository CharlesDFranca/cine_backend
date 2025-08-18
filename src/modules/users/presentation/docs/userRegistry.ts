import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createUserSchema } from "../schemas/userSchemas";
import { z } from "zod";

export const userRegistry = new OpenAPIRegistry();

userRegistry.registerPath({
  method: "post",
  path: "/users",
  description: "Create a new User",
  summary: "Create User",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.object({ userId: z.uuidv4() }),
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
