import { GetOnePokemonUseCase } from '$modules/pokemons/application/useCases/GetOnePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };

describe('GetOnePokemonUseCase', () => {
  it('Should get a pokemon with success', async () => {
    // ARRANGE
    const { sut, pokemonsRepository } = makeSut();
    const pokemon = await pokemonsRepository.create(exodia);

    // ACT
    const result = await sut.execute({ id: pokemon.id });
    
    // ASSERT
    expect(result.id).toBe(pokemon.id);
    expect(result.nivel).toBe(pokemon.level);
    expect(result.treinador).toBe(pokemon.trainer);
    expect(result.tipo).toBe(pokemon.type);
  });

  it('Should throw when a given pokemon does not exists', async () => {
    // ARRANGE
    const { sut } = makeSut();

    // ACT
    const result = sut.execute({ id: 999 });
    
    // ASSERT
    await expect(result).rejects.toThrow(
      GetOnePokemonUseCase.Messages.pokemonNotFound
    );
  });
});

type sutTypes = {
  sut: GetOnePokemonUseCase;
  pokemonsRepository: PokemonsRepositoryInMemory;
};

const makeSut = (): sutTypes => {
  const pokemonsRepository = new PokemonsRepositoryInMemory();
  const sut = new GetOnePokemonUseCase(pokemonsRepository);
  return { sut, pokemonsRepository };
};
