import { expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';
import { describe } from 'node:test';

//TODO after lesson check if done correct (using of .env values) !!!!
interface User {
  validEmail: string;
  validPassword: string;
  validUsername: string;
}

const user: User = {
  validEmail: requireEnv('EMAIL'),
  validPassword: requireEnv('PASSWORD'),
  validUsername: requireEnv('TEST_USERNAME'),
};

describe('Login', () => {
  test(
    '[E2E-001] Should login with valid credentials',
    { tag: ['@smoke', '@regression', '@auth'] },
    async ({ loginPage, page }) => {
      await loginPage.navigateTo();
      await loginPage.performSignIn({ email: user.validEmail, password: user.validPassword });
      await page.waitForLoadState('networkidle');
      await expect(loginPage.header.locators.userButtonText).toHaveText(user.validUsername);
    }
  );

  //TODO make parameterized (
  // invalid email + valid password,
  // valid email + invalid password,
  // invalid email + invalid password,
  // empty email + empty password)
  test(
    '[E2E-002] Should NOT login with invalid credentials',
    { tag: ['@regression', '@auth'] },
    async ({ page }) => {}
  );

  test.use({
    userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') },
  });

  test(
    '[E2E-003] Should login with fixture',
    { tag: ['@regression', '@auth'] },
    async ({ loginPage }) => {
      await expect(loginPage.header.locators.userButtonText).toHaveText(requireEnv('EMAIL'));
    }
  );
});
