import { User } from "@/modules/users/domain/entities/User";
import { IUserRepository } from "@/modules/users/domain/repositories/IUserRepository";
import { IUserEmailUniquenessCheckerService } from "@/modules/users/domain/services/contracts/IUserEmailUniquenessCheckerService";
import { UserEmail } from "@/modules/users/domain/value-objects/UserEmail";
import { UserName } from "@/modules/users/domain/value-objects/UserName";
import { UserPassword } from "@/modules/users/domain/value-objects/UserPassword";
import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../contracts/IHashProvider";
import { IEmailVerificationCodeService } from "../../domain/services/contratcs/IEmailVerificationCodeService";
import { ICodeVerificationService } from "../../domain/services/contratcs/ICodeVerificationService";
import { IEmailService } from "@/shared/app/contracts/IEmailService";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserOutput = {
  message: string;
  userId: string;
};

@injectable()
export class RegisterUserUseCase
  implements IUseCase<RegisterUserInput, RegisterUserOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
    @inject("UserEmailUniquenessCheckerService")
    private readonly userEmailUniquenessCheckerService: IUserEmailUniquenessCheckerService,
    @inject("EmailVerificationCodeService")
    private readonly emailVerificationCodeService: IEmailVerificationCodeService,
    @inject("CodeVerificationService")
    private readonly codeVerificationService: ICodeVerificationService,
    @inject("EmailService")
    private readonly emailService: IEmailService,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const name = UserName.create({ value: input.name });
    const email = UserEmail.create({ value: input.email });
    const password = UserPassword.create({
      value: input.password,
      isHashed: false,
    });

    await this.userEmailUniquenessCheckerService.check(email, async (email) =>
      this.userRepository.existsByEmail(email),
    );

    const hashedPassword = await this.hashProvider.hash(password.value);

    const user = User.create({
      name,
      email,
      password: UserPassword.restore({ value: hashedPassword, isHashed: true }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const code = this.emailVerificationCodeService.generate();

    await this.userRepository.save(user);

    await this.codeVerificationService.saveCode(
      `email-verification:${user.id.value}`,
      code,
      900,
    );

    this.emailService.sendVerificationEmail(user.email.value, `${code}`);

    return {
      message: "Por favor, verifique seu email e insira o código de validaçõa.",
      userId: user.id.value,
    };
  }
}
