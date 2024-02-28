import { CreatePokemonUseCase } from '$modules/pokemons/application/useCases/CreatePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

describe('CreatePokemonUseCase', () => {
  it('Should create a pokemon with success', async () => {
    // ARRANGE
    const { sut, pokemonsRepository } = makeSut();
    const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };

    // ACT
    const result = await sut.execute(exodia);
    const pokemon = await pokemonsRepository.getOne({ id: result.id })
    
    // ASSERT
    expect(result.id).toBe(pokemon.id);
    expect(result.nivel).toEqual(pokemon.level);
    expect(result.tipo).toEqual(pokemon.type);
    expect(result.treinador).toEqual(pokemon.trainer);
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
