import { Locator } from "@playwright/test";
import BaseComponent from "../base/BaseComponent";
import ProductInformationComponentLocators from "./ProductInformationComponentLocators";

//part of the page
export default class ProductInformationComponent extends BaseComponent {
  readonly locators: ProductInformationComponentLocators =
    new ProductInformationComponentLocators(this.baseLocator);

  constructor(locator: Locator) {
    super(locator);
  }

  async clickAddToWishlistButton() {
    await this.locators.addToWishlistButton.click();
  }

  async clickAddToCartButton() {
    await this.locators.addToCartButton.click();
  }
}
