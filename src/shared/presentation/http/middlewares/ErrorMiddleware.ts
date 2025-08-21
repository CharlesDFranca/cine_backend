import { NextFunction, Request, Response } from "express";
import { ResponseFormatter } from "../../formatters/ResponseFormatter";
import { HttpStatusCodeMapper } from "../../mappers/HttpStatusCodeMapper";
import { HttpErrorMapper } from "../../mappers/HttpErrorMapper";

export class ErrorMiddleware {
  private constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  static use(err: any, req: Request, res: Response, next: NextFunction) {
    const error = err instanceof Error ? err : new Error(String(err));

    const mappedError = HttpErrorMapper.toErrorResponse(error);
    const statusCode = HttpStatusCodeMapper.fromCode(mappedError.code);

    const response = ResponseFormatter.error(mappedError);

    res.status(statusCode).json(response);
  }
}
