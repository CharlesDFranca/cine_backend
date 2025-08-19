import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Id } from "@/shared/domain/value-objects/Id";

type FindUserByIdInput = { userId: string };
type FindUserByIdOutput = {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

@injectable()
export class FindUserByIdUseCase
  implements IUseCase<FindUserByIdInput, FindUserByIdOutput>
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: FindUserByIdInput): Promise<FindUserByIdOutput> {
    const userId = Id.refresh({ value: input.userId });

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
