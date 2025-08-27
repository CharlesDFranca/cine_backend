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
  STORAGE_DRIVER: z.string().default("disk"),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_USERNAME: z.string(),
  REDIS_PORT: z.coerce.number(),
});

export interface IEnvConfig {
  getPort(): number;
  getDbUrl(): string;
  getAccessTokenSecret(): string;
  getRefreshTokenSecret(): string;
  getStorageDriver(): string;
  getCloudinaryApiKey(): string;
  getCloudinaryApiSecret(): string;
  getCloudinaryCloudName(): string;
  getRedisHost(): string;
  getRedisUser(): string;
  getRedisPassword(): string;
  getRedisPort(): number;
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

  getStorageDriver(): string {
    return this.data.STORAGE_DRIVER;
  }

  getCloudinaryApiKey(): string {
    return this.data.CLOUDINARY_API_KEY;
  }

  getCloudinaryApiSecret(): string {
    return this.data.CLOUDINARY_API_SECRET;
  }

  getCloudinaryCloudName(): string {
    return this.data.CLOUDINARY_CLOUD_NAME;
  }

  getRedisHost(): string {
    return this.data.REDIS_HOST;
  }

  getRedisUser(): string {
    return this.data.REDIS_USERNAME;
  }

  getRedisPassword(): string {
    return this.data.REDIS_PASSWORD;
  }

  getRedisPort(): number {
    return this.data.REDIS_PORT;
  }
}

export const envConfig = new EnvConfig();
