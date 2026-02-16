import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import ProductItemLocators from "./ProductItemLocators";

export default class ProductItem extends BaseComponent {
  readonly locators: ProductItemLocators =
    new ProductItemLocators(this.baseLocator);

  constructor(locator: Locator) {
    super(locator);
  }

  async clickAddToWishlistButton() {
    await this.locators.addToWishlistButton.click();
  }

  async clickProductTitleRow() {
    await this.locators.productTitleRow.click();
  }

}
