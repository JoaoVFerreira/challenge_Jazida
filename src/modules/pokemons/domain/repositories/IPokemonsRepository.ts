import { PokemonEntity } from '$modules/pokemons/domain/entities/PokemonEntity';

export interface IPokemonsRepository {
  getOne({ id }: { id: number }): Promise<PokemonEntity>;
  update({ id, trainer, level }: { id: number, trainer?: string, level?: number }): Promise<PokemonEntity>;
  delete({ id }: { id: number }): Promise<void>;
  getAll(): Promise<PokemonEntity[]>;
  create({ trainer, type, level }: { trainer: string, type: string, level: number }): Promise<PokemonEntity>;
}