import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { Id } from "@/shared/domain/value-objects/Id";

type ValidateEmailCodeInput = {
  userId: string;
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
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    const storedCode = await this.codeVerificationService.getCode(
      "email",
      user.id,
    );

    if (!storedCode || storedCode !== input.code) {
      throw new Error("Codigo invalido");
    }

    user.confirmEmail();

    await this.userRepository.update(user);

    await this.codeVerificationService.deleteCode("email", user.id);

    return { message: "Usuário verificado com sucesso" };
  }
}
