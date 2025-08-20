import "dotenv/config";
import { z } from "zod";

const envConfigSchema = z.object({
  PORT: z.coerce
    .number("O valor da porta precisa ser um número")
    .int("O valor da porta precisa ser um inteiro")
    .transform((n) => (Number(n) > 0 ? n : 3000))
    .default(3000),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string().min(128).max(128),
  REFRESH_TOKEN_SECRET: z.string().min(128).max(128),
});

export interface IEnvConfig {
  getPort(): number;
  getDbUrl(): string;
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

  getDbUrl(): string {
    return this.data.DATABASE_URL;
  }

  getAccessTokenSecret(): string {
    return this.data.ACCESS_TOKEN_SECRET;
  }

  getRefreshTokenSecret(): string {
    return this.data.REFRESH_TOKEN_SECRET;
  }
}

export const envConfig = new EnvConfig();
