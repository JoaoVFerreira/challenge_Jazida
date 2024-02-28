import { CreatePokemonUseCase } from '$modules/pokemons/application/useCases/CreatePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

describe('CreatePokemonUseCase', () => {
  it('Should create a pokemon with success', async () => {
    // ARRANGE
    const { sut } = makeSut();
    const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };

    // ACT
    const result = await sut.execute(exodia);
    
    // ASSERT
    expect(result.id).toBe(expect.any(Number));
    expect(result.nivel).toEqual(exodia.level);
    expect(result.tipo).toEqual(exodia.type);
    expect(result.treinador).toEqual(exodia.trainer);
  });
});

type sutTypes = {
  sut: CreatePokemonUseCase;
  pokemonsRepository: PokemonsRepositoryInMemory;
};

const makeSut = (): sutTypes => {
  const pokemonsRepository = new PokemonsRepositoryInMemory();
  const sut = new CreatePokemonUseCase(pokemonsRepository);
  return { sut, pokemonsRepository };
};
