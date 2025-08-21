export type ApiResponse<T> = {
  sucess: boolean;
  data: T | null;
  meta: Record<string, unknown> | null;
  errors: Record<string, unknown>;
  message: string;
};

export type ErrorResponse = {
  code: string;
  type: "Validation" | "Domain" | "Application" | "Infrastructure" | "Internal";
  message: string;
  details?: Record<string, unknown>;
};

export class ResponseFormatter {
  private constructor() {}

  static success<T>(
    data: T,
    meta?: Record<string, unknown>,
    message = "Operation carried out successfully.",
  ): ApiResponse<T> {
    return {
      sucess: true,
      data,
      meta: meta ?? null,
      errors: {},
      message,
    };
  }

  static error(
    errors: ErrorResponse,
    meta?: Record<string, unknown>,
    message = "An error occurred during the operation.",
  ) {
    return {
      sucess: false,
      data: null,
      meta: meta ?? null,
      errors,
      message,
    };
  }
}
