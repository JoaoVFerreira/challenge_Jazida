import App from '~src/app';
import { StatusCodes } from 'http-status-codes';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import { BattlePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/BattlePokemonController';
import { BattlePokemonUseCase } from '$modules/pokemons/application/useCases/BattlePokemonUseCase';
import supertest from 'supertest';
import factory from '$test/utils/factory/PokemonFactory';
import truncateDB from '$test/utils/db/TruncateDB';

const request = supertest(App);
const INEXISTENT_ID = 999;
const FIVE_SECONDS_TIMEOUT = 5000;
const WINNER_LEVEL = 9999;
const LOSER_LEVEL = 2;

describe('[BATTLE ROUTES]', () => {
  beforeEach(async () => {
    await truncateDB('pokemons');
  });

  describe('[POST] /batalhar/:pokemonA/:pokemonB', () => {
    describe('Success cases', () => {
      it('Should return [200 - OK] when a battle is success', async () => {
        // ARRANGE
        const pokemonA = await factory.create<PokemonDTO>('Pokemon');
        const pokemonB = await factory.create<PokemonDTO>('Pokemon');

        // ACT
        const response = await request.post(`/batalhar/${pokemonA.id}/${pokemonB.id}`)

        // ASSERT
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe(BattlePokemonController.Messages.Success);
        expect(response.body.response.vencedor).toBeTruthy();
        expect(response.body.response.perdedor).toBeTruthy();
      }, FIVE_SECONDS_TIMEOUT);

      it('Should return [200 - OK] increment level of the winner and decrement the loser level', async () => {
        // ARRANGE
        const winner = await factory.create<PokemonDTO>('Pokemon', { nivel: WINNER_LEVEL });
        const loser = await factory.create<PokemonDTO>('Pokemon', { nivel: LOSER_LEVEL });
        
        // ACT
        const response = await request.post(`/batalhar/${winner.id}/${loser.id}`)

        // ASSERT
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe(BattlePokemonController.Messages.Success);
        expect(response.body.response.vencedor.nivel).toBe(WINNER_LEVEL + 1);
        expect(response.body.response.perdedor.nivel).toBe(LOSER_LEVEL - 1);
      }, FIVE_SECONDS_TIMEOUT);

      it('Should delete loser pokemon when level reaches 0', async () => {
        // ARRANGE
        const winner = await factory.create<PokemonDTO>('Pokemon', { nivel: WINNER_LEVEL });
        const loser = await factory.create<PokemonDTO>('Pokemon', { nivel: 1 });
        
        // ACT
        const response = await request.post(`/batalhar/${winner.id}/${loser.id}`)
        const pokemonLoser = await request.get(`/pokemons/${loser.id}`)

        // ASSERT
        expect(response.status).toBe(StatusCodes.OK);
        expect(pokemonLoser.status).toBe(StatusCodes.NOT_FOUND);
        expect(pokemonLoser.body.message).toBe('Pokemon não encontrado.');
      }, FIVE_SECONDS_TIMEOUT);
    });

    describe('Failure cases', () => {
      it('Should return [404- NOT FOUND] when one of given pokemon is not found', async () => {
        // ARRANGE
        const pokemon = await factory.create<PokemonDTO>('Pokemon');

        // ACT
        const response = await request.post(`/batalhar/${pokemon.id}/${INEXISTENT_ID}`)

        // ASSERT
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe(BattlePokemonUseCase.Messages.pokemonsNotFound);
      }, FIVE_SECONDS_TIMEOUT);
    })
  });
});