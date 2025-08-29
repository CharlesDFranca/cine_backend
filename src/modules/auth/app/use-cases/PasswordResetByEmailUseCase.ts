import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IHashProvider } from "../contracts/IHashProvider";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { UserPassword } from "@/modules/users/domain/value-objects/UserPassword";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { inject, injectable } from "tsyringe";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { ITokenProvider } from "../contracts/ITokenProvider";
import { Id } from "@/shared/domain/value-objects/Id";

type PasswordResetByEmailInput = {
  resetPasswordToken: string;
  code: string;
  newPassword: string;
};

type PasswordResetByEmailOutput = {
  message: string;
};

@injectable()
export class PasswordResetByEmailUseCase
  implements IUseCase<PasswordResetByEmailInput, PasswordResetByEmailOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
    @inject("CodeVerificationService")
    private readonly codeVerificationService: ICodeVerificationService,
    @inject("TokenProvider")
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async execute(
    input: PasswordResetByEmailInput,
  ): Promise<PasswordResetByEmailOutput> {
    const payload = this.tokenProvider.verifyResetPasswordToken(
      input.resetPasswordToken,
    );

    const userId = Id.refresh({ value: payload.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    const storedCode = await this.codeVerificationService.getCode(
      "password",
      user.id,
    );

    if (!storedCode || storedCode !== input.code) {
      throw new InvalidCredentialsError("Código inválido", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    const newPassword = UserPassword.create({
      value: input.newPassword,
      isHashed: false,
    });

    const newHashedPassword = UserPassword.restore({
      value: await this.hashProvider.hash(newPassword.value),
      isHashed: true,
    });

    user.updatePassword(newHashedPassword);

    await this.userRepository.update(user);

    return {
      message: "Senha alterada com sucesso.",
    };
  }
}
