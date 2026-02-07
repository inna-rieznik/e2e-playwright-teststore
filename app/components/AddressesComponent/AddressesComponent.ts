import { Locator } from '@playwright/test';
import BaseComponent from '../Base/BaseComponent';
import AddressesComponentLocators from './AdressesComponentLocators';

export default class AddressesComponent extends BaseComponent {
  readonly locators: AddressesComponentLocators = new AddressesComponentLocators(
    this.baseLocator
  );

  constructor(locator: Locator) {
    super(locator);
  }
}
