import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { test } from '../fixture';
import { requireEnv } from '../support';
import { ProductQuantity } from '../types/checkoutTypes';

// fetch("https://teststore.automationtesting.co.uk/index.php?controller=cart", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "priority": "u=1, i",
//     "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://teststore.automationtesting.co.uk/index.php?id_product=1&id_product_attribute=1&rewrite=hummingbird-printed-t-shirt&controller=product",
//   "body": "token=33f5373302d62b0bb1a9ba6662cceda9&id_product=1&id_customization=0&group%5B1%5D=1&group%5B2%5D=8&qty=1&add=1&action=update",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

async function addProductToTheCart(
  { productId, quantity }: ProductQuantity,
  request: APIRequestContext
): Promise<APIResponse> {
  return request.post(
    'https://teststore.automationtesting.co.uk/index.php?controller=cart',
    {
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
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
}


test.describe('Buy Product', () => {

  test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });

  test('[E2E-002] Should add products to a cart and check the total price', async ({
    homePage,
    productPage,
    shoppingCartPage,
    checkoutPage,
  }) => {

    const constants = {
      discountProduct: {
        title: 'Hummingbird printed t-shirt',
        count: 3,
        price: 23.90,
        discount: 20,
      },
      regularProduct: {
        title: 'The adventure begins Framed...',
        count: 3,
        price: 29.00,
        discount: 0,
      }

    };

    const expectedTotalPriceTaxIncluded = (constants.discountProduct.price * (1 - constants.discountProduct.discount / 100)) * constants.discountProduct.count;
    const expectedProductCount = constants.discountProduct.count.toString();
    const expectedShippingPrice = 'Free';

    await homePage.navigateTo();
    await homePage.getProductItem(constants.discountProduct.title).clickProductTitleRow();
    //await homePage.getProductItem get price -> save to variable -> check that price is the same in the cart
    await productPage.productContainer.setQuantity(constants.discountProduct.count.toString());
    await productPage.productContainer.clickAddToCartButton();
    await productPage.addToCartModal.clickProceedToCheckoutButton();

    const actualProductsCountInACart = productPage.header.getCartProductsCount();
    expect(actualProductsCountInACart).toHaveText(expectedProductCount);

    const actualTotalPriceTaxExcluded = await shoppingCartPage.getTotalPriceTaxExcluded();
    expect(actualTotalPriceTaxExcluded).toContain(expectedTotalPriceTaxIncluded.toString());

    const actualShippingPrice = await shoppingCartPage.getShippingPrice();
    expect(actualShippingPrice).toContain(expectedShippingPrice);
  });


  test('[E2E-003] Should delete product from cart', async ({ page }) => { });

  test('[E2E-004] Should add product to favorites from homePage', async ({ page }) => {
    //navigate to a product page
    //click add to favorites button
    //select existed wishlist
  });

  test('[E2E-005] Should add product to favorites from productPage', async ({ page }) => { });

  test('[E2E-005] Should sort products', async ({ page }) => { });
  test('[E2E-005] Should write product review', async ({ page }) => { });
});
