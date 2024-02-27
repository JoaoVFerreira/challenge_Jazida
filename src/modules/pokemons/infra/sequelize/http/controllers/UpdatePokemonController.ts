import { UpdatePokemonUseCase } from '$modules/pokemons/application/useCases/UpdatePokemonUseCase';
import { IController, IHttpRequest, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class UpdatePokemonController implements IController {
  constructor(
    @inject('UpdatePokemonUseCase')
    private readonly updatePokemonUseCase: IUseCase<UpdatePokemonUseCase.Params, void>
  ) {}

  async handle(req: IHttpRequest<UpdatePokemonController.Params>): Promise<void> {
    await this.updatePokemonUseCase.execute({ id: +req.params.pokemonId, trainer: req.body.treinador });
  }
}

export namespace UpdatePokemonController {
  export type Params = {
    params: {
      pokemonId: number;
    };
    body: {
      treinador: string;
    }
  };
}
