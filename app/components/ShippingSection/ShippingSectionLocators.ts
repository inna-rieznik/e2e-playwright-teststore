import { Locator } from '@playwright/test';
import BaseLocators from '../../pages/Base/BaseLocators';

export default class ShippingSectionLocators extends BaseLocators {

  //TODO this button exist on every section -> move to parent component
  readonly continueButton: Locator = this.baseLocator.getByRole('button', { name: 'Continue' });



}
