import { DomainErrorCodes } from "./DomainErrorCodes";

export const ErrorCodes = {
  ...DomainErrorCodes,
};

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
