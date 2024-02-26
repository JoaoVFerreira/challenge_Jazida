import { Router } from 'express';
import { adaptRoute } from '$shared/adapter/expressRouterAdapter';
import { CreatePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/CreatePokemonController';

const router = Router();

router.post('/', adaptRoute(CreatePokemonController));


export default router;