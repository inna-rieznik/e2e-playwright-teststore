import { expect } from '@playwright/test';
import { test } from '../fixture';

test.describe('Buy Product', () => {
  test('[E2E-001] Should add popular product to a cart and then login', async ({
    page,
    homePage,
    productPage,
  }) => {
    const constants = {
      productCount: '2',
      productItemTitle: 'The adventure begins Framed...',
    };

    await homePage.goto();
    await homePage.getProductItem(constants.productItemTitle).clickProductTitleRow();

    await productPage.productContainer.setQuantity(constants.productCount);
    await productPage.productContainer.clickAddToCartButton();
    await page.waitForTimeout(10000); //TODO replace with waitForResponse

    const productsCountInACart = productPage.header.getCartProductsCount();
    expect(productsCountInACart).toHaveText(`(${constants.productCount})`);

    //modal: proceed to checkout
    //shopping cart

    //personal information page - Order as a guest
  });

  test('[E2E-002] Should login and then add popular product to a cart', async ({
    loginBeforeTest,
    logOutAfterTest,
    homePage,
    productPage,
    shoppingCartPage,
    page
  }) => {
    const constants = {
      productCount: '2',
      productItemTitle: 'The adventure begins Framed...',
    };

    await homePage.goto();
    await homePage.getProductItem(constants.productItemTitle).clickProductTitleRow();
    await productPage.productContainer.setQuantity(constants.productCount);
    await productPage.productContainer.clickAddToCartButton();
    await page.waitForTimeout(10000); //TODO replace with waitForResponse

    //TODO check quantity that was added is the same and price is the same ??
    await productPage.productAddedToCartModal.clickProceedToCheckoutButton();

    await shoppingCartPage.clickProceedToCheckoutButton();

  });

  test('[E2E-003] Should delete product from cart', async ({ page }) => { });

  test('[E2E-004] Should add product to favorites', async ({ page }) => { });

  test('[E2E-005] Should sort products', async ({ page }) => { });
});
