import { expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';

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

  test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });
  test('[E2E-002] Should add 2 popular products to a cart', async ({
    homePage,
    productPage,
    shoppingCartPage,
    checkoutPage,
    page,
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

    const productsCountInACart = productPage.header.getCartProductsCount();
    expect(productsCountInACart).toHaveText(`(${constants.productCount})`);

    await shoppingCartPage.clickProceedToCheckoutButton();

    await checkoutPage.
  });

  test('[E2E-003] Should delete product from cart', async ({ page }) => {});

  test('[E2E-004] Should add product to favorites from homePage', async ({ page }) => {
    //navigate to a product page
    //click add to favorites button
    //select existed wishlist
  });

  test('[E2E-005] Should add product to favorites from productPage', async ({ page }) => {});

  test('[E2E-005] Should sort products', async ({ page }) => {});
  test('[E2E-005] Should write product review', async ({ page }) => {});
});
