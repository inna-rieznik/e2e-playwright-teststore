import { Locator } from '@playwright/test';
import BaseLocators from '../../pages/Base/BaseLocators';

export default class ShippingSectionLocators extends BaseLocators {
  readonly continueButton: Locator = this.baseLocator.getByRole('button', { name: 'Continue' });
}
