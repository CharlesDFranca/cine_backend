import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";

type ValidateEmailCodeInput = {
  email: string;
  code: string;
};

type ValidateEmailCodeOutput = {
  message: string;
};

@injectable()
export class ValidateEmailCodeUseCase
  implements IUseCase<ValidateEmailCodeInput, ValidateEmailCodeOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("CodeVerificationService")
    private readonly codeVerificationService: ICodeVerificationService,
  ) {}

  async execute(
    input: ValidateEmailCodeInput,
  ): Promise<ValidateEmailCodeOutput> {
    const email = UserEmail.create({ value: input.email });

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        email: email.value,
      });
    }

    const storedCode = await this.codeVerificationService.getCode(user.email);

    if (!storedCode || storedCode !== input.code) {
      throw new Error("Codigo invalido");
    }

    user.confirmEmail();

    await this.userRepository.update(user);

    await this.codeVerificationService.deleteCode(user.email);

    return { message: "Usuário verificado com sucesso" };
  }
}
