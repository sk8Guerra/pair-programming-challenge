import { Prisma, PrismaClient } from '@prisma/client';
import { Policy } from './policy.types';

export class PolicyRepository {
  constructor(private prisma: PrismaClient) {}

  async findCount(): Promise<number> {
    return this.prisma.policy.count();
  }

  async findAll(search: string, skip: number, take: number): Promise<Policy[]> {
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

    return this.prisma.policy.findMany({
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
        price: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async findById(id: string): Promise<Policy | null> {
    return this.prisma.policy.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        price: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            dateOfBirth: true,
          },
        },
      },
    });
  }

  async updatePrice(id: string, price: number): Promise<Policy> {
    return this.prisma.policy.update({
      where: { id },
      data: {
        price,
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        price: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            dateOfBirth: true,
          },
        },
      },
    });
  }
}
