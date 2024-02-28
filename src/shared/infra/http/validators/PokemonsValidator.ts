import defaultCheckValidator from '$shared/infra/http/validators/DefaultValidator';
import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, param } from 'express-validator';
import { ValidationError } from '$errors/ValidationError'

const defaultValidator = (req: Request, res: Response, next: NextFunction): ValidationChain => 
  defaultCheckValidator()(req, res, next) as unknown as ValidationChain;

const checkStarterPokemons = (): ValidationChain => {
  return body().custom((_, { req }) => {
    const starterPokemons = ['charizard', 'mewtwo', 'pikachu'];
    if (starterPokemons.includes(req.body?.tipo?.toLowerCase()) && req.body?.nivel !== 1) {
      throw new ValidationError(`Os seguintes pokemons iniciais ${starterPokemons.join(', ')} devem ser de nivel 1.`);
    }
    return true;
  });
};

const createPokemonValidator = [
  body('tipo')
    .isString()
    .notEmpty()
  .withMessage('Tipo deve ser uma string não vazia!'),
  body('treinador')
    .notEmpty()
    .isString()
  .withMessage('Treinador deve ser uma string não vazia!'),
  body('nivel')
    .isInt({ gt: 0 })
    .withMessage('Nivel deve ser um valor inteiro maior que zero!'),
  checkStarterPokemons(),
  defaultValidator
];

const pokemonIdValidator = [
  param('pokemonId')
  .isInt({ gt: 0 })
  .withMessage('pokemonId deve ser um valor inteiro maior que zero!'),
  defaultValidator
];

const updatePokemonValidator = [
  body('treinador')
    .notEmpty()
    .isString()
  .withMessage('Treinador deve ser uma string não vazia!'),
  defaultValidator
];

export { createPokemonValidator, pokemonIdValidator, updatePokemonValidator };

