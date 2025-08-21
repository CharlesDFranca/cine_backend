import { ErrorCodes } from "@/shared/enums/error-codes";

export class HttpStatusCodeMapper {
  static fromCode(code: string): number {
    switch (code) {
      case ErrorCodes.EMAIL_ALREADY_USED:
        return 409;

      case ErrorCodes.USER_NOT_FOUND:
        return 404;

      case ErrorCodes.INVALID_VALUE_OBJECT:
      case ErrorCodes.INVALID_ENTITY_TIMESTAMPS:
        return 400;

      default:
        return 500;
    }
  }
}
