import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IHashProvider } from "../contracts/IHashProvider";
import { ITokenProvider } from "../contracts/ITokenProvider";
import { inject, injectable } from "tsyringe";
import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";
import { UserPassword } from "@/modules/users/domain/value-objects/UserPassword";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";

type LoginUserInput = {
  email: string;
  password: string;
};

type LoginUserOutput = {
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class LoginUserUseCase
  implements IUseCase<LoginUserInput, LoginUserOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
    @inject("TokenProvider")
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const userEmail = UserEmail.create({ value: input.email });
    const userPassword = UserPassword.create({
      value: input.password,
      isHashed: false,
    });

    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new InvalidCredentialsError("Email ou senha inválidos", {
        email: input.email,
        password: input.password,
        errorClass: this.constructor.name,
      });
    }

    const passwordMatch = await this.hashProvider.compare(
      userPassword.value,
      user.password.value,
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError("Email ou senha inválidos", {
        email: input.email,
        password: input.password,
        errorClass: this.constructor.name,
      });
    }

    const { accessToken, refreshToken } = this.tokenProvider.generate({
      userId: user.id.value,
    });

    return { accessToken, refreshToken };
  }
}
