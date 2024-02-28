import { GetAllPokemonsUseCase } from '$modules/pokemons/application/useCases/GetAllPokemonsUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';

const exodia = { trainer: 'Aspas', level: 999, type: 'Exódia' };
const POKEMONS_AMOUNT = 5;

describe('GetAllPokemonsUseCase', () => {
  it('Should retrive all pokemons', async () => {
    // ARRANGE
    const { sut, pokemonsRepository } = makeSut();
    Array.from({ length: POKEMONS_AMOUNT }, async () => await pokemonsRepository.create(exodia));

    // ACT
    const result = await sut.execute();
    
    // ASSERT
    expect(result.length).toBe(POKEMONS_AMOUNT);
    result.forEach(({ id, tipo, nivel, treinador }, index) => {
      expect(id).toBe(index + 1);
      expect(tipo).toBe(exodia.type);
      expect(nivel).toBe(exodia.level);
      expect(treinador).toBe(exodia.trainer);
    });
  });

  it('Should throw when does not exists pokemons', async () => {
    // ARRANGE
    const { sut } = makeSut();

    // ACT
    const result = sut.execute();
    
    // ASSERT
    await expect(result).rejects.toThrow(
      GetAllPokemonsUseCase.Messages.pokemonsNotFound
    );
  });
});

type sutTypes = {
  sut: GetAllPokemonsUseCase;
  pokemonsRepository: PokemonsRepositoryInMemory;
};

const makeSut = (): sutTypes => {
  const pokemonsRepository = new PokemonsRepositoryInMemory();
  const sut = new GetAllPokemonsUseCase(pokemonsRepository);
  return { sut, pokemonsRepository };
};
