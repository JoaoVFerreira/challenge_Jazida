import { IUseCase } from '$shared/infra/presentation/protocols';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class CreatePokemonUseCase implements IUseCase {
  constructor(
    @inject('PokemonsRepository')
    private readonly pokemonsRepository: IPokemonsRepository
  ) {}

  async execute({
    type, trainer, level
  }: CreatePokemonUseCase.Params): Promise<CreatePokemonUseCase.Result> {
    const pokemon = await this.pokemonsRepository.create({ type, trainer, level });
    return new PokemonDTO(pokemon);
  }
}

export namespace CreatePokemonUseCase {
  export type Params = {
    type: string;
    trainer: string;
    level?: number;
  };
  export type Result = PokemonDTO;
}
