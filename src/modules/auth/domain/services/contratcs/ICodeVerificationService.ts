import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";

export interface ICodeVerificationService {
  saveCode(email: UserEmail, code: number, ttlSeconds: number): Promise<void>;
  getCode(email: UserEmail): Promise<string | null>;
  deleteCode(email: UserEmail): Promise<void>;
}
