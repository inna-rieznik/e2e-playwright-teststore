import { APIResponse } from '@playwright/test';
import { test as base } from '@playwright/test';
import fs from 'fs';
import LoginPage from './app/pages/LoginPage/LoginPage';
import HomePage from './app/pages/HomePage/HomePage';
import ShoppingCartPage from './app/pages/ShoppingCartPage/ShoppingCartPage';
import CheckoutPage from './app/pages/CheckoutPage/CheckoutPage';
import { authenticateViaAPI } from './support';
import { ProductQuantity, WishlistProduct } from './types/productTypes';
import { UserToCreate } from './types/userTypes';
import AccessoriesPage from './app/pages/AccessoriesPage/AccessoriesPage';
import ProductDetailsPage from './app/pages/ProductDetailsPage/ProductDetailsPage';
import SearchResultsPage from './app/pages/SearchResultsPage/SearchResultsPage';

type MyFixture = {
  loginPage: LoginPage;
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutPage: CheckoutPage;
  accessoriesPage: AccessoriesPage;
  searchResultsPage: SearchResultsPage;
  addProductToTheCart: (payload: ProductQuantity) => Promise<APIResponse>;
  deleteProductFromWishlist: (payload: WishlistProduct) => Promise<APIResponse>;
  createUserViaApi: (user: UserToCreate) => Promise<APIResponse>;
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

  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },

  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  accessoriesPage: async ({ page }, use) => {
    const accessoriesPage = new AccessoriesPage(page);
    await use(accessoriesPage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },


  //api
  addProductToTheCart: async ({ page }, use) => {
    const request = page.context().request;

    const addProductToTheCart = async ({ productId, quantity, }: ProductQuantity): Promise<APIResponse> =>
      request.post(
        `${process.env.BASE_URL}/index.php?controller=cart`,
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

  deleteProductFromWishlist: async ({ page }, use) => {
    const request = page.context().request;

    const deleteProductFromWishlist = async ({
      productId,
      wishlistId,
      productAttributeId,
    }: WishlistProduct): Promise<APIResponse> =>
      request.post(
        `${process.env.BASE_URL}/index.php?action=deleteProductFromWishlist&fc=module&module=blockwishlist&controller=action&params[id_product]=${productId}&params[idWishList]=${wishlistId}&params[id_product_attribute]=${productAttributeId}`,
        { failOnStatusCode: true }
      );

    await use(deleteProductFromWishlist);
  },

  createUserViaApi: async ({ request }, use) => {
    const createUser = async (user: UserToCreate): Promise<APIResponse> =>
      request.post(
        `${process.env.BASE_URL}/index.php?controller=registration`,
        {
          form: {
            email: user.email,
            gender: user.gender,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            submitCreate: '1',
          },
          failOnStatusCode: true,
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            priority: 'u=0, i',
            'sec-ch-ua':
              '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
          },
        }
      );
    await use(createUser);
  },

  userToLogin: undefined,

  //auth
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
  }
});
