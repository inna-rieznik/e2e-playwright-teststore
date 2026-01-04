import { Locator } from "@playwright/test";
import BaseComponent from "../base/BaseComponent";
import HeaderComponentLocators from "./HeaderComponentLocators";

export default class HeaderComponent extends BaseComponent {
  readonly locators: HeaderComponentLocators = new HeaderComponentLocators(
    this.baseLocator
  ); //composition: HAS A

  constructor(locator: Locator) {
    super(locator);
  }

  async clickCartButton() {
    this.locators.cartButton.click();
  }
}
