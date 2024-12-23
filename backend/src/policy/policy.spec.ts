import { PolicyRepository } from './policy.repository';
import { prismaMock } from '../../mocks/prisma';
import prismaClient from '../../prisma/client';

describe('Policy Repository', () => {
  it('It should return correct count', async () => {
    prismaMock.policy.count.mockResolvedValue(5);

    const policyRepository = new PolicyRepository(prismaClient);
    const count = await policyRepository.findCount();

    expect(count).toBe(5);
  });
});
