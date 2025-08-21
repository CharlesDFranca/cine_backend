export abstract class BaseError extends Error {
  abstract code: string;
  details? = {};

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = new.target.name;
    this.details = {
      ...details,
      context: new.target.name,
    };
    Error.captureStackTrace(this, this.constructor);
  }
}
