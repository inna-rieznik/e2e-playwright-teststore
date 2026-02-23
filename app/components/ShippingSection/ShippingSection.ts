import { Locator } from '@playwright/test';
import BaseComponent from '../Base/BaseComponent';
import ShippingSectionLocators from './ShippingSectionLocators';
type DeliveryTitle = 'Click and collect' | 'My carrier';

export default class ShippingSection extends BaseComponent {
  readonly locators: ShippingSectionLocators = new ShippingSectionLocators(
    this.baseLocator
  );

  constructor(locator: Locator) {
    super(locator);
  }

  private getCheckboxByTitle = (title: DeliveryTitle) => {
    return this.baseLocator.locator(
      `//span[normalize-space()='${title}']   /ancestor::div[contains(@class,'js-delivery-option')]  //input[@type='radio']`
    );
  };

  async clickContinueButton() {
    await this.locators.continueButton.click();
  }

  async checkCheckboxByTitle(title: DeliveryTitle) {
    await this.getCheckboxByTitle(title).check();
  }
}
