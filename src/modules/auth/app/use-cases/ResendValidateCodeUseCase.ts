import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { inject, injectable } from "tsyringe";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { IEmailVerificationCodeService } from "../../domain/services/contratcs/IEmailVerificationCodeService";
import { IEmailService } from "@/shared/app/contracts/IEmailService";

type ResendValidateCodeInput = {
  email: string;
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
    const email = UserEmail.create({ value: input.email });

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        email: email.value,
      });
    }

    await this.codeVerificationService.deleteCode(user.email);

    const code = this.emailVerificationCodeService.generate();

    await this.codeVerificationService.saveCode(user.email, code, 900);

    this.emailService.sendVerificationEmail(user.email.value, `${code}`);

    return { message: "Código enviado. Por favor, verifique." };
  }
}
