export type TokenPayload = {
  userId: string;
  [key: string]: unknown;
};

export type TokensGenerated = {
  accessToken: string;
  refreshToken: string;
};

export interface ITokenProvider {
  generate(payload: TokenPayload): TokensGenerated;
  verifyAccessToken(accessToken: string): TokenPayload;
  verifyRefreshToken(refreshToken: string): TokenPayload;
}
