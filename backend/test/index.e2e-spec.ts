import request from "supertest";
import * as http from "http";
import { createExpressApp, prisma } from "../src/server";
import { Prisma } from "@prisma/client";

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

    const { body: policies } = response;
    expect(policies.length).toBe(0);
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
    const promises = customers.map((customer) => prisma.customer.create({ data: customer }));
    await Promise.all(promises);

    const response = await request(server).get('/policies');
    expect(response.status).toBe(200);

    const { body: policies } = response;
    expect(policies.length).toBe(2);
  });

  it('/policies (GET) should return status code 200 and 1 policy', async () => {
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
          },
        },
      },
    ];

    const promises  = customers.map((customer) => prisma.customer.create({ data: customer }));
    await Promise.all(promises);

    const response = await request(server).get('/policies?search=barmer&status=active');
    expect(response.status).toBe(200);

    const { body: policies } = response;
    expect(policies.length).toBe(1);
  });
});
