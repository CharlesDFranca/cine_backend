import { ErrorCodes } from "@/shared/enums/error-codes";
import { DomainError } from "@/shared/errors/DomainError";

export class DuplicateMovieScheduleError extends DomainError {
  code = ErrorCodes.DUPLICATE_MOVIE_SCHEDULE;
}
