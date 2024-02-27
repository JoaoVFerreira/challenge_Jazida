import model from '$models';
import { PokemonModel } from '$models/PokemonModel';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository'
import { PokemonEntity } from '$modules/pokemons/domain/entities/PokemonEntity';

export class PokemonsRepository implements IPokemonsRepository {
  constructor(
    private readonly Model: typeof PokemonModel = model.pokemons,
  ) {}

  public async create({ trainer, type, level }: { trainer: string; type: string; level: number; }): Promise<PokemonEntity> {
    const pokemonToCreate = {
      treinador: trainer,
      tipo: type,
      nivel: level
    };
    const pokemon = await this.Model.create(pokemonToCreate);
    return new PokemonEntity(pokemon);
  }

  public async getOne({ id }: { id: number; }): Promise<PokemonEntity> {
    const pokemon = await this.Model.findOne({ where: { id } });
    return pokemon ? new PokemonEntity(pokemon) : null;
  };

  public async update({ id, trainer, level }: { id: number; trainer?: string; level?: number }): Promise<PokemonEntity> {
    const pokemon = await this.Model.findOne({ where: { id } });
    const pokemonUpdated = await pokemon.update({ id, treinador: trainer, nivel: level });
    return new PokemonEntity(pokemonUpdated.dataValues);
  };

  public async delete({ id }: { id: number; }): Promise<void> {
    await this.Model.destroy({ where: { id } });
  };

  public async getAll(): Promise<PokemonEntity[]> {
    const pokemons = await this.Model.findAll();
    return pokemons.map((pokemon) => new PokemonEntity(pokemon));
  };
}
