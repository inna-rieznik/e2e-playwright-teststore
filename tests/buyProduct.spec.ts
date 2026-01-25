import { expect } from '@playwright/test';
import { test } from '../fixture';

test('[E2E-001] Should add popular product to a cart and then login', async ({
  page,
  homePage,
  productPage,
}) => {

  const constants = {
    productCount: '2',
    productItemTitle: 'The adventure begins Framed...',
  };

  await page.goto('/');
  await homePage.getProductItem(constants.productItemTitle).clickProductTitleRow();

  await productPage.productContainerComponent.setQuantity(constants.productCount);
  await productPage.productContainerComponent.clickAddToCartButton();
  await page.waitForTimeout(10000); //TODO replace with waitForResponse

  const productsCountInACart = productPage.header.getCartProductsCount();
  expect(productsCountInACart).toHaveText(`(${constants.productCount})`);

  //modal: proceed to checkout
  //shopping cart

  //personal information page - Order as a guest
});

test('[E2E-002] should login and then add popular product to a cart', async ({ page }) => {});

test('[E2E-003] Should delete product from cart', async ({page}) => {

});

test('[E2E-004] should add product to favorites', async ({ page }) => {});

test('[E2E-005] should sort products', async ({ page }) => {});
