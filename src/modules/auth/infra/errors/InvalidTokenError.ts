import { ErrorCodes } from "@/shared/enums/error-codes";
import { InfraError } from "@/shared/errors/InfraError";

export class InvalidTokenError extends InfraError {
  code = ErrorCodes.INVALID_TOKEN;
}
