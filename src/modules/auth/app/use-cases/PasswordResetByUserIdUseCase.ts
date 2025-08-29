import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IHashProvider } from "../contracts/IHashProvider";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "@/modules/users/app/errors/UserNotFoundError";
import { UserPassword } from "@/modules/users/domain/value-objects/UserPassword";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { inject, injectable } from "tsyringe";

type PasswordResetByUserIdInput = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};

type PasswordResetByUserIdOutput = {
  message: string;
};

@injectable()
export class PasswordResetByUserIdUseCase
  implements IUseCase<PasswordResetByUserIdInput, PasswordResetByUserIdOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(
    input: PasswordResetByUserIdInput,
  ): Promise<PasswordResetByUserIdOutput> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("Usuário não cadastrado", {
        errorClass: this.constructor.name,
        userId: userId.value,
      });
    }

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
