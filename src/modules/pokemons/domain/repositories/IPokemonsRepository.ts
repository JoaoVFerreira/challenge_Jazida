import { PokemonEntity } from '$modules/pokemons/domain/entities/PokemonEntity';

export interface IPokemonsRepository {
  getOne({ id }: { id: number }): Promise<PokemonEntity>;
  update({ id, trainer }: { id: number, trainer: string }): Promise<PokemonEntity>;
  delete({ id }: { id: number }): Promise<void>
  getAll(): Promise<PokemonEntity[]>
}