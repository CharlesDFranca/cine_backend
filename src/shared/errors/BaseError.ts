export abstract class BaseError extends Error {
  abstract code: string;
  details? = {};

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = new.target.name;
    this.details = details || {};
    Error.captureStackTrace(this, this.constructor);
  }
}
