import { Router } from 'express';
import { adaptRoute } from '$shared/adapter/expressRouterAdapter';
import { createPokemonValidator, pokemonIdValidator } from '$shared/infra/http/validators/PokemonsValidator'
import { CreatePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/CreatePokemonController';
import { GetOnePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/GetOnePokemonController';

const router = Router();

router.get('/:pokemonId', pokemonIdValidator, adaptRoute(GetOnePokemonController));
router.post('/', createPokemonValidator, adaptRoute(CreatePokemonController));


export default router;