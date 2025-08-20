import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "../schema/authSchema";
import { z } from "zod";

export const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  description: "Register a new User",
  summary: "Register an User",
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
      description: "User registred",
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
  tags: ["Auth"],
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  description: "User login",
  summary: "User login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User logged",
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
  tags: ["Auth"],
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/refreshToken",
  description: "Refresh token user",
  summary: "Refresh token",
  request: {
    body: {
      content: {
        "application/json": {
          schema: refreshTokenSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Token refreshed",
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
  tags: ["Auth"],
});
