import { ErrorCodes } from "@/shared/enums/error-codes";
import { AppError } from "@/shared/errors/AppError";

export class MovieNotFoundError extends AppError {
  code = ErrorCodes.MOVIE_NOT_FOUND;
}
