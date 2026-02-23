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
      `[E2E-LGN-00${id}] NOT login with ${scenario}`,
      { tag: [Tags.Regression, Tags.Auth] },
      async ({ loginPage }) => {

        await test.step(`Login with invalid credentials: ${scenario}`, async () => {
          await loginPage.navigateTo();
          await loginPage.performSignIn({ email, password });
          await loginPage.waitForNetworkIdle();
        });

        await test.step(`Check if error message is visible: ${scenario}`, async () => {
          if (expectError) {
            await expect(loginPage.getAuthErrorMessage()).toBeVisible();
          } else {
            await expect(loginPage.getAuthErrorMessage()).not.toBeVisible();
          }
        });
      }
    );
  }

  test(
    '[E2E-LGN-005] login with valid credentials',
    { tag: [Tags.Smoke, Tags.Regression, Tags.Auth] },
    async ({ loginPage }) => {
      await test.step(`Login with valid credentials`, async () => {
        await loginPage.navigateTo();
        await loginPage.performSignIn({ email: user.validEmail, password: user.validPassword });
        await loginPage.waitForNetworkIdle();
      });

      await test.step(`Check if user button text is visible and contains username`, async () => {
        const userButtonText = loginPage.header.locators.userButtonText;
        await expect(userButtonText).toHaveText(user.validUsername);
      });
    }
  );
});
