import { DeletePokemonUseCase } from '$modules/pokemons/application/useCases/DeletePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };

describe('DeletePokemonUseCase', () => {
  it('Should delete a pokemon with success', async () => {
    // ARRANGE
    const { sut, pokemonsRepository } = makeSut();
    const pokemon = await pokemonsRepository.create(exodia);

    // ACT
    await sut.execute({ id: pokemon.id });
    const result = await pokemonsRepository.getOne({ id: pokemon.id })
    
    // ASSERT
    expect(result).toBeFalsy();
  });

  it('Should throw when a given pokemon is not found', async () => {
    // ARRANGE
    const { sut } = makeSut();

    // ACT
    const result = sut.execute({ id: 999 });
    
    // ASSERT
    await expect(result).rejects.toThrow(
      DeletePokemonUseCase.Messages.pokemonNotFound
    );
  });
});

type sutTypes = {
  sut: DeletePokemonUseCase;
  pokemonsRepository: PokemonsRepositoryInMemory;
};

const makeSut = (): sutTypes => {
  const pokemonsRepository = new PokemonsRepositoryInMemory();
  const sut = new DeletePokemonUseCase(pokemonsRepository);
  return { sut, pokemonsRepository };
};
