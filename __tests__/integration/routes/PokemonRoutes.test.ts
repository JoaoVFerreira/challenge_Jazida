import App from '~src/app';
import { StatusCodes } from 'http-status-codes';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import { GetOnePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/GetOnePokemonController';
import { GetOnePokemonUseCase } from '$modules/pokemons/application/useCases/GetOnePokemonUseCase';
import supertest from 'supertest';
import factory from '$test/utils/factory/PokemonFactory';
import truncateDB from '$test/utils/db/TruncateDB';

const request = supertest(App);
const INEXISTENT_ID = 999;
const FIVE_SECONDS_TIMEOUT = 5000;

describe('[POKEMONS ROUTES]', () => {
  beforeEach(async () => {
    await truncateDB('pokemons');
  });

  describe('[GET] /pokemons/:id', () => {
    describe('Success cases', () => {
      it('Should return [200 - OK]', async () => {
        // ARRANGE
        const pokemon = await factory.create<PokemonDTO>('Pokemon');

        // ACT
        const response = await request.get(`/pokemons/${pokemon.id}`);
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toEqual(GetOnePokemonController.Messages.Success);
      }, FIVE_SECONDS_TIMEOUT);
    });
    describe('Failure cases', () => {
      it('Should return [404 - NOT FOUND] when pokemon does not exists', async () => {
        // ACT
        const response = await request.get(`/pokemons/${INEXISTENT_ID}`);
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toEqual(GetOnePokemonUseCase.Messages.pokemonNotFound);
      }, FIVE_SECONDS_TIMEOUT);
    });
  });
})