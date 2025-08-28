import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { IVerificationCodeGeneratorService } from "../../domain/services/contratcs/IVerificationCodeGeneratorService";
import { IEmailService } from "@/shared/app/contracts/IEmailService";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";

type RequestPasswordResetByEmailInput = {
  email: string;
};

type RequestPasswordResetEmailOutput = {
  message: string;
};

@injectable()
export class RequestPasswordResetByEmailUseCase
  implements
    IUseCase<RequestPasswordResetByEmailInput, RequestPasswordResetEmailOutput>
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
    input: RequestPasswordResetByEmailInput,
  ): Promise<RequestPasswordResetEmailOutput> {
    const email = UserEmail.create({ value: input.email });

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        email: email.value,
      });
    }

    const code = this.verificationCodeGeneratorService.generate();

    await this.codeVerificationService.saveCode("password", user.id, code);

    this.emailService.sendPasswordResetEmail(user.email.value, `${code}`);

    return { message: "Um código foi enviado ao seu email." };
  }
}
