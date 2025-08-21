import { ErrorCodes } from "../../enums/error-codes/";
import { DomainError } from "@/shared/errors/DomainError";

export class InvalidTimestampError extends DomainError {
  code = ErrorCodes.INVALID_ENTITY_TIMESTAMPS;
}
