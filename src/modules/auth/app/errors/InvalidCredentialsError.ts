import { ErrorCodes } from "@/shared/enums/error-codes";
import { AppError } from "@/shared/errors/AppError";

export class InvalidCredentialsError extends AppError {
  code = ErrorCodes.INVALID_CREDENTIALS;
}
