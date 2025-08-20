import { NextFunction, Request, Response } from "express";
import {
  ErrorResponse,
  ResponseFormatter,
} from "../../formatters/ResponseFormatter";

export class ErrorMiddleware {
  private constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  static use(error: any, req: Request, res: Response, next: NextFunction) {
    console.error(error);

    const statusCode = error.statusCode || 500;

    const errorResponse: ErrorResponse = {
      code: statusCode,
      details: error.details ?? {},
      message: "Ocorreu um erro",
      type: "Internal",
    };

    return res
      .status(statusCode)
      .json(
        ResponseFormatter.error(
          errorResponse,
          {},
          error.message || "Internal server error.",
        ),
      );
  }
}
