import { test, expect } from '@playwright/test';
import LoginPage from '../app/pages/LoginPage/LoginPage';

//TODO move login data co .env file
//email: user.ir@gmail.com
//password: 12345Qwerty!

test(
  '[E2E-001] Should login with valid credentials',
  { tag: ['@smoke', '@regression', '@auth'] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.performSignIn({ email: 'user.ir@gmail.com', password: '12345Qwerty!' });
    await page.waitForLoadState('networkidle');
    await expect(loginPage.header.locators.userButtonText).toHaveText('Test User');
  }
);

test(
  '[E2E-001] Should NOT login with invalid credentials',
  { tag: ['@smoke', '@regression', '@auth'] },
  async ({ page }) => {}
);

test(
  '[E2E-001] Should NOT login with empty credentials',
  { tag: ['@smoke', '@regression', '@auth'] },
  async ({ page }) => {}
);
