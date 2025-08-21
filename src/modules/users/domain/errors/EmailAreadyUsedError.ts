import { ErrorCodes } from "@/shared/enums/error-codes";
import { DomainError } from "@/shared/errors/DomainError";

export class EmailAlreadyUsedError extends DomainError {
  code = ErrorCodes.EMAIL_ALREADY_USED;
}
