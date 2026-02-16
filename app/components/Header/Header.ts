import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import HeaderLocators from "./HeaderLocators";

export default class Header extends BaseComponent {
  readonly locators: HeaderLocators;

  constructor(locator: Locator) {
    super(locator);
    this.locators = new HeaderLocators(this.baseLocator); //composition: HAS A
  }

  async clickCartButton() {
    await this.locators.cartButton.click();
  }

  async clickSignOutButton() {
    await this.locators.signOutButton.click();
  }

  getCartProductsCount(): Locator {
    return this.locators.cartButtonProductsCount;
  }

  getSignInButton(): Locator {
    return this.locators.signInButton;
  }

  getCurrentUserButton(): Locator {
    return this.locators.currentUserButton;
  }
}
