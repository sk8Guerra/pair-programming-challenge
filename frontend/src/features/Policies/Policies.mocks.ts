import { rest } from 'msw';

export const validCustomer = {
  firstName: 'Cyrillus',
  lastName: 'Biddlecombe',
};

export const pageInfoMockResponse = {
  page: 1,
  limit: 10,
  totalItems: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

export const policyMockResponse = [
  {
    id: 'cd5613c6-ab2d-4985-a129-5efe711c368f',
    provider: 'BARMER',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2017-04-26T05:32:06.000Z',
    endDate: null,
    customer: {
      id: '980e1c21-ae5a-404a-a200-5a8a030a8721',
      dateOfBirth: '1978-12-03T06:33:17.000Z',
      ...validCustomer,
    },
  },
];

export const policyDetailResponse = {
  id: 'deba94d2-6e31-4945-a0c8-85aad35cf839',
  provider: 'BARMER',
  insuranceType: 'HEALTH',
  status: 'ACTIVE',
  startDate: '2017-04-26T05:32:06.000Z',
  endDate: null,
  customer: {
    id: '7bd392de-1fed-49d4-989e-91c56b17afd4',
    firstName: 'Cyrillus',
    lastName: 'Biddlecombe',
    email: null,
    dateOfBirth: '1978-12-03T06:33:17.000Z',
  },
};

export const policyMockHandler = rest.get(
  'http://localhost:4000/policies',
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: policyMockResponse,
        pageInfo: pageInfoMockResponse,
      })
    );
  }
);

export const policyDetailMockHandler = rest.get(
  'http://localhost:4000/policies/:id',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(policyDetailResponse));
  }
);
