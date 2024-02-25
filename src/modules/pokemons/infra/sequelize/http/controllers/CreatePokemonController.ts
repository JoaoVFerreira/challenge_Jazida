import { CreatePokemonUseCase } from '$modules/pokemons/application/useCases/CreatePokemonUseCase';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import { IController, IHttpRequest, IHttpResponse, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class CreatePokemonController implements IController {
  constructor(
    @inject('CreatePokemonUseCase')
    private readonly createPokemonUseCase: IUseCase<CreatePokemonUseCase.Params, PokemonDTO>
  ) {}

  async handle(req: IHttpRequest<CreatePokemonController.Params>): Promise<IHttpResponse> {
    const { treinador, tipo, nivel } = req.body;
    const pokemon = await this.createPokemonUseCase.execute({ 
      trainer: treinador,
      type: tipo,
      level: nivel ?? 1
    });

    return {
      message: CreatePokemonController.Messages.Success,
      response: pokemon
    };
  }
}

export namespace CreatePokemonController {
  export enum Messages {
    Success = 'Pokemon criado com sucesso.'
  }

  export type Params = {
    body: {
      treinador: string;
      tipo: string;
      nivel: number;
    };
  };
}
