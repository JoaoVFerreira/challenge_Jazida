import { PokemonEntity } from '$modules/pokemons/domain/entities/PokemonEntity';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository'

export class PokemonsRepositoryInMemory implements IPokemonsRepository {
  private repoData: PokemonEntity[] = [];

  public async getOne({ id }: { id: number; }): Promise<PokemonEntity> {
    const pokemon = this.repoData.find((pokemon) => pokemon.id === id);
    return Promise.resolve(pokemon);
  };

  public async update({ id, trainer, level }: { id: number; trainer?: string; level?: number; }): Promise<PokemonEntity> {
    const pokemonIndex = this.repoData.findIndex((pokemon) => pokemon.id === id);
    this.repoData[pokemonIndex] = { ...this.repoData[pokemonIndex], trainer, level }
    const pokemon = this.repoData[pokemonIndex];
    return Promise.resolve(pokemon);
  };

  public async delete({ id }: { id: number; }): Promise<void> {
    const pokemonIndex = this.repoData.findIndex((pokemon) => pokemon.id === id);
    this.repoData.splice(pokemonIndex, 1);
    return Promise.resolve();
  };

  public async getAll(): Promise<PokemonEntity[]> {
    return Promise.resolve(this.repoData);
  };

  public async create({ trainer, type, level }: { trainer: string; type: string; level: number; }): Promise<PokemonEntity> {
    this.repoData.push({
      id: this.repoData.length + 1,
      trainer,
      type,
      level
    })
    const pokemon = this.repoData.at(this.repoData.length - 1);
    return Promise.resolve(pokemon);
  };
}