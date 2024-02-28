import { UpdatePokemonUseCase } from '$modules/pokemons/application/useCases/UpdatePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };

describe('UpdatePokemonUseCase', () => {
  it('Should update a pokemon with success', async () => {
    // ARRANGE
    const { sut, pokemonsRepository } = makeSut();
    const pokemon = await pokemonsRepository.create(exodia);

    // ACT
    await sut.execute({ id: pokemon.id, trainer: 'Jhon' });
    const result =  await pokemonsRepository.getOne({ id: pokemon.id })
    
    // ASSERT
    expect(result.id).toBe(pokemon.id);
    expect(result.trainer).toBe('Jhon');
  });

  it('Should throw when a given pokemon does not exists', async () => {
    // ARRANGE
    const { sut } = makeSut();

    // ACT
    const result = sut.execute({ id: 999, trainer: 'Jhon' });
    
    // ASSERT
    await expect(result).rejects.toThrow(
      UpdatePokemonUseCase.Messages.pokemonNotFound
    );
  });
});

type sutTypes = {
  sut: UpdatePokemonUseCase;
  pokemonsRepository: PokemonsRepositoryInMemory;
};

const makeSut = (): sutTypes => {
  const pokemonsRepository = new PokemonsRepositoryInMemory();
  const sut = new UpdatePokemonUseCase(pokemonsRepository);
  return { sut, pokemonsRepository };
};
