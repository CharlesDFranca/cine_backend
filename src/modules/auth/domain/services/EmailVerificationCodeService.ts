import { IEmailVerificationCodeService } from "./contratcs/IEmailVerificationCodeService";

export class EmailVerificationCodeService
  implements IEmailVerificationCodeService
{
  generate(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
