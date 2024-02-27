import { IUseCase } from '$shared/infra/presentation/protocols';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';
import { NotFoundError } from '$errors/NotFoundError';
import { PokemonEntity } from '$modules/pokemons/domain/entities/PokemonEntity'; 
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class BattlePokemonUseCase implements IUseCase {
  constructor(
    @inject('PokemonsRepository')
    private readonly pokemonsRepository: IPokemonsRepository
  ) {}

  async execute({ pokemonIdA, pokemonIdB }: BattlePokemonUseCase.Params): Promise<BattlePokemonUseCase.Result> {
    const { pokemonA, pokemonB } = await this.verifyPokemons(pokemonIdA, pokemonIdB);
    const { winner, loser } = this.battle(pokemonA, pokemonB);
    const pokemonWinner = await this.incrementWinner(winner);
    const pokemonLoser = await this.decrementLoser(loser);
    return {
      vencedor: new PokemonDTO(pokemonWinner),
      perdedor: new PokemonDTO(pokemonLoser)
    };
  }

  private async verifyPokemons(pokemonIdA: number, pokemonIdB: number): Promise<{
    pokemonA: PokemonEntity;
    pokemonB: PokemonEntity;
  }> {
    const pokemonA = await this.getPokemon(pokemonIdA);
    const pokemonB = await this.getPokemon(pokemonIdB)
    return { pokemonA, pokemonB };
  }

  private async getPokemon(pokemonId: number): Promise<PokemonEntity> {
    const pokemon = await this.pokemonsRepository.getOne({ id: pokemonId });
    if (!pokemon) throw new NotFoundError(BattlePokemonUseCase.Messages.pokemonsNotFound);
    return pokemon
  }

  private battle(pokemonA: PokemonEntity, pokemonB: PokemonEntity): { winner: PokemonEntity, loser: PokemonEntity } {
    const oddsA = pokemonA.level / (pokemonA.level + pokemonB.level);
    const oddsB = pokemonB.level / (pokemonA.level + pokemonB.level);
    const outcome = Math.random();

    let winner: PokemonEntity;
    let loser: PokemonEntity;
    
    if (oddsA === oddsB) {
      const pokemons = [pokemonA, pokemonB];
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      winner = pokemons[randomIndex];
      loser = pokemons.find(pokemon => pokemon.id !== winner.id);
    } else if (outcome < oddsA) {
        winner = pokemonA;
        loser = pokemonB;
      } else {
        winner = pokemonB;
        loser = pokemonA;
      }

    return { winner, loser };
  }

  private async incrementWinner(winner: PokemonEntity): Promise<PokemonEntity> {
    await this.pokemonsRepository.update({ id: winner.id, level: winner.level + 1 });
    const pokemon = await this.pokemonsRepository.getOne({ id: winner.id });
    return pokemon
  }

  private async decrementLoser(loser: PokemonEntity): Promise<PokemonEntity> {
    if (this.shouldDelete(loser.level)) {
      await this.pokemonsRepository.delete({ id: loser.id });
      return { ...loser, level: loser.level - 1 };
    } else {
      await this.pokemonsRepository.update({ id: loser.id, level: loser.level - 1 });
      const pokemon = await this.pokemonsRepository.getOne({ id: loser.id });
      return pokemon;
    }
  }

  private shouldDelete(level: number): boolean {
    return (level - 1) === 0;
  }
}

export namespace BattlePokemonUseCase {
  export enum Messages {
    pokemonsNotFound = 'Não é possivel batalhar, pois um ou mais Pokemons não foram encontrados.',
  };

  export type IncrementOrDecrementParams = {
    winner: PokemonEntity;
    pokemonA: PokemonEntity;
    pokemonB: PokemonEntity;
  }

  export type Params = {
    pokemonIdA: number;
    pokemonIdB: number;
  };

  export type Result = {
    vencedor: PokemonDTO;
    perdedor: PokemonDTO
  };
}


