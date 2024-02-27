import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { ErrorHandler } from '$errors/GlobalErrorHandler';
import pokemonsRoutes from '$shared/infra/http/routes/PokemonsRoutes';
import battleRoutes from '$shared/infra/http/routes/BattleRoutes';
import './shared/container';

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/pokemons', pokemonsRoutes);

app.use('/batalhar', battleRoutes);

app.use(ErrorHandler);

export default app;