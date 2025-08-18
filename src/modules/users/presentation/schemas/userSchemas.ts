import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string("O nome é obrigatório").nonoptional(),
  email: z.email().nonoptional("O email é obrigatório"),
  password: z.string().nonoptional("A senha é obrigatória"),
});
