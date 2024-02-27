import { IUseCase } from '$shared/infra/presentation/protocols';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';
import { NotFoundError } from '$errors/NotFoundError';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class UpdatePokemonUseCase implements IUseCase {
  constructor(
    @inject('PokemonsRepository')
    private readonly pokemonsRepository: IPokemonsRepository
  ) {}

  async execute({ id, trainer }: UpdatePokemonUseCase.Params): Promise<void> {
    const pokemon = await this.pokemonsRepository.getOne({ id });
    if (!pokemon) throw new NotFoundError(UpdatePokemonUseCase.Messages.pokemonNotFound);
    await this.pokemonsRepository.update({ id, trainer });
  }
}

export namespace UpdatePokemonUseCase {
  export enum Messages {
    pokemonNotFound = 'Pokemon não encontrado.'
  };

  export type Params = {
    id: number;
    trainer: string;
  };
}
