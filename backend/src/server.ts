import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

export const prisma = new PrismaClient();

export async function getPolicies(req: Request, res: Response) {
  const { search } = req.query;

  const or: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { provider: { contains: search as string, mode: 'insensitive' } },
        {
          customer: {
            firstName: { contains: search as string, mode: 'insensitive' },
          },
        },
        {
          customer: {
            lastName: { contains: search as string, mode: 'insensitive' },
          },
        },
      ],
    }
    : {};

  const policies = await prisma.policy.findMany({
    where: {
      ...or,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });

  res.json(policies);
}

export async function createExpressApp(): Promise<Express> {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/policies', getPolicies);

  app.get('/', (req, res) => {
    res.send('Server is up and running 🚀');
  });

  return app;
}
