import App from '~src/app';
import { StatusCodes } from 'http-status-codes';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import { GetOnePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/GetOnePokemonController';
import { GetAllPokemonsController } from '$modules/pokemons/infra/sequelize/http/controllers/GetAllPokemonsController';
import { CreatePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/CreatePokemonController';
import { GetOnePokemonUseCase } from '$modules/pokemons/application/useCases/GetOnePokemonUseCase';
import { GetAllPokemonsUseCase } from '$modules/pokemons/application/useCases/GetAllPokemonsUseCase';
import { UpdatePokemonUseCase } from '$modules/pokemons/application/useCases/UpdatePokemonUseCase';
import { DeletePokemonUseCase } from '$modules/pokemons/application/useCases/DeletePokemonUseCase';
import supertest from 'supertest';
import factory from '$test/utils/factory/PokemonFactory';
import truncateDB from '$test/utils/db/TruncateDB';

const request = supertest(App);
const INEXISTENT_ID = 999;
const FIVE_SECONDS_TIMEOUT = 5000;
const POKEMONS_AMOUNT = 5;
const starterPokemons = ['charizard', 'mewtwo', 'pikachu'];

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

  describe('[GET] /pokemons', () => {
    describe('Success cases', () => {
      it('Should return [200 - OK] with an array of pokemons', async () => {
        // ARRANGE
        const pokemons = Array.from({ length: POKEMONS_AMOUNT }, async () => await factory.create<PokemonDTO>('Pokemon'));
        await Promise.all(pokemons);

        // ACT
        const response = await request.get('/pokemons');
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toEqual(GetAllPokemonsController.Messages.Success);
        expect(response.body.response.length).toBe(POKEMONS_AMOUNT);
      }, FIVE_SECONDS_TIMEOUT);
    });
    
    describe('Failure cases', () => {
      it('Should return [404 - NOT FOUND] when pokemons does not exists', async () => {
        // ACT
        const response = await request.get('/pokemons');
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toEqual(GetAllPokemonsUseCase.Messages.pokemonsNotFound);
      }, FIVE_SECONDS_TIMEOUT);
    });
  });

  describe('[POST] /pokemons', () => {
    describe('Success cases', () => {
      it('Should return [200 - OK] when a pokemon is created', async () => {
        // ARRANGE
        const pokemon = { tipo: 'Exódia', treinador: 'Yugi', nivel: 999 };
        
        // ACT
        const response = await request.post('/pokemons').send(pokemon);
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toEqual(CreatePokemonController.Messages.Success);
        expect(response.body.response).toEqual({ ...pokemon, id: expect.any(Number) });
      }, FIVE_SECONDS_TIMEOUT);
    });
    
  describe('Failure cases', () => {
      it('Should return [422 - UNPROCESSABLE ENTITY] when field is missing', async () => {
        // ARRANGE
        const pokemon = { tipo: 'Pikachu', nivel: 99 };

        // ACT
        const response = await request.post('/pokemons').send(pokemon);
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body.message).toBe('Todos os campos devem estar preenchidos corretamente');
      }, FIVE_SECONDS_TIMEOUT);

      it('Should return [422 - UNPROCESSABLE_ENTITY] when a starter pokemon has a level !== 1', async () => {
        // ARRANGE
        const pokemon = { tipo: 'Pikachu', treinador: 'Yugi', nivel: 999 };
        
        // ACT
        const response = await request.post('/pokemons').send(pokemon);
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body.errors[0].msg).toEqual(`Os seguintes pokemons iniciais ${starterPokemons.join(', ')} devem ser de nivel 1.`);
      }, FIVE_SECONDS_TIMEOUT);
    });
  });

  describe('[PUT] /pokemons/:id', () => {
    describe('Success cases', () => {
      it('Should return [204 - NO CONTENT] when a pokemon is updated', async () => {
        // ARRANGE
        const pokemon = await factory.create<PokemonDTO>('Pokemon');
        const update = { treinador: 'Katara' };
        
        // ACT
        const response = await request.put(`/pokemons/${pokemon.id}`).send(update);
        const checkPokemon = await request.get(`/pokemons/${pokemon.id}`);

        // ASSERT
        expect(response.status).toBe(StatusCodes.NO_CONTENT);
        expect(checkPokemon.body.response.treinador).toBe(update.treinador);
      }, FIVE_SECONDS_TIMEOUT);
    });
    
  describe('Failure cases', () => {
      it('Should return [404 - NOT FOUND] when pokemon does not exists', async () => {
        // ARRANGE
        const pokemon = { treinador: 'Katara' };

        // ACT
        const response = await request.put(`/pokemons/${INEXISTENT_ID}`).send(pokemon);
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe(UpdatePokemonUseCase.Messages.pokemonNotFound);
      }, FIVE_SECONDS_TIMEOUT);
    });
  });

  describe('[DELETE] /pokemons/:id', () => {
    describe('Success cases', () => {
      it('Should return [204 - NO CONTENT] when a pokemon is deleted', async () => {
        // ARRANGE
        const pokemon = await factory.create<PokemonDTO>('Pokemon');
        
        // ACT
        const response = await request.delete(`/pokemons/${pokemon.id}`);
        const checkPokemon = await request.get(`/pokemons/${pokemon.id}`);

        // ASSERT
        expect(response.status).toBe(StatusCodes.NO_CONTENT);
        expect(checkPokemon.body.message).toBe('Pokemon não encontrado.');
      }, FIVE_SECONDS_TIMEOUT);
    });
    
  describe('Failure cases', () => {
      it('Should return [404 - NOT FOUND] when pokemon does not exists', async () => {
        // ACT
        const response = await request.delete(`/pokemons/${INEXISTENT_ID}`)
        
        // ASSERT
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe(DeletePokemonUseCase.Messages.pokemonNotFound);
      }, FIVE_SECONDS_TIMEOUT);
    });
  });
})