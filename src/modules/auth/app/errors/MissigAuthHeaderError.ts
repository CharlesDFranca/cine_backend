import { ErrorCodes } from "@/shared/enums/error-codes";
import { AppError } from "@/shared/errors/AppError";

export class MissingAuthHeaderError extends AppError {
  code = ErrorCodes.MISSING_AUTH_HEADER;

  constructor(details?: Record<string, unknown>) {
    super("Os cabeçalhos de autenticação não foram providos", details);
  }
}
