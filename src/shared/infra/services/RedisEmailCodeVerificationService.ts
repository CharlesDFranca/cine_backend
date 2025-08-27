import { ICodeVerificationService } from "@/modules/auth/domain/services/contratcs/ICodeVerificationService";
import { redisClient } from "../redis/redisClient";
import { injectable } from "tsyringe";
import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";

@injectable()
export class RedisEmailCodeVerificationService
  implements ICodeVerificationService
{
  async saveCode(
    email: UserEmail,
    code: number,
    ttlSeconds: number,
  ): Promise<void> {
    await redisClient.setEx(
      `email:verification:${email.value}`,
      ttlSeconds,
      `${code}`,
    );
  }

  async getCode(email: UserEmail): Promise<string | null> {
    return await redisClient.get(`email:verification:${email.value}`);
  }

  async deleteCode(email: UserEmail) {
    await redisClient.del(`email:verification:${email.value}`);
  }
}
