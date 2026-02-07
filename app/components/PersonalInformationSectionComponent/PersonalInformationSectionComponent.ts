import { Locator } from 'playwright/types/test';
import BaseComponent from '../Base/BaseComponent';
import PersonalInformationComponentLocators from './PersonalInformationSectionComponentLocators';

export default class PersonalInformationComponent extends BaseComponent {
  readonly locators: PersonalInformationComponentLocators =
    new PersonalInformationComponentLocators(this.baseLocator);

  constructor(locator: Locator) {
    super(locator);
  }

  async clickContinueButton() {
    await this.locators.continueButton.click();
  }
}
