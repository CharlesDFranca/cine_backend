import { ICodeVerificationService } from "@/modules/auth/domain/services/contratcs/ICodeVerificationService";
import { redisClient } from "../redis/redisClient";
import { injectable } from "tsyringe";

@injectable()
export class RedisCodeVerificationService
  implements ICodeVerificationService
{
  async saveCode(key: string, code: number, ttlSeconds: number): Promise<void> {
    await redisClient.setEx(key, ttlSeconds, `${code}`);
  }

  async getCode(key: string): Promise<string | null> {
    return await redisClient.get(key);
  }

  async deleteCode(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
