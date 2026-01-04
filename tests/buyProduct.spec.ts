import { test } from "@playwright/test";
import HomePage from "../pageObjects/pages/HomePage/HomePage";

test("should login and then add popular product to a cart", async ({ page }) => {
  
});

test("should add popular product to a cart and then login", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("/");

  await homePage
    .getProductItem("The adventure begins Framed...")
    .clickProductTitleRow();

  
});
