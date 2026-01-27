import { test as base, expect } from '@playwright/test';
import LoginPage from '../app/pages/LoginPage/LoginPage';
import HomePage from '../app/pages/HomePage/HomePage';
import ProductPage from '../app/pages/ProductPage/ProductPage';
import { requireEnv } from '../support';
import ShoppingCartPage from '../app/pages/ShoppingCartPage/ShoppingCartPage';

type MyFixture = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
  loginBeforeTest: void;
  logOutAfterTest: void;
  authCookie: string;
};

// interface User {
//   validEmail: string;
//   validPassword: string;
// }

// //TODO after lesson check if done correct (using of .env values) !!!!
// const user: User = {
//   validEmail: requireEnv('EMAIL'),
//   validPassword: requireEnv('PASSWORD'),
// };

export const test = base.extend<MyFixture>({
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

  logOutAfterTest: [ // runs after test, clears cookie with name = 'PrestaShop-bd73d297b14c5070734013be8110710b'
    async ({ homePage, context, page }, use) => {
      await use();

        const allCookies = await context.cookies();

        const cookiesWithoutAuth = allCookies.filter((cookie) =>
            cookie.name !== 'PrestaShop-bd73d297b14c5070734013be8110710b'
        );

        await context.clearCookies();
        await context.addCookies(cookiesWithoutAuth);

        await homePage.goto();
        await page.waitForLoadState('networkidle');

        expect(homePage.header.getSignInButton()).toBeVisible();
        expect(homePage.header.getCurrentUserButton()).toBeHidden();
    },
    { title: 'Logs out user after test is executed.' },
  ],

  storageState: async ({storageState}, use) => {
    console.log('storageState');

    await use(storageState);
  }


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
