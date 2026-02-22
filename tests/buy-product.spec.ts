import { expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';
import { products } from '../data/products';
import { Tags } from '../enums/tags';

test.describe('Buy Product', () => {

  test.afterAll(async () => {

  });


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

    await homePage.navigateTo();
    await homePage.getProductItem(product.title).clickProductTitleRow();

    await productDetailsPage.productContainer.setQuantity(count.toString());
    await productDetailsPage.productContainer.clickAddToCartButton();
    await productDetailsPage.addToCartModal.clickProceedToCheckoutButton();

    const actualProductsCountInACart = shoppingCartPage.header.getCartProductsCount();
    expect(actualProductsCountInACart).toContainText(count.toString());

    const actualTotalPriceTaxExcluded = shoppingCartPage.getTotalPriceTaxExcluded();
    expect(actualTotalPriceTaxExcluded).toContainText(expectedTotalPrice.toString());

    const actualShippingPrice = shoppingCartPage.getShippingPrice();
    expect(actualShippingPrice).toContainText(expectedShippingPrice);
  });

  test('[E2E-BUY-002] add product to favorites from homePage', { tag: [Tags.Regression] }, async ({
    page,
    homePage,
    deleteProductFromWishlist,
  }) => {
    const product = products.hummingbirdTshirt;
    await homePage.navigateTo();
    await homePage.getProductItem(product.title).clickAddToWishlistButton();

    const addToWishlistResponsePromise = page.waitForResponse((res) => res.url().includes('addProductToWishlist'));
    await homePage.myWishlistsModal.selectWishlistByName('My wishlist');
    const response = await addToWishlistResponsePromise;

    const url = new URL(response.url());
    const wishlistId = Number(url.searchParams.get('params[idWishList]'));
    const productAttributeId = Number(url.searchParams.get('params[id_product_attribute]'));

    const successToast = homePage.getSuccessToast();
    expect(successToast).toContainText('Product added');

    await deleteProductFromWishlist({
      productId: product.id,
      wishlistId,
      productAttributeId,
    });
  });

  test('[E2E-BUY-003] select product color and size from the product details page and add to cart', { tag: [Tags.Regression] }, async ({
    homePage,
    productDetailsPage,
    shoppingCartPage,
  }) => {

    const count = 6;
    const product = products.hummingbirdTshirt;

    await homePage.navigateTo();
    await homePage.getProductItem(product.title).clickProductTitleRow();

    await productDetailsPage.productContainer.setQuantity(count.toString());
    await productDetailsPage.productContainer.checkColorCheckbox('White');
    await productDetailsPage.productContainer.selectSize('M');
    await productDetailsPage.productContainer.clickAddToCartButton();
    await productDetailsPage.addToCartModal.clickProceedToCheckoutButton();

    const actualSize = await shoppingCartPage.getSize().textContent();
    expect(actualSize).toContain('M');

    const actualColor = await shoppingCartPage.getColor().textContent();
    expect(actualColor).toContain('White');
  });


});
