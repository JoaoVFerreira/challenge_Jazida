import { GetOnePokemonUseCase } from '$modules/pokemons/application/useCases/GetOnePokemonUseCase';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import { IController, IHttpRequest, IHttpResponse, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class GetOnePokemonController implements IController {
  constructor(
    @inject('GetOnePokemonUseCase')
    private readonly getOnePokemonUseCase: IUseCase<GetOnePokemonUseCase.Params, PokemonDTO>
  ) {}

  async handle(req: IHttpRequest<GetOnePokemonController.Params>): Promise<IHttpResponse> {
    const pokemon = await this.getOnePokemonUseCase.execute({ id: +req.params.pokemonId });

    return {
      message: GetOnePokemonController.Messages.Success,
      response: pokemon
    };
  }
}

export namespace GetOnePokemonController {
  export enum Messages {
    Success = 'Pokemon encontrado com sucesso.'
  }

  export type Params = {
    params: {
      pokemonId: number;
    };
  };
}
