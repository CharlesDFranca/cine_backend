type DetailsProps = {
  errorClass: string;
  [keyof: string]: unknown;
};

export abstract class BaseError extends Error {
  abstract code: string;
  details? = {};

  constructor(message: string, details: DetailsProps) {
    super(message);
    this.name = new.target.name;
    this.details = {
      ...details,
      context: new.target.name,
    };
    Error.captureStackTrace(this, this.constructor);
  }
}
