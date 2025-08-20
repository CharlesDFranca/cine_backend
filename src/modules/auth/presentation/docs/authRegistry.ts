import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { registerUserSchema } from "../schema/authSchema";
import { z } from "zod";

export const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  description: "Create a new User",
  summary: "Create User",
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.jwt(),
            refreshToken: z.jwt(),
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
