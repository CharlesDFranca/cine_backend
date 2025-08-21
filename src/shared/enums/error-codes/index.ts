import { AppErrorCodes } from "./AppErrorCodes";
import { DomainErrorCodes } from "./DomainErrorCodes";
import { InfraErrorCodes } from "./InfraErrorCodes";
import { UserErrorCodes } from "./UserErrorCodes";

export const ErrorCodes = {
  ...DomainErrorCodes,
  ...AppErrorCodes,
  ...InfraErrorCodes,

  ...UserErrorCodes,
};

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
