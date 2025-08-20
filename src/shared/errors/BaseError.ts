export abstract class BaseError extends Error {
  abstract code: string;
  details? = {};

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

