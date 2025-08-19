import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { Id } from "@/shared/domain/value-objects/Id";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

type DeleteUserInput = { userId: string };
type DeleteUserOutput = void;

@injectable()
export class DeleteUserUseCase
  implements IUseCase<DeleteUserInput, DeleteUserOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: DeleteUserInput): Promise<void> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.delete(userId);
  }
}
