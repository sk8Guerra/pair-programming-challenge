import { exec as exec0 } from 'child_process';
import { promisify } from 'util';

const exec = promisify(exec0);

export default async function globalSetup(): Promise<void> {
  await exec('npx prisma migrate reset --force --skip-generate --skip-seed');
}
