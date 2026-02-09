import { APIResponse, test as base, expect } from '@playwright/test';
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
  userToLogin: { email: string; password: string };
  logOutAfterTest: void;
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

  storageState: async ({ browser, userToLogin, request }, use) => {
    if (userToLogin) {
      const filename = `.auth/${userToLogin.email}.json` as string;

      if (!fs.existsSync(filename)) {
        const page = await browser.newPage({ storageState: undefined });

        const response: APIResponse = await request.post(
          `https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php`,
          {
            form: {
              email: userToLogin.email,
              password: userToLogin.password,
              submitLogin: '1',
            },
          }
        );

        const responseStatus = response.status();
        expect(responseStatus).toBe(200);

        console.log('User logged in via API, saving storage state...');
        const apiState = await request.storageState();
        if (apiState.cookies && apiState.cookies.length) {
          await page.context().addCookies(apiState.cookies);
        }

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

  logOutAfterTest: [
    // runs after test, clears cookie with name = 'PrestaShop-bd73d297b14c5070734013be8110710b'
    async ({ homePage, context, page }, use) => {
      await use();

      const allCookiesWithAuth = await context.cookies();
      const cookiesWithoutAuth = allCookiesWithAuth.filter(
        cookie => cookie.name !== 'PrestaShop-bd73d297b14c5070734013be8110710b'
      );

      await context.clearCookies();
      await context.addCookies(cookiesWithoutAuth);

      await homePage.navigateTo();
      await page.waitForLoadState('networkidle');

      expect(homePage.header.getSignInButton()).toBeVisible();
      expect(homePage.header.getCurrentUserButton()).toBeHidden();
    },
    { title: 'Logs out user after test is executed.' },
  ],
});
