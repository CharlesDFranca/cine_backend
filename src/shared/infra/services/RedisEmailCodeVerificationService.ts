import { ICodeVerificationService } from "@/modules/auth/domain/services/contratcs/ICodeVerificationService";
import { Id } from "@/shared/domain/value-objects/Id";
import { redisClient } from "../redis/redisClient";
import { injectable } from "tsyringe";

@injectable()
export class RedisEmailCodeVerificationService
  implements ICodeVerificationService
{
  async saveCode(userId: Id, code: number, ttlSeconds: number): Promise<void> {
    await redisClient.setEx(
      `email:verification:${userId.value}`,
      ttlSeconds,
      `${code}`,
    );
  }

  async getCode(userId: Id): Promise<string | null> {
    return await redisClient.get(`email:verification:${userId.value}`);
  }

  async deleteCode(userId: Id) {
    await redisClient.del(`email:verification:${userId.value}`);
  }
}
