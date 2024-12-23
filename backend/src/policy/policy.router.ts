import express from 'express';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { PolicyRepository } from './policy.repository';
import prismaClient from '../../prisma/client';

export const policiesRouter = express.Router();

const policy = new PolicyController(
  new PolicyService(new PolicyRepository(prismaClient))
);

policiesRouter.get('/policies', policy.getPolicies);
policiesRouter.get('/policies/:id', policy.getPolicy);
policiesRouter.put('/policies/:id', policy.updatePolicyPrice);
