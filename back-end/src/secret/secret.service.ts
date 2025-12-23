import { Injectable } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretManagerService {
  private client: SecretsManagerClient;
  constructor() {
    this.client = new SecretsManagerClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }
  async load<T>(secretName: string): Promise<T> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);

      if (!response.SecretString) {
        throw new Error(`No secret found for ${secretName}`);
      }

      // Fallback to string
      try {
        return JSON.parse(response.SecretString) as T;
      } catch {
        return response.SecretString as T;
      }
    } catch (error) {
      throw new Error(`Failed to load secret ${secretName}: ${error}`);
    }
  }
}
