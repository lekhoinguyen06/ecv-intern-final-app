import { readFileSync } from 'fs';
import { join } from 'path';

export default function getApiVersion(): string {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
  ) as { version: string };
  const apiVersion: string = process.env.API_VERSION ?? packageJson.version;
  return apiVersion;
}
