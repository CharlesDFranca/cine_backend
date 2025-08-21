import { envConfig } from "@/config/env/EnvConfig";
import {
  ITokenProvider,
  TokenPayload,
  TokensGenerated,
} from "../../app/contracts/ITokenProvider";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { InvalidTokenError } from "../errors/InvalidTokenError";

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
    try {
      return jwt.verify(accessToken, this.ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new InvalidTokenError("Token de acesso expirado", {
          reason: "expired",
        });
      }
      throw new InvalidTokenError("Token de acesso inválido", {
        reason: "malformed",
      });
    }
  }

  verifyRefreshToken(refreshToken: string): TokenPayload {
    try {
      return jwt.verify(
        refreshToken,
        this.REFRESH_TOKEN_SECRET,
      ) as TokenPayload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new InvalidTokenError("Refresh token expirado", {
          reason: "expired",
        });
      }
      throw new InvalidTokenError("Refresh token inválido", {
        reason: "malformed",
      });
    }
  }
}
