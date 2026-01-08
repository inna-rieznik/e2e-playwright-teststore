import { Locator, Page } from "@playwright/test";

export default abstract class BaseComponent {
  protected baseLocator: Locator;

  constructor(baseLocator: Locator) {
    this.baseLocator = baseLocator;
  }
}
