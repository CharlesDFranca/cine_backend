import { ErrorCodes } from "@/shared/enums/error-codes";
import { DomainError } from "@/shared/errors/DomainError";

export class InvalidShowtimeError extends DomainError {
  code = ErrorCodes.INVALID_SHOWTIME;
}
