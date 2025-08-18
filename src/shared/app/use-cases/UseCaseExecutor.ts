import { IUseCase } from "../contracts/IUseCase";

export class UseCaseExecutor {
  static async run<Input, Output>(
    useCase: IUseCase<Input, Output>,
    input: Input,
  ): Promise<Output> {
    try {
      return await useCase.execute(input);
    } catch (err) {
      if (useCase.rollback) await useCase.rollback(input);
      throw err;
    }
  }
}
