import { DeletePokemonUseCase } from '$modules/pokemons/application/useCases/DeletePokemonUseCase';
import { IController, IHttpRequest, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class DeletePokemonController implements IController {
  constructor(
    @inject('DeletePokemonUseCase')
    private readonly deletePokemonUseCase: IUseCase<DeletePokemonUseCase.Params, void>
  ) {}

  async handle(req: IHttpRequest<DeletePokemonController.Params>): Promise<void> {
    await this.deletePokemonUseCase.execute({ id: +req.params.pokemonId });
  }
}

export namespace DeletePokemonController {
  export type Params = {
    params: {
      pokemonId: number;
    };
  };
}
