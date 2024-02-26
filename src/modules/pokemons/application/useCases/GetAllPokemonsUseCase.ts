import { IUseCase } from '$shared/infra/presentation/protocols';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';
import { NotFoundError } from '$errors/NotFoundError';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class GetAllPokemonsUseCase implements IUseCase {
  constructor(
    @inject('PokemonsRepository')
    private readonly pokemonsRepository: IPokemonsRepository
  ) {}

  async execute(): Promise<GetAllPokemonsUseCase.Result> {
    const pokemons = await this.pokemonsRepository.getAll()
    if (!pokemons.length) throw new NotFoundError(GetAllPokemonsUseCase.Messages.pokemonsNotFound);
    return pokemons.map((pokemon) => new PokemonDTO(pokemon));
  }
}

export namespace GetAllPokemonsUseCase {
  export enum Messages {
    pokemonsNotFound = 'Não há pokemons a serem listados.'
  };

  export type Result = PokemonDTO[];
}
