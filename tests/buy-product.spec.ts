import { expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';
import { products } from '../data/products';

test.describe('Buy Product', () => {

  test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });


  //TODo revright to the adding from the products page
  test('[E2E-002] Should add products to a cart and check the total price', async ({
    homePage,
    productPage,
    shoppingCartPage,
  }) => {
    const expectedShippingPrice = 'Free';
    const product = products[0];
    const expectedTotalPrice = (product.price * (1 - product.discount / 100)) * product.count;
    const expectedTotalProductCount = product.count;

    await homePage.navigateTo();
    await homePage.getProductItem(products[0].title).clickProductTitleRow();

    await productPage.productContainer.setQuantity(products[0].count.toString());
    await productPage.productContainer.clickAddToCartButton();
    await productPage.addToCartModal.clickProceedToCheckoutButton();

    const actualProductsCountInACart = productPage.header.getCartProductsCount().textContent();
    expect(await actualProductsCountInACart).toContain(expectedTotalProductCount.toString());

    const actualTotalPriceTaxExcluded = await shoppingCartPage.getTotalPriceTaxExcluded();
    expect(actualTotalPriceTaxExcluded).toContain(expectedTotalPrice.toString());

    const actualShippingPrice = await shoppingCartPage.getShippingPrice();
    expect(actualShippingPrice).toContain(expectedShippingPrice);
  });


  test('[E2E-004] Should add product to favorites from homePage', async ({ homePage, shoppingCartPage }) => {
    await homePage.navigateTo();
    await homePage.getProductItem(products[0].title).clickAddToWishlistButton();
    await homePage.myWishlistsModal.selectWishlistByName('My wishlist');

    const successToast = homePage.getSuccessToast();
    const successToastText = await successToast.textContent();
    expect(successToastText).toContain('Product added');
  });

  //TODO FINISH ME
  test('[E2E-003] Should change items count in the cart', async ({
    addProductToTheCart,
    shoppingCartPage,
  }) => {
    const productId = 1;
    const quantity = 3;
    const response = await addProductToTheCart({ productId, quantity });
    expect(response.status()).toBe(200);

    await shoppingCartPage.navigateTo();
    const countOfProducts = await shoppingCartPage.getCountOfProducts();
    expect(countOfProducts).toContain(quantity.toString());


    await shoppingCartPage.getProductCartItem(products[0].title).clickIncrementQuantity();
    await shoppingCartPage.waitForNetworkIdle();

    const countOfProductsAfterIncrement = await shoppingCartPage.getCountOfProducts();
    expect(countOfProductsAfterIncrement).toContain((quantity + 1).toString());
  });

  //TODO move to separate file

  test('[E2E-003] Should delete item from cart', async ({
    addProductToTheCart,
    shoppingCartPage,
  }) => {
    const productId = 1;
    const quantity = 3;
    const response = await addProductToTheCart({ productId, quantity });
    expect(response.status()).toBe(200);

    await shoppingCartPage.navigateTo();
    const countOfProducts = await shoppingCartPage.getCountOfProducts();
    expect(countOfProducts).toContain(quantity.toString());

    await shoppingCartPage.getProductCartItem(products[0].title).clickDeleteButton();
    await shoppingCartPage.waitForNetworkIdle();

    const countOfProductsAfterDeletion = await shoppingCartPage.getCountOfProducts();
    expect(countOfProductsAfterDeletion).toContain('0');
  });

  test('[E2E-005] Should add product to favorites from productPage', async ({ page }) => { });

  test('[E2E-005] Should sort products', async ({ page }) => { });
});
