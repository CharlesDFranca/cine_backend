export type TokenPayload = {
  userId: string;
  [key: string]: unknown;
};

export type TokensGenerated = {
  accessToken: string;
  refreshToken: string;
};

export type ResetPasswordToken = {
  resetPasswordToken: string;
};

export interface ITokenProvider {
  generate(payload: TokenPayload): TokensGenerated;
  generateResetPasswordToken(payload: TokenPayload): ResetPasswordToken;
  verifyAccessToken(accessToken: string): TokenPayload;
  verifyRefreshToken(refreshToken: string): TokenPayload;
  verifyResetPasswordToken(resetPasswordToken: string): TokenPayload;
}
