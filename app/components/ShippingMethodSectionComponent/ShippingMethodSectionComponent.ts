import { Locator } from '@playwright/test';
import BaseComponent from '../Base/BaseComponent';
import ShippingMethodSectionComponentLocators from './ShippingMethodSectionComponentLocators';
type DeliveryTitle = 'Click and collect' | 'My carrier';

export default class ShippingMethodSectionComponent extends BaseComponent {
  readonly locators: ShippingMethodSectionComponentLocators = new ShippingMethodSectionComponentLocators(
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

  // Click and collect
  // My carrier
  async checkCheckboxByTitle(title: DeliveryTitle) {
    await this.getCheckboxByTitle(title).check();
  }
}
