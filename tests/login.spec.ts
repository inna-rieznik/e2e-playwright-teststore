import { expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';
import { Tags } from '../enums/tags';


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

test.describe('Login', () => {

  const invalidCredentials = [
    { id: 1, scenario: 'invalid email + valid password', email: 'invalid@email.com', password: user.validPassword, expectError: true },
    { id: 2, scenario: 'valid email + invalid password', email: user.validEmail, password: 'WrongPassword123!', expectError: true },
    { id: 3, scenario: 'invalid email + invalid password', email: 'invalid@email.com', password: 'WrongPassword123!', expectError: true },
    { id: 4, scenario: 'empty email + empty password', email: '', password: '', expectError: false },
  ];

  for (const { id, scenario, email, password, expectError } of invalidCredentials) {
    test(
      `[E2E-LGN-${id}] NOT login with ${scenario}`,
      { tag: [Tags.Regression, Tags.Auth] },
      async ({ loginPage }) => {
        await loginPage.navigateTo();
        await loginPage.performSignIn({ email, password });
        await loginPage.waitForNetworkIdle();

        if (expectError) {
          await expect(loginPage.getAuthErrorMessage()).toBeVisible();
        } else {
          await expect(loginPage.getAuthErrorMessage()).not.toBeVisible();
        }
      }
    );
  }

  test(
    '[E2E-LGN-005}] login with valid credentials',
    { tag: [Tags.Smoke, Tags.Regression, Tags.Auth] },
    async ({ loginPage }) => {
      await loginPage.navigateTo();
      await loginPage.performSignIn({ email: user.validEmail, password: user.validPassword });
      await loginPage.waitForNetworkIdle();
      await expect(loginPage.header.locators.userButtonText).toHaveText(user.validUsername);
    }
  );
});
