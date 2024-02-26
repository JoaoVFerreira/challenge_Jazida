import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const message = 'Todos os campos devem estar preenchidos corretamente';

const defaultValidator = (errorOptions: { message?: string, failCode?: number } = {}) => {
  const failCodeValidation = errorOptions.failCode || StatusCodes.UNPROCESSABLE_ENTITY;
  const messageValidation = errorOptions.message || message;

  return function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(failCodeValidation).json({
        errors: errors.array(),
        message: messageValidation
      });
    }
    next();
  };
};

export default defaultValidator;