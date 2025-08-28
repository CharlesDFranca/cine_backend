import { envConfig } from "@/config/env/EnvConfig";
import { IEmailService } from "@/shared/app/contracts/IEmailService";
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

import hbs from "handlebars";
import fs from "fs";
import path from "path";

type Context = {
  code: string;
  [keyof: string]: unknown;
};

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

  private compileTemplate(templateName: string, context: Context): string {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "presentation",
      "views",
      `${templateName}.hbs`,
    );

    const source = fs.readFileSync(filePath, "utf8");
    const template = hbs.compile(source);
    return template(context);
  }

  async sendVerificationEmail(to: string, code: string): Promise<void> {
    const html = this.compileTemplate("verify-email", {
      code,
    });

    await this.transporter.sendMail({
      from: `"CineVerse" <${envConfig.getSMTPEmail()}>`,
      to,
      subject: "Confirme seu e-mail",
      html,
    });
  }

  async sendPasswordResetEmail(to: string, code: string): Promise<void> {
    const html = this.compileTemplate("reset-password", {
      code,
      year: new Date().getFullYear(),
    });

    await this.transporter.sendMail({
      from: `"CineVerse" <${envConfig.getSMTPEmail()}>`,
      to,
      subject: "Redefinição de senha",
      html,
    });
  }
}
