import { container } from 'tsyringe';
import { PokemonsRepository } from '$modules/pokemons/infra/sequelize/repositories/PokemonsRepository';
import { IPokemonsRepository } from '$modules/pokemons/domain/repositories/IPokemonsRepository';

container.registerSingleton<IPokemonsRepository>('PokemonsRepository', PokemonsRepository);