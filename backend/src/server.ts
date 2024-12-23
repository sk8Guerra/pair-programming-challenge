import cors from 'cors';
import express, { Express } from 'express';
import { policiesRouter } from './policy/policy.router';

export async function createExpressApp(): Promise<Express> {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(policiesRouter);

  app.get('/', (req, res) => {
    res.send('Server is up and running 🚀');
  });

  return app;
}
