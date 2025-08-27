import { envConfig } from "@/config/env/EnvConfig";
import { IEmailService } from "@/shared/app/contracts/IEmailService";
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

@injectable()
export class NodemailerEmailService implements IEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envConfig.getSMTPHost(),
      port: envConfig.getSMTPPort(),
      secure: true,
      auth: {
        user: envConfig.getSMTPEmail(),
        pass: envConfig.getSMTPPass(),
      },
    });
  }

  async sendVerificationEmail(to: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"MinhaApp" <${envConfig.getSMTPEmail()}>`,
      to,
      subject: "Confirme seu e-mail",
      html: `
        <h1>Bem-vindo!</h1>
        <p>Seu código de verificação é: <b>${code}</b></p>
        <p>Ou clique aqui para confirmar: 
          <a href="http://localhost:3000/verify-email?code=${code}&email=${to}">
            Confirmar e-mail
          </a>
        </p>
      `,
    });
  }

  async sendPasswordResetEmail(to: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"MinhaApp" <${envConfig.getSMTPEmail()}>`,
      to,
      subject: "Recupere sua senha",
      html: `
        <p>Use o link abaixo para redefinir sua senha:</p>
        <p>Seu código de verificação é: <b>${code}</b></p>
        <a href="http://localhost:3000/reset-password?token=${code}">
          Redefinir senha
        </a>
      `,
    });
  }
}
