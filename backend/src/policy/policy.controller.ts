import { Request, Response } from 'express';
import { PolicyService } from './policy.service';
import { z } from 'zod';

export class PolicyController {
  constructor(private service: PolicyService) {}

  getPolicies = async (req: Request, res: Response) => {
    const { search, page, limit } = req.query;

    const response = await this.service.getAllPolicies(
      search as string,
      Number(page) || 1,
      Number(limit) || 10
    );

    res.json(response);
  };

  getPolicy = async (req: Request, res: Response) => {
    const { id } = req.params;

    const policy = await this.service.getPolicyById(id);

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    res.json(policy);
  };

  updatePolicyPrice = async (req: Request, res: Response) => {
    const { id } = req.params;
    const policy = req.body;

    const updatePolicyPriceSchema = z.object({
      price: z.number(),
    });
    const parsedBody = updatePolicyPriceSchema.safeParse(policy);

    if (!parsedBody.success) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const updatedPolicy = await this.service.updatePolicyPriceById(
      id,
      parsedBody.data.price
    );

    res.json(updatedPolicy);
  };
}
