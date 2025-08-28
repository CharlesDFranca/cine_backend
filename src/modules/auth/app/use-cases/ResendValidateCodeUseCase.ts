import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import {
  CodeType,
  ICodeVerificationService,
} from "../../domain/services/contratcs/ICodeVerificationService";
import { inject, injectable } from "tsyringe";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { IVerificationCodeGeneratorService } from "../../domain/services/contratcs/IVerificationCodeGeneratorService";
import { IEmailService } from "@/shared/app/contracts/IEmailService";
import { Id } from "@/shared/domain/value-objects/Id";
import { User } from "@/modules/users/domain/entities/User";

type ResendValidateCodeInput = {
  userId: string;
  to: CodeType;
};

type ResendValidateCodeOutput = {
  message: string;
};

@injectable()
export class ResendValidateCodeUseCase
  implements IUseCase<ResendValidateCodeInput, ResendValidateCodeOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("CodeVerificationService")
    private readonly codeVerificationService: ICodeVerificationService,
    @inject("VerificationCodeGeneratorService")
    private readonly verificationCodeGeneratorService: IVerificationCodeGeneratorService,
    @inject("EmailService")
    private readonly emailService: IEmailService,
  ) {}

  async execute(
    input: ResendValidateCodeInput,
  ): Promise<ResendValidateCodeOutput> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    const code = this.verificationCodeGeneratorService.generate();

    await this.codeVerificationService.deleteCode(input.to, userId);

    if (input.to === "email") {
      await this.sendEmailCode(user, code);
    } else {
      await this.sendPasswordCode(user, code);
    }

    return { message: "Código enviado. Por favor, verifique." };
  }

  private async sendEmailCode(user: User, code: number) {
    await this.codeVerificationService.saveCode("email", user.id, code);

    this.emailService.sendVerificationEmail(user.email.value, `${code}`);
  }

  private async sendPasswordCode(user: User, code: number) {
    await this.codeVerificationService.saveCode("password", user.id, code);

    this.emailService.sendPasswordResetEmail(user.email.value, `${code}`);
  }
}
