import { expect, test } from "@playwright/test";
import ProductPage from "../app/pages/ProductPage/ProductPage";
import HomePage from "../app/pages/HomePage/HomePage";

test("[E2E-001] Should add popular product to a cart and then login", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const productCount = "2";
  await page.goto("/");

  await homePage
    .getProductItem("The adventure begins Framed...")
    .clickProductTitleRow();

  await productPage.productContainerComponent.setQuantity(productCount);
  await productPage.productContainerComponent.clickAddToCartButton();
  await page.waitForTimeout(10000); //TODO replace with waitForResponse

  const productsCountInACart = productPage.header.getCartProductsCount();
  expect(productsCountInACart).toHaveText(`(${productCount})`);

  //modal: proceed to checkout
  //shopping cart

  //personal information page - Order as a guest
});

test("should login and then add popular product to a cart", async ({
  page,
}) => {});
