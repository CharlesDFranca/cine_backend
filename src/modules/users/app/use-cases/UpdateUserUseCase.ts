import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserName } from "../../domain/value-objects/UserName";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { IHashProvider } from "../contracts/IHashProvider";
import { IUserEmailUniquenessCheckerService } from "../../domain/services/contracts/IUserEmailUniquenessCheckerService";

type UpdateUserInput = {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
};
type UpdateUserOutput = { userId: string };

@injectable()
export class UpdateUserUseCase
  implements IUseCase<UpdateUserInput, UpdateUserOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,
    @inject("UserEmailUniquenessCheckerService")
    private readonly userEmailUniquenessCheckerService: IUserEmailUniquenessCheckerService,
  ) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (input.email && user.email.value !== input.email) {
      const email = UserEmail.create({ value: input.email });

      await this.userEmailUniquenessCheckerService.check(email, async (email) =>
        this.userRepository.existsByEmail(email),
      );

      user.updateEmail(email);
    }

    if (input.name) {
      user.updateName(UserName.create({ value: input.name }));
    }

    if (input.password) {
      const hashedPassword = await this.hashProvider.hash(input.password);
      
      user.updatePassword(
        UserPassword.restore({ value: hashedPassword, isHashed: true }),
      );
    }

    await this.userRepository.update(user);

    return { userId: user.id.value };
  }
}
