import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { inject, injectable } from "tsyringe";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { IEmailVerificationCodeService } from "../../domain/services/contratcs/IEmailVerificationCodeService";
import { IEmailService } from "@/shared/app/contracts/IEmailService";
import { Id } from "@/shared/domain/value-objects/Id";

type ResendValidateCodeInput = {
  userId: string;
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
    @inject("EmailVerificationCodeService")
    private readonly emailVerificationCodeService: IEmailVerificationCodeService,
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

    const key = `email-verification:${user.id.value}`;

    await this.codeVerificationService.deleteCode(key);

    const code = this.emailVerificationCodeService.generate();

    await this.codeVerificationService.saveCode(key, code, 900);

    this.emailService.sendVerificationEmail(user.email.value, `${code}`);

    return { message: "Código enviado. Por favor, verifique." };
  }
}
