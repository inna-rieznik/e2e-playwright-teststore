import { test as base } from '@playwright/test';
import LoginPage from './app/pages/LoginPage/LoginPage';
import HomePage from './app/pages/HomePage/HomePage';
import ProductPage from './app/pages/ProductPage/ProductPage';
import { requireEnv } from './support';

type MyFixture = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  beforeFixture: void;
  afterFixture: void;
};

interface User {
  validEmail: string;
  validPassword: string;
}

//TODO after lesson check if done correct (using of .env values) !!!!
const user: User = {
  validEmail: requireEnv('EMAIL'),
  validPassword: requireEnv('PASSWORD'),
};

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

  //TODO re-wright with API??
  beforeFixture: [
    async ({ loginPage, page }, use) => {
      await loginPage.goto();
      await loginPage.performSignIn({ email: user.validEmail, password: user.validPassword });
      await page.waitForLoadState('networkidle');

      await use();
    },
    { auto: true, title: 'Executing before all tests.' },
  ],

  //TODO re-wright with API??
  afterFixture: [
    async ({ productPage }, use) => {
      await use();
      await productPage.header.clickSignOutButton();
    },
    { auto: true, title: 'Executing after all tests are finished.' },
  ],

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
