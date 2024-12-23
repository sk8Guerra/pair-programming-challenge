import { Policy } from './policy.types';
import { PolicyRepository } from './policy.repository';
import { Prisma } from '@prisma/client';

export class PolicyService {
  constructor(private repository: PolicyRepository) {}

  async getAllPolicies(
    search: string,
    page: number,
    limit: number
  ): Promise<any> {
    const skip = (page - 1) * limit;
    const total = await this.repository.findCount();

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const policies = await this.repository.findAll(search, skip, limit);

    return {
      items: policies,
      pageInfo: {
        page,
        limit,
        totalItems: total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  async getPolicyById(id: string): Promise<Policy | null> {
    return this.repository.findById(id);
  }

  async updatePolicyPriceById(id: string, price: number): Promise<Policy> {
    return this.repository.updatePrice(id, price);
  }
}
