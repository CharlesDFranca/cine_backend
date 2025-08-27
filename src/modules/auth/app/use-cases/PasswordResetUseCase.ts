import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IHashProvider } from "../contracts/IHashProvider";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { UserPassword } from "@/modules/users/domain/value-objects/UserPassword";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { inject, injectable } from "tsyringe";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { envConfig } from "@/config/env/EnvConfig";

type PasswordResetInput = {
  code: string;
  userId: string;
  oldPassword: string;
  newPassword: string;
};

type PasswordResetOutput = {
  message: string;
};

@injectable()
export class PasswordResetUseCase
  implements IUseCase<PasswordResetInput, PasswordResetOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
    @inject("CodeVerificationService")
    private readonly codeVerificationService: ICodeVerificationService,
  ) {}

  async execute(input: PasswordResetInput): Promise<PasswordResetOutput> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

    const key = `${envConfig.getResetPasswordKey()}:${user.id.value}`;

    const storedCode = await this.codeVerificationService.getCode(key);

    if (!storedCode || storedCode !== input.code) {
      throw new Error("Codigo invalido");
    }

    await this.codeVerificationService.deleteCode(key);

    const oldPassword = UserPassword.create({
      value: input.oldPassword,
      isHashed: false,
    });

    const newPassword = UserPassword.create({
      value: input.newPassword,
      isHashed: false,
    });

    const passwordMatch = await this.hashProvider.compare(
      oldPassword.value,
      user.password.value,
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError("Senha incorreta", {
        errorClass: this.constructor.name,
        password: oldPassword.value,
      });
    }

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
