export class AppError extends Error {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, AppError);
  }
}
