import { APIResponse, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

export async function authenticateViaAPI({ email, password }: { email: string; password: string }) {
  const context = await request.newContext();
  
  await  context.post(
    `https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php`,
    {
      form: {
        email: email,
        password: password,
        submitLogin: '1',
      },
      failOnStatusCode: true,
    }
  );

  return context.storageState();
}
