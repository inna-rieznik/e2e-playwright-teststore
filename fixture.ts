import { test as base, Locator } from '@playwright/test';
import fs from 'fs';
import LoginPage from './app/pages/LoginPage/LoginPage';
import HomePage from './app/pages/HomePage/HomePage';
import ProductPage from './app/pages/ProductPage/ProductPage';
import ShoppingCartPage from './app/pages/ShoppingCartPage/ShoppingCartPage';
import CheckoutPage from './app/pages/CheckoutPage/CheckoutPage';

type MyFixture = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutPage: CheckoutPage;
  userToLogin: {email: string; password: string;};
};

export const test = base.extend<MyFixture>({
  //pages
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  //auth

  userToLogin: undefined,

  storageState: async ({ browser, userToLogin }, use) => {
    if (userToLogin) {
      const filename = `.auth/${userToLogin}.json` as string;

      if (!fs.existsSync(filename)) {
        const page = await browser.newPage({ storageState: undefined });
        await page.goto('?controller=authentication');
        const emailInput: Locator = page.getByRole('textbox', { name: 'Email' });
        const passwordInput = page.getByRole('textbox', { name: 'Password input' });
        const signInButton = page.getByRole('button', { name: 'Sign in' });

        await emailInput.fill(userToLogin.email);
        await passwordInput.fill(userToLogin.password);
        await signInButton.click();

        await page.waitForLoadState('networkidle');
        await page.context().storageState({ path: filename });
        await page.close();
      }
      await use(filename);
    }
  },

  //TODO re-wright with API??
  // loginBeforeTest: [
  //   async ({ loginPage, page}, use) => {
  //     await loginPage.goto();
  //     await loginPage.performSignIn({ email: user.validEmail, password: user.validPassword });
  //     await page.waitForLoadState('networkidle');
  //     await use();
  //   },
  //   { title: 'Logs in user before test execution.' },
  // ],

  // logOutAfterTest: [ // runs after test, clears cookie with name = 'PrestaShop-bd73d297b14c5070734013be8110710b'
  //   async ({ homePage, context, page }, use) => {
  //     await use();

  //       const allCookiesWithAuth = await context.cookies();
  //       const cookiesWithoutAuth = allCookiesWithAuth.filter((cookie) =>
  //           cookie.name !== 'PrestaShop-bd73d297b14c5070734013be8110710b'
  //       );

  //       await context.clearCookies();
  //       await context.addCookies(cookiesWithoutAuth);

  //       await homePage.goto();
  //       await page.waitForLoadState('networkidle');

  //       expect(homePage.header.getSignInButton()).toBeVisible();
  //       expect(homePage.header.getCurrentUserButton()).toBeHidden();
  //   },
  //   { title: 'Logs out user after test is executed.' },
  // ],

  //can return only token:
  // token: async ({ page }, use) => {
  //   const info = { //data that i can get from the response
  //     access_token: 'ssddf',
  //     refresh_token: 'ssdvsfvfvfsvdf',
  //     expiration: '900',
  //   };
  //   await use(info.access_token);
  // },
});
