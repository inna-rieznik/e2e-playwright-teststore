import { expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';
import { products } from '../data/products';
import { Tags } from '../enums/tags';

test.describe('Buy Product', () => {

  test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });

  test('[E2E-BUY-001] add products to a cart from the home page and check the total price', { tag: [Tags.Smoke, Tags.Regression] }, async ({
    homePage,
    productDetailsPage,
    shoppingCartPage,
  }) => {
    const expectedShippingPrice = 'Free';
    const count = 3;
    const product = products.hummingbirdTshirt;
    const expectedTotalPrice = (product.price * (1 - product.discount / 100)) * count;

    await test.step(`Select product and click on it`, async () => {
      await homePage.navigateTo();
      await homePage.getProductItem(product.title).clickProductTitleRow();
    });

    await test.step(`Set quantity and add to cart`, async () => {
      await productDetailsPage.productContainer.setQuantity(count.toString());
      await productDetailsPage.productContainer.clickAddToCartButton();
      await productDetailsPage.addToCartModal.clickProceedToCheckoutButton();
    });

    await test.step(`Check cart`, async () => {
      const actualProductsCountInACart = shoppingCartPage.header.getCartProductsCount();
      await expect(actualProductsCountInACart).toContainText(count.toString());

      const actualTotalPriceTaxExcluded = shoppingCartPage.getTotalPriceTaxExcluded();
      await expect(actualTotalPriceTaxExcluded).toContainText(expectedTotalPrice.toString());

      const actualShippingPrice = shoppingCartPage.getShippingPrice();
      await expect(actualShippingPrice).toContainText(expectedShippingPrice);
    });
  });

  test('[E2E-BUY-002] add product to favorites from homePage', { tag: [Tags.Regression] }, async ({
    page,
    homePage,
    deleteProductFromWishlist,
  }) => {
    const product = products.hummingbirdTshirt;
    const wishlistName = 'My wishlist';
    const successToastText = 'Product added';

    await test.step(`Select product and click on it`, async () => {
      await homePage.navigateTo();
      await homePage.getProductItem(product.title).clickAddToWishlistButton();
    });

    await test.step(`Add product to wishlist and wait until response is received, check success toast is displayed`, async () => {
      const addToWishlistResponsePromise = page.waitForResponse((res) => res.url().includes('addProductToWishlist'));
      await homePage.myWishlistsModal.selectWishlistByName(wishlistName);
      const response = await addToWishlistResponsePromise;

      const url = new URL(response.url());
      const wishlistId = Number(url.searchParams.get('params[idWishList]'));
      const productAttributeId = Number(url.searchParams.get('params[id_product_attribute]'));

      const successToast = homePage.getSuccessToast();
      await expect(successToast).toContainText(successToastText);

      await deleteProductFromWishlist({
        productId: product.id,
        wishlistId,
        productAttributeId,
      });
    });
  });

  test('[E2E-BUY-003] select product color and size from the product details page and add to cart', { tag: [Tags.Regression] }, async ({
    homePage,
    productDetailsPage,
    shoppingCartPage,
  }) => {

    const count = 6;
    const product = products.hummingbirdTshirt;
    const size = 'M';
    const color = 'White';

    await test.step(`Select product and click on it`, async () => {
      await homePage.navigateTo();
      await homePage.getProductItem(product.title).clickProductTitleRow();
    });

    await test.step(`Set quantity, select color and size, add to cart and proceed to checkout`, async () => {
      await productDetailsPage.productContainer.setQuantity(count.toString());
      await productDetailsPage.productContainer.checkColorCheckbox(color);
      await productDetailsPage.productContainer.selectSize(size);
      await productDetailsPage.productContainer.clickAddToCartButton();
      await productDetailsPage.addToCartModal.clickProceedToCheckoutButton();
    });

    await test.step(`Check cart`, async () => {
      const actualSize = shoppingCartPage.getSize();
      await expect(actualSize).toContainText(size);

      const actualColor = shoppingCartPage.getColor();
      await expect(actualColor).toContainText(color);
    });
  });

  test('[E2E-BUY-004] add product to the cart through quick view', { tag: [Tags.Regression] }, async ({ homePage, shoppingCartPage }) => {
    const count = 3;
    const product = products.hummingbirdTshirt;

    await test.step(`Select product and click on it`, async () => {
      await homePage.navigateTo();
      homePage.getProductItem(product.title).hoverQuickViewButton();
      await homePage.getProductItem(product.title).clickQuickViewButton();
    });

    await test.step(`Set quantity, add to cart and proceed to checkout`, async () => {
      await homePage.quickViewModal.setQuantity(count.toString());
      await homePage.quickViewModal.clickAddToCartButton();
      await homePage.addToCartModal.clickProceedToCheckoutButton();
    });

    await test.step(`Check cart`, async () => {
      const actualProductsCountInACart = shoppingCartPage.header.getCartProductsCount();
      await expect(actualProductsCountInACart).toContainText(count.toString());
    });
  });
});
