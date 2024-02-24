import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
// import './shared/container';

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

export default app;