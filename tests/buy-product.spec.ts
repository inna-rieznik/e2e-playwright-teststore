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
    const count = 3;
    const product = products.hummingbirdTshirt;
    const expectedTotalPrice = (product.price * (1 - product.discount / 100)) * count;


    await homePage.navigateTo();
    await homePage.getProductItem(product.title).clickProductTitleRow();

    await productPage.productContainer.setQuantity(count.toString());
    await productPage.productContainer.clickAddToCartButton();
    await productPage.addToCartModal.clickProceedToCheckoutButton();

    const actualProductsCountInACart = productPage.header.getCartProductsCount().textContent();
    expect(await actualProductsCountInACart).toContain(count.toString());

    const actualTotalPriceTaxExcluded = await shoppingCartPage.getTotalPriceTaxExcluded();
    expect(actualTotalPriceTaxExcluded).toContain(expectedTotalPrice.toString());

    const actualShippingPrice = await shoppingCartPage.getShippingPrice();
    expect(actualShippingPrice).toContain(expectedShippingPrice);
  });


  test('[E2E-004] Should add product to favorites from homePage', async ({ homePage }) => {
    const product = products.hummingbirdTshirt;
    await homePage.navigateTo();
    await homePage.getProductItem(product.title).clickAddToWishlistButton();
    await homePage.myWishlistsModal.selectWishlistByName('My wishlist');

    const successToast = homePage.getSuccessToast();
    const successToastText = await successToast.textContent();
    expect(successToastText).toContain('Product added');
  });




  test('[E2E-005] Should add product to favorites from productPage', async ({ page }) => { });

  test('[E2E-005] Should sort products', async ({ page }) => { });
});
