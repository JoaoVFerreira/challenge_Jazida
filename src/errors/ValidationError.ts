import { StatusCodes } from 'http-status-codes';

export class ValidationError extends Error {
  statusCode: StatusCodes;
  constructor(message?: string) {
    super(message);
    this.statusCode = StatusCodes.FAILED_DEPENDENCY;
  }
}