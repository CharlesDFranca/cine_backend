import { ErrorCodes } from "@/shared/enums/error-codes";
import { AppError } from "@/shared/errors/AppError";

export class MalformedAuthHeaderError extends AppError {
  code = ErrorCodes.MALFORMED_AUTH_HEADER;

  constructor(details?: Record<string, unknown>) {
    super("Cabeçalho de autenticação mal formatado", {
      ...details,
      expectedFormat: "Authorization: Bearer <token>",
    });
  }
}
