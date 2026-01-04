import { Locator, Page } from "@playwright/test";

export default abstract class BaseLocators {
  protected baseLocator: Locator;

  constructor(baseLocator: Locator) {
    this.baseLocator = baseLocator;
  }
}
