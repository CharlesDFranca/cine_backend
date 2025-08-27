import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const registerUserSchema = z.object({
  name: z
    .string()
    .nonoptional("O nome é obrigatório")
    .openapi("User name", { example: "User Name" }),
  email: z
    .email()
    .nonoptional("O email é obrigatório")
    .openapi("User email", { example: "email@domain.com" }),
  password: z
    .string()
    .nonoptional("A senha é obrigatória")
    .openapi("User password", { example: "Str0ng!!" }),
});

export const loginUserSchema = z.object({
  email: z
    .email()
    .nonoptional("O email é obrigatório")
    .openapi("User email", { example: "email@domain.com" }),
  password: z
    .string()
    .nonoptional("A senha é obrigatória")
    .openapi("User password", { example: "Str0ng!!" }),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.jwt(),
});

export const validateEmailCodeSchema = z.object({
  code: z.string(),
  userId: z.uuidv4(),
});

export const resetPasswordSchema = z.object({
  code: z.string(),
  oldPassword: z.string(),
  newPassword: z.string(),
});
