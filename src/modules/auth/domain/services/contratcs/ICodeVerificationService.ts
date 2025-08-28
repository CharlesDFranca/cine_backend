import { Id } from "@/shared/domain/value-objects/Id";

export type CodeType = "email" | "password";

export interface ICodeVerificationService {
  saveCode(keyType: CodeType, userId: Id, code: number): Promise<void>;
  getCode(keyType: CodeType, userId: Id): Promise<string | null>;
  deleteCode(keyType: CodeType, userId: Id): Promise<void>;
}
