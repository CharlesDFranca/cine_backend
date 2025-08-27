export interface IEmailService {
  sendVerificationEmail(to: string, code: string): Promise<void>;
  sendPasswordResetEmail(to: string, token: string): Promise<void>;
}
