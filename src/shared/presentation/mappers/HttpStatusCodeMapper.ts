import { ErrorCodes } from "@/shared/enums/error-codes";

export class HttpStatusCodeMapper {
  static fromCode(code: string): number {
    switch (code) {
      case ErrorCodes.MISSING_AUTH_HEADER:
      case ErrorCodes.MALFORMED_AUTH_HEADER:
        return 400;

      case ErrorCodes.INVALID_CREDENTIALS:
      case ErrorCodes.INVALID_TOKEN:
      case ErrorCodes.UNAUTHORIZED:
        return 401;

      case ErrorCodes.USER_NOT_FOUND:
        return 404;

      case ErrorCodes.EMAIL_ALREADY_USED:
      case ErrorCodes.DUPLICATE_MOVIE_SCHEDULE:
        return 409;

      case ErrorCodes.INVALID_VALUE_OBJECT:
      case ErrorCodes.INVALID_ENTITY_TIMESTAMPS:
      case ErrorCodes.INVALID_SHOWTIME:
        return 422;

      default:
        return 500;
    }
  }
}
