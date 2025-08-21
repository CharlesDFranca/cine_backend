import { AppErrorCodes } from "./AppErrorCodes";
import { DomainErrorCodes } from "./DomainErrorCodes";
import { InfraErrorCodes } from "./InfraErrorCodes";
import { MovieErrorCodes } from "./MovieErrorCodes";
import { UserErrorCodes } from "./UserErrorCodes";

export const ErrorCodes = {
  ...DomainErrorCodes,
  ...AppErrorCodes,
  ...InfraErrorCodes,

  ...UserErrorCodes,

  ...MovieErrorCodes,
};

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
