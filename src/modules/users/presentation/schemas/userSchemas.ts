import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createUserSchema = z.object({
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
