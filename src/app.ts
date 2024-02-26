import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { ErrorHandler } from '$errors/GlobalErrorHandler';
import pokemonsRoutes from '$shared/infra/http/routes/PokemonsRoutes';
import './shared/container';

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/pokemons', pokemonsRoutes);

app.use(ErrorHandler);

export default app;