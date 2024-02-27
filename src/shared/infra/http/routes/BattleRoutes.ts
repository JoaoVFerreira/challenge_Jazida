import { Router } from 'express';
import { adaptRoute } from '$shared/adapter/expressRouterAdapter';
import { pokemonsIdValidator } from '$shared/infra/http/validators/BattleValidator';
import { BattlePokemonController } from '$modules/pokemons/infra/sequelize/http/controllers/BattlePokemonController'

const router = Router();

router.post('/:pokemonAId/:pokemonBId', pokemonsIdValidator, adaptRoute(BattlePokemonController));


export default router;