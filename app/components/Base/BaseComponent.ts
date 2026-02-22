import { Locator } from "@playwright/test";

export default abstract class BaseComponent {
  protected baseLocator: Locator;
  protected continueButtonLocator: Locator;

  constructor(baseLocator: Locator) {
    this.baseLocator = baseLocator;
    this.continueButtonLocator = this.baseLocator.getByRole('button', { name: 'Continue' });
    //
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButtonLocator.click();
  }
}
