import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { Id } from "@/shared/domain/value-objects/Id";
import { inject, injectable } from "tsyringe";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { IVerificationCodeGeneratorService } from "../../domain/services/contratcs/IVerificationCodeGeneratorService";
import { IEmailService } from "@/shared/app/contracts/IEmailService";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";

type RequestPasswordResetInput = {
  userId: string;
};

type RequestPasswordResetOutput = {
  message: string;
};

@injectable()
export class RequestPasswordResetUseCase
  implements IUseCase<RequestPasswordResetInput, RequestPasswordResetOutput>
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
    input: RequestPasswordResetInput,
  ): Promise<RequestPasswordResetOutput> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    const code = this.verificationCodeGeneratorService.generate();

    await this.codeVerificationService.saveCode("password", user.id, code);

    this.emailService.sendPasswordResetEmail(user.email.value, `${code}`);

    return { message: "Um código foi enviado ao seu email." };
  }
}
