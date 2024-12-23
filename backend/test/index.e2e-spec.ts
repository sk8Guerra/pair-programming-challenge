import request from 'supertest';
import * as http from 'http';
import { createExpressApp } from '../src/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const customers: Prisma.CustomerCreateInput[] = [
  {
    firstName: 'Cyrillus',
    lastName: 'Biddlecombe',
    dateOfBirth: '1978-12-03T06:33:17Z',
    policies: {
      create: {
        provider: 'BARMER',
        insuranceType: 'HEALTH',
        status: 'ACTIVE',
        startDate: '2017-04-26T05:32:06Z',
        price: 99,
      },
    },
  },
  {
    firstName: 'Brandy',
    lastName: 'Harbour',
    dateOfBirth: '1985-02-28T12:51:27Z',
    policies: {
      create: {
        provider: 'TK',
        insuranceType: 'HEALTH',
        status: 'ACTIVE',
        startDate: '2013-01-13T04:52:15Z',
        price: 59,
      },
    },
  },
];

describe('app (e2e)', () => {
  let server: http.Server;

  beforeAll(async () => {
    const app = await createExpressApp();
    server = app.listen(34_000);
  });

  afterAll(async () => {
    await server.close();
  });

  it('/ (GET) ', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  it('/policies (GET) should return status code 200 and 0 policies', async () => {
    const response = await request(server).get('/policies');
    expect(response.status).toBe(200);

    const {
      body: { items },
    } = response;
    expect(items.length).toBe(0);
  });

  it('/policies (GET) should return status code 200 and 2 policies', async () => {
    const customers: Prisma.CustomerCreateInput[] = [
      {
        firstName: 'Cyrillus',
        lastName: 'Biddlecombe',
        dateOfBirth: '1978-12-03T06:33:17Z',
        policies: {
          create: {
            provider: 'BARMER',
            insuranceType: 'HEALTH',
            status: 'PENDING',
            startDate: '2017-04-26T05:32:06Z',
          },
        },
      },
      {
        firstName: 'Brandy',
        lastName: 'Harbour',
        dateOfBirth: '1985-02-28T12:51:27Z',
        policies: {
          create: {
            provider: 'BARMER',
            insuranceType: 'LIABILITY',
            status: 'PENDING',
            startDate: '2015-01-13T04:52:15Z',
          },
        },
      },
    ];
    const promises = customers.map((customer) =>
      prisma.customer.create({ data: customer })
    );
    await Promise.all(promises);

    const response = await request(server).get('/policies');
    expect(response.status).toBe(200);

    const {
      body: { items },
    } = response;
    expect(items.length).toBe(2);
  });

  it('/policies (GET) should return status code 200 and 1 policy (search)', async () => {
    const promises = customers.map((customer) =>
      prisma.customer.create({ data: customer })
    );
    await Promise.all(promises);

    const response = await request(server).get(
      '/policies?search=barmer&status=active'
    );
    expect(response.status).toBe(200);

    const {
      body: { items },
    } = response;
    expect(items.length).toBe(1);
  });

  it('/policies (GET) should return status code 200 and 1 policies (pagination)', async () => {
    const promises = customers.map((customer) =>
      prisma.customer.create({ data: customer })
    );
    await Promise.all(promises);

    const response = await request(server).get('/policies?page=1&limit=1');

    expect(response.status).toBe(200);

    const {
      body: { items },
    } = response;
    expect(items.length).toBe(1);
  });

  it('/policies/:id (GET) should return status code 200', async () => {
    const promises = customers.map((customer) =>
      prisma.customer.create({ data: customer })
    );
    const [user] = await Promise.all(promises);
    const policy = await prisma.policy.findFirst({
      where: { customer: { id: user.id } },
    });
    const response = await request(server).get(`/policies/${policy?.id}`);

    expect(response.body.id).toBe(policy?.id);
    expect(response.status).toBe(200);
  });

  it('/policies/:id (GET) should return status code 404', async () => {
    const response = await request(server).get(
      '/policies/92a6d727-4633-4382-8e6c-d336f84c7f6f'
    );
    expect(response.status).toBe(404);
  });

  it('/policies/:id (PUT) should return status code 200', async () => {
    const promises = customers.map((customer) =>
      prisma.customer.create({ data: customer })
    );
    const [user] = await Promise.all(promises);

    const policy = await prisma.policy.findFirst({
      where: {
        customer: { id: user.id },
      },
    });

    const response = await request(server).put(`/policies/${policy?.id}`).send({
      price: 37,
    });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(37);
  });
});
