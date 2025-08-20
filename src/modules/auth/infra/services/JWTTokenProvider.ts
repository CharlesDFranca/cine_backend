import { envConfig } from "@/config/env/EnvConfig";
import {
  ITokenProvider,
  TokenPayload,
  TokensGenerated,
} from "../../app/contracts/ITokenProvider";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
export class JWTTokenProvider implements ITokenProvider {
  private readonly ACCESS_TOKEN_SECRET = envConfig.getAccessTokenSecret();
  private readonly REFRESH_TOKEN_SECRET = envConfig.getRefreshTokenSecret();

  generate(payload: TokenPayload): TokensGenerated {
    const accessToken = jwt.sign({ ...payload }, this.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ ...payload }, this.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  verifyAccessToken(accessToken: string): TokenPayload {
    return jwt.verify(accessToken, this.ACCESS_TOKEN_SECRET) as TokenPayload;
  }

  verifyRefreshToken(refreshToken: string): TokenPayload {
    return jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET) as TokenPayload;
  }
}
