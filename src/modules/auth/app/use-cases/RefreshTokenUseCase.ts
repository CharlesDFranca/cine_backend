import { IUseCase } from "@/shared/app/contracts/IUseCase";
import { ITokenProvider } from "../contracts/ITokenProvider";
import { inject, injectable } from "tsyringe";

type RefreshTokenInput = {
  refreshToken: string;
};

type RefreshTokenOutput = {
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class RefreshTokenUseCase
  implements IUseCase<RefreshTokenInput, RefreshTokenOutput>
{
  constructor(
    @inject("TokenProvider")
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const payload = this.tokenProvider.verifyRefreshToken(input.refreshToken);

    const { accessToken, refreshToken } = this.tokenProvider.generate({
      userId: payload.userId,
    });

    return { accessToken, refreshToken };
  }
}
