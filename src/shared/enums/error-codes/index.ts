import { AppErrorCodes } from "./AppErrorCodes";
import { DomainErrorCodes } from "./DomainErrorCodes";
import { UserErrorCodes } from "./UserErrorCodes";

export const ErrorCodes = {
  ...DomainErrorCodes,
  ...AppErrorCodes,

  ...UserErrorCodes,
};

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
