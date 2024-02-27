import { BattlePokemonUseCase } from '$modules/pokemons/application/useCases/BattlePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

const charizard = { trainer: 'Less', level: 1, type: 'Charizard' };
const articuno = { trainer: 'Sacy', level: 7, type: 'Articuno' };
const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };

describe('BattlePokemonUseCase', () => {
  it('Should get 2 pokemons and battle with success', async () => {
    // ARRANGE
    const { pokemonsRepository, sut } = makeSut();
    const pokemonA = await pokemonsRepository.create(charizard);
    const pokemonB = await pokemonsRepository.create(articuno);

    // ACT
    const result = await sut.execute({ pokemonIdA: pokemonA.id, pokemonIdB: pokemonB.id });

    // ASSERT
    expect(result.perdedor).toBeTruthy();
    expect(result.vencedor).toBeTruthy();
  });
});


type sutTypes = {
  sut: BattlePokemonUseCase;
  pokemonsRepository: PokemonsRepositoryInMemory;
};

const makeSut = (): sutTypes => {
  const pokemonsRepository = new PokemonsRepositoryInMemory();
  const sut = new BattlePokemonUseCase(pokemonsRepository);
  return { sut, pokemonsRepository };
};
