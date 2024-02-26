import { GetAllPokemonsUseCase } from '$modules/pokemons/application/useCases/GetAllPokemonsUseCase';
import { PokemonDTO } from '$modules/pokemons/application/dto/PokemonDTO';
import { IController, IHttpRequest, IHttpResponse, IUseCase } from '$shared/infra/presentation/protocols';
import * as tsyringe from 'tsyringe';

const { inject, injectable } = tsyringe;

@injectable()
export class GetAllPokemonsController implements IController {
  constructor(
    @inject('GetAllPokemonsUseCase')
    private readonly getAllPokemonsUseCase: IUseCase<GetAllPokemonsUseCase, PokemonDTO[]>
  ) {}

  async handle(_req: IHttpRequest<any>): Promise<IHttpResponse> {
    const pokemons = await this.getAllPokemonsUseCase.execute();

    return {
      message: GetAllPokemonsController.Messages.Success,
      response: pokemons
    };
  }
}

export namespace GetAllPokemonsController {
  export enum Messages {
    Success = 'Pokemons listados com sucesso.'
  }
}
