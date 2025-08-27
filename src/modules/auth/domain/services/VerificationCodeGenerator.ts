import { IVerificationCodeGeneratorService } from "./contratcs/IVerificationCodeGeneratorService";

export class VerificationCodeGeneratorService
  implements IVerificationCodeGeneratorService
{
  generate(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
