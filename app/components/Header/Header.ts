import { Locator, Page } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import HeaderLocators from "./HeaderLocators";

export default class Header extends BaseComponent {
  readonly locators: HeaderLocators;

  constructor(locator: Locator) {
    super(locator);
    this.locators = new HeaderLocators(this.baseLocator);
  }

  async clickCartButton() {
    await this.locators.cartButton.click();
  }

  async clickSignOutButton() {
    await this.locators.signOutButton.click();
  }

  async pressEnter() {
    await this.locators.searchInput.press('Enter');
  }

  async fillSearchInput(query: string, page: Page) {
    const responsePromise = page.waitForResponse('**/index.php?controller=search');
    await this.locators.searchInput.fill(query);
    await responsePromise;
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
