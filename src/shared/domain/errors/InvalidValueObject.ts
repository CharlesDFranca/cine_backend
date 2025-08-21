import { ErrorCodes } from "@/shared/enums/error-codes";
import { DomainError } from "@/shared/errors/DomainError";

export class InvalidValueObject extends DomainError {
  code = ErrorCodes.INVALID_VALUE_OBJECT;
}
