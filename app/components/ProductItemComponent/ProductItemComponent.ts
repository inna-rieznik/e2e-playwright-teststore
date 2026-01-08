import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import ProductItemComponentLocators from "./ProductItemComponentLocators";

//part of the page
export default class ProductItemComponent extends BaseComponent {
  readonly locators: ProductItemComponentLocators =
    new ProductItemComponentLocators(this.baseLocator);

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
