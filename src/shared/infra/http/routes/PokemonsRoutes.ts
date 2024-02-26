import { Router } from 'express';
import { adaptRoute } from '$shared/adapter/expressRouterAdapter';
import { createPokemonValidator, pokemonIdValidator } from '$shared/infra/http/validators/PokemonsValidator'
import { CreatePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/CreatePokemonController';
import { GetOnePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/GetOnePokemonController';
import { DeletePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/DeletePokemonController';
import { GetAllPokemonsController } from '$modules/pokemons/infra/sequelize/http/controllers/GetAllPokemonsController';

const router = Router();

router.get('/:pokemonId', pokemonIdValidator, adaptRoute(GetOnePokemonController));
router.delete('/:pokemonId', pokemonIdValidator, adaptRoute(DeletePokemonController));
router.post('/', createPokemonValidator, adaptRoute(CreatePokemonController));
router.get('/', adaptRoute(GetAllPokemonsController));

export default router;