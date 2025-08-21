import { ErrorCodes } from "@/shared/enums/error-codes";
import { AppError } from "@/shared/errors/AppError";

export class UnauthorizedError extends AppError {
  code = ErrorCodes.UNAUTHORIZED;

  constructor(details?: Record<string, unknown>) {
    super("Usuário não autorizado", details);
  }
}
