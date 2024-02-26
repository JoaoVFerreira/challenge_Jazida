import { IUseCase } from '$shared/infra/presentation/protocols';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';
import { NotFoundError } from '$errors/NotFoundError';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class GetOnePokemonUseCase implements IUseCase {
  constructor(
    @inject('PokemonsRepository')
    private readonly pokemonsRepository: IPokemonsRepository
  ) {}

  async execute({ id }: GetOnePokemonUseCase.Params): Promise<GetOnePokemonUseCase.Result> {
    const pokemon = await this.pokemonsRepository.getOne({ id });
    if (!pokemon) throw new NotFoundError(GetOnePokemonUseCase.Messages.pokemonNotFound);
    return new PokemonDTO(pokemon);
  }
}

export namespace GetOnePokemonUseCase {
  export enum Messages {
    pokemonNotFound = 'Pokemon não encontrado.'
  };

  export type Params = {
    id: number;
  };

  export type Result = PokemonDTO;
}
