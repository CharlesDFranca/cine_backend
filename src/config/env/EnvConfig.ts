import "dotenv/config";
import { z } from "zod";

const envConfigSchema = z.object({
  PORT: z.coerce
    .number("O valor da porta precisa ser um número")
    .int("O valor da porta precisa ser um inteiro")
    .transform((n) => (Number(n) > 0 ? n : 3000))
    .default(3000),
});

export interface IEnvConfig {
  getPort(): number;
}

class EnvConfig implements IEnvConfig {
  private readonly data: z.infer<typeof envConfigSchema>;

  constructor() {
    const result = envConfigSchema.safeParse(process.env);

    if (result.error) {
      throw new Error(`Configuração inválida: ${result.error.message}`);
    }

    this.data = result.data;
  }

  getPort(): number {
    return this.data.PORT;
  }
}

export const envConfig = new EnvConfig();
