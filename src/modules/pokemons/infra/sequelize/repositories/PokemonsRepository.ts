import model from '$models';
import { PokemonModel } from '$models/PokemonModel';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository'
import { PokemonEntity } from '../../../domain/entities/PokemonEntity';

export class PokemonsRepository implements IPokemonsRepository {
  constructor(
    private readonly Model: typeof PokemonModel = model.pokemons,
  ) {}

  public async getOne({ id }: { id: number; }): Promise<PokemonEntity> {
    const pokemon = await this.Model.findOne({ where: { id } });
    return pokemon ? new PokemonEntity(pokemon) : null;
  };

  public async update({ id, trainer }: { id: number; trainer: string; }): Promise<PokemonEntity> {
    const pokemon = await this.Model.findOne({ where: { id } });
    const pokemonUpdated = await pokemon.update({ id, trainer });
    return new PokemonEntity(pokemonUpdated.dataValues);
  };

  public async delete({ id }: { id: number; }): Promise<void> {
    const pokemon = await this.Model.findOne({ where: { id } });
    await pokemon.destroy();
  };

  public async getAll(): Promise<PokemonEntity[]> {
    const pokemons = await this.Model.findAll();
    return pokemons.map((pokemon) => new PokemonEntity(pokemon));
  };
}
