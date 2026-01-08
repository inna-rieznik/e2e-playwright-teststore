import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import HeaderComponentLocators from "./HeaderComponentLocators";

export default class HeaderComponent extends BaseComponent {
  readonly locators: HeaderComponentLocators;

  constructor(locator: Locator) {
    super(locator);
    this.locators = new HeaderComponentLocators(this.baseLocator); //composition: HAS A
  }

  async clickCartButton() {
    this.locators.cartButton.click();
  }

  getCartProductsCount(): Locator {
    return this.locators.cartButtonProductsCount;
  }
}
