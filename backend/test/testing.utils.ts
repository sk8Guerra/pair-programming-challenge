import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cleanDatabase = async (): Promise<void> => {
  if (!!process.env['NODE_ENV'] && process.env['NODE_ENV'] !== 'test') {
    throw new Error('clean database should be run only against test environment');
  }
  await prisma.policy.deleteMany();
  await prisma.customer.deleteMany();
}
