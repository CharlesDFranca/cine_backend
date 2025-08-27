import { Id } from "@/shared/domain/value-objects/Id";

export interface ICodeVerificationService {
  saveCode(userId: Id, code: number, ttlSeconds: number): Promise<void>;
  getCode(userId: Id): Promise<string | null>;
  deleteCode(userId: Id): Promise<void>;
}
