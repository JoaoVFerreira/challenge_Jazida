import { BattlePokemonUseCase } from '$modules/pokemons/application/useCases/BattlePokemonUseCase';
import { PokemonsRepositoryInMemory } from '$test/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory';
import { NotFoundError } from '$errors/NotFoundError';

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

  it('Should increment winner and decrement loser level', async () => {
    // ARRANGE
    const { pokemonsRepository, sut } = makeSut();
    const pokemonA = await pokemonsRepository.create(exodia);
    const pokemonB = await pokemonsRepository.create(charizard);

    // ACT
    const result = await sut.execute({ pokemonIdA: pokemonA.id, pokemonIdB: pokemonB.id });

    // ASSERT
    expect(result.vencedor.nivel).toBe(pokemonA.level + 1);
    expect(result.perdedor.nivel).toBe(pokemonB.level - 1);
  });

  it('Should delete when the loser reaches level 0', async () => {
    // ARRANGE
    const { pokemonsRepository, sut } = makeSut();
    const pokemonA = await pokemonsRepository.create(exodia);
    const pokemonB = await pokemonsRepository.create(charizard);

    // ACT
    await sut.execute({ pokemonIdA: pokemonA.id, pokemonIdB: pokemonB.id });
    const result = await pokemonsRepository.getOne({ id: pokemonB.id });
    
    // ASSERT
    expect(result).toBeFalsy();
  });

  it('Should throw when one of the given pokemons is not found', async () => {
    // ARRANGE
    const { pokemonsRepository, sut } = makeSut();
    const pokemonA = await pokemonsRepository.create(exodia);
    const inexistentPokemon = { id: 999, trainer: 'Jhon', level: 7, type: 'Mewtwo404' };

    // ACT
    const result = sut.execute({ pokemonIdA: pokemonA.id, pokemonIdB: inexistentPokemon.id });

    // ASSERT
    await expect(result).rejects.toThrow(
      new NotFoundError(BattlePokemonUseCase.Messages.pokemonsNotFound)
    );
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
