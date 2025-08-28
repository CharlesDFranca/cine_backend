import {
  CodeType,
  ICodeVerificationService,
} from "@/modules/auth/domain/services/contratcs/ICodeVerificationService";
import { redisClient } from "../redis/redisClient";
import { injectable } from "tsyringe";
import { envConfig } from "@/config/env/EnvConfig";
import { Id } from "@/shared/domain/value-objects/Id";

@injectable()
export class RedisCodeVerificationService implements ICodeVerificationService {
  async saveCode(keyType: CodeType, userId: Id, code: number): Promise<void> {
    const key =
      keyType === "email"
        ? `${envConfig.getVerificationEmailKey()}:${userId.value}`
        : `${envConfig.getResetPasswordKey()}:${userId.value}`;

    await redisClient.setEx(key, envConfig.getExpirationCodeTime(), `${code}`);
  }

  async getCode(keyType: CodeType, userId: Id): Promise<string | null> {
    const key =
      keyType === "email"
        ? `${envConfig.getVerificationEmailKey()}:${userId.value}`
        : `${envConfig.getResetPasswordKey()}:${userId.value}`;

    return await redisClient.get(key);
  }

  async deleteCode(keyType: CodeType, userId: Id): Promise<void> {
    const key =
      keyType === "email"
        ? `${envConfig.getVerificationEmailKey()}:${userId.value}`
        : `${envConfig.getResetPasswordKey()}:${userId.value}`;

    await redisClient.del(key);
  }
}
