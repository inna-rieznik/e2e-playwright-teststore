import { APIResponse } from '@playwright/test';
import { test as base } from '@playwright/test';
import fs from 'fs';
import LoginPage from './app/pages/LoginPage/LoginPage';
import HomePage from './app/pages/HomePage/HomePage';
import ProductPage from './app/pages/ProductDetailsPage/ProductDetailsPage';
import ShoppingCartPage from './app/pages/ShoppingCartPage/ShoppingCartPage';
import CheckoutPage from './app/pages/CheckoutPage/CheckoutPage';
import { authenticateViaAPI } from './support';
import { ProductQuantity } from './types/checkoutTypes';

type MyFixture = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutPage: CheckoutPage;
  addProductToTheCart: (payload: ProductQuantity) => Promise<APIResponse>;
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

  addProductToTheCart: async ({ page }, use) => {
    const request = page.context().request;
    const addProductToTheCart = async ({
      productId,
      quantity,
    }: ProductQuantity): Promise<APIResponse> =>
      request.post(
        'https://teststore.automationtesting.co.uk/index.php?controller=cart',
        {
          headers: { 'x-requested-with': 'XMLHttpRequest' },
          form: {
            token: '33f5373302d62b0bb1a9ba6662cceda9',
            id_product: String(productId),
            id_customization: '0',
            'group[1]': '1',
            'group[2]': '8',
            qty: String(quantity),
            add: '1',
            action: 'update',
          },
          failOnStatusCode: true,
        }
      );
    await use(addProductToTheCart);
  },

  userToLogin: undefined,

  storageState: async ({ browser, userToLogin }, use) => {
    if (userToLogin) {
      const filename = `.auth/${userToLogin.email}.json`;

      if (!fs.existsSync(filename)) {
        const page = await browser.newPage({ storageState: undefined });
        const apiState = await authenticateViaAPI({
          email: userToLogin.email,
          password: userToLogin.password,
        });

        if (apiState.cookies && apiState.cookies.length) {
          await page.context().addCookies(apiState.cookies);
        }

        await page.context().storageState({ path: filename });
        await page.close();
      }
      await use(filename);
    } else {
      await use(undefined);
    }
  },

  // logOutAfterTest: [
  //   async ({ homePage, context, page }, use) => {
  //     await use();

  //     const authCookiePattern = /^PrestaShop-/;
  //     const allCookies = await context.cookies();
  //     const cookiesWithoutAuth = allCookies.filter(
  //       (cookie) => !authCookiePattern.test(cookie.name)
  //     );

  //     await context.clearCookies();
  //     if (cookiesWithoutAuth.length) {
  //       await context.addCookies(cookiesWithoutAuth);
  //     }

  //     await homePage.navigateTo();
  //     await page.waitForLoadState('domcontentloaded');
  //   },
  //   { title: 'Logs out user after test is executed.' },
  // ],
});
