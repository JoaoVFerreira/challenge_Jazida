import { BattlePokemonUseCase } from '$modules/pokemons/application/useCases/BattlePokemonUseCase';
import { IController, IHttpRequest, IHttpResponse, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class BattlePokemonController implements IController {
  constructor(
    @inject('BattlePokemonUseCase')
    private readonly battlePokemonUseCase: IUseCase<BattlePokemonUseCase.Params, BattlePokemonUseCase.Result>
  ) {}

  async handle(req: IHttpRequest<BattlePokemonController.Params>): Promise<IHttpResponse> {
    const pokemonIdA = Number(req.params.pokemonAId);
    const pokemonIdB = Number(req.params.pokemonBId);
    const pokemon = await this.battlePokemonUseCase.execute({ pokemonIdA, pokemonIdB });

    return {
      message: BattlePokemonController.Messages.Success,
      response: pokemon
    };
  }
}

export namespace BattlePokemonController {
  export enum Messages {
    Success = 'Batalha realiza com sucesso.'
  }

  export type Params = {
    params: {
      pokemonAId: number;
      pokemonBId: number;
    };
  };
}
