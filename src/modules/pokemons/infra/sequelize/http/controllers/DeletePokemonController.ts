import { DeletePokemonUseCase } from '$modules/pokemons/application/useCases/DeletePokemonUseCase';
import { IController, IHttpRequest, IHttpResponse, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class DeletePokemonController implements IController {
  constructor(
    @inject('DeletePokemonUseCase')
    private readonly deletePokemonUseCase: IUseCase<DeletePokemonUseCase.Params, void>
  ) {}

  async handle(req: IHttpRequest<DeletePokemonController.Params>): Promise<IHttpResponse> {
    await this.deletePokemonUseCase.execute({ id: +req.params.pokemonId });

    return {
      message: DeletePokemonController.Messages.Success
    };
  }
}

export namespace DeletePokemonController {
  export enum Messages {
    Success = 'Pokemon deletado com sucesso.'
  }

  export type Params = {
    params: {
      pokemonId: number;
    };
  };
}
