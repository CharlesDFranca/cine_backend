import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { UserName } from "../../domain/value-objects/UserName";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IHashProvider } from "../contracts/IHashProvider";
import { inject, injectable } from "tsyringe";
import { User } from "../../domain/entities/User";
import { IUserEmailUniquenessCheckerService } from "../../domain/services/contracts/IUserEmailUniquenessCheckerService";

type CreateUserInput = { name: string; email: string; password: string };
type CreateUserOutput = { userId: string };

@injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
    @inject("UserEmailUniquenessCheckerService")
    private readonly userEmailUniquenessCheckerService: IUserEmailUniquenessCheckerService,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
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

    await this.userRepository.save(user);

    return { userId: user.id.value };
  }
}
