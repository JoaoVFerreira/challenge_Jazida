import { container } from 'tsyringe';
import { IUseCase } from '$shared/infra/presentation/protocols';
import { PokemonsRepository } from '$modules/pokemons/infra/sequelize/repositories/PokemonsRepository';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';
import { CreatePokemonUseCase } from '$modules/pokemons/application/useCases/CreatePokemonUseCase';
import { GetOnePokemonUseCase } from '$modules/pokemons/application/useCases/GetOnePokemonUseCase';
import { DeletePokemonUseCase } from '$modules/pokemons/application/useCases/DeletePokemonUseCase';

container.registerSingleton<IPokemonsRepository>('PokemonsRepository', PokemonsRepository);
container.registerSingleton<IUseCase>('CreatePokemonUseCase', CreatePokemonUseCase);
container.registerSingleton<IUseCase>('GetOnePokemonUseCase', GetOnePokemonUseCase);
container.registerSingleton<IUseCase>('DeletePokemonUseCase', DeletePokemonUseCase);
