import defaultCheckValidator from '$shared/infra/http/validators/DefaultValidator';
import { NextFunction, Request, Response } from 'express';
import { ValidationChain, param } from 'express-validator';

const defaultValidator = (req: Request, res: Response, next: NextFunction): ValidationChain => 
  defaultCheckValidator()(req, res, next) as unknown as ValidationChain;

const pokemonsIdValidator = [
  param('pokemonAId')
  .isInt({ gt: 0 })
  .withMessage('pokemonAId deve ser um valor inteiro maior que zero!'),
  param('pokemonBId')
  .isInt({ gt: 0 })
  .withMessage('pokemonBId deve ser um valor inteiro maior que zero!'),
  defaultValidator
];

export { pokemonsIdValidator };

