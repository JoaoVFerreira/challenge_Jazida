import { Router } from 'express';
import { adaptRoute } from '$shared/adapter/expressRouterAdapter';
import { createPokemonValidator } from '$shared/infra/http/validators/PokemonsValidator'
import { CreatePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/CreatePokemonController';

const router = Router();

router.post('/', createPokemonValidator, adaptRoute(CreatePokemonController));


export default router;