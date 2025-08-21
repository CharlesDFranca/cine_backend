import { ErrorCodes } from "@/shared/enums/error-codes";
import { AppError } from "@/shared/errors/AppError";

export class UserNotFoundError extends AppError {
  code = ErrorCodes.USER_NOT_FOUND;
}
