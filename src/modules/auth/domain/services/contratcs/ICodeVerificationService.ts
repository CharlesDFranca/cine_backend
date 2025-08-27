export interface ICodeVerificationService {
  saveCode(key: string, code: number, ttlSeconds: number): Promise<void>;
  getCode(key: string): Promise<string | null>;
  deleteCode(key: string): Promise<void>;
}
