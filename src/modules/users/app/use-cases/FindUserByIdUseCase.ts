import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Id } from "@/shared/domain/value-objects/Id";
import { UserNotFoundError } from "../errors/UserNotFoundError";

type FindUserByIdInput = { userId: string };
type FindUserByIdOutput = {
  userId: string;
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
      throw new UserNotFoundError("Usuário não encontrado", {
        userId: userId.value,
        errorClass: this.constructor.name,
      });
    }

    return {
      userId: user.id.value,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
