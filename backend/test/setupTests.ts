import { cleanDatabase } from './testing.utils';

afterAll(async () => {
  jest.clearAllMocks();
});

beforeEach(async () => {
  await cleanDatabase();
});


jest.setTimeout(100000);
