/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorResponse } from "../formatters/ResponseFormatter";
import { ZodError } from "zod";
import { BaseError } from "@/shared/errors/BaseError";
import { AppError } from "@/shared/errors/AppError";
import { DomainError } from "@/shared/errors/DomainError";
import { InfraError } from "@/shared/errors/InfraError";

export class HttpErrorMapper {
  static toErrorResponse(error: Error | ZodError): ErrorResponse {
    if (isDomainError(error)) {
      return {
        code: (error as BaseError).code ?? "DOMAIN_ERROR",
        type: "Domain",
        message: error.message,
        details: error.details,
      };
    }

    if (isAppError(error)) {
      return {
        code: (error as BaseError).code ?? "APPLICATION_ERROR",
        type: "Application",
        message: error.message,
        details: error.details,
      };
    }

    if (isInfraError(error)) {
      return {
        code: (error as BaseError).code ?? "INFRA_ERROR",
        type: "Infrastructure",
        message: error.message,
        details: error.details,
      };
    }

    if (isValidationError(error as ZodError)) {
      return {
        code: "VALIDATION_ERROR",
        type: "Validation",
        message: error.message,
        details: {},
      };
    }

    return {
      code: "UNKNOWN_ERROR",
      type: "Internal",
      message: error.message ?? "Unexpected error occurred.",
      details: (error as any).original ?? undefined,
    };
  }
}

const isAppError = (error: Error): error is AppError => {
  return error.name === "AppError" || error instanceof AppError;
};
const isDomainError = (error: Error): error is DomainError => {
  return error.name === "DomainError" || error instanceof DomainError;
};

const isInfraError = (error: Error): error is InfraError => {
  return error.name === "InfraError" || error instanceof InfraError;
};

const isValidationError = (error: ZodError): error is ZodError => {
  return error.name === "ZodError" || error instanceof ZodError;
};
