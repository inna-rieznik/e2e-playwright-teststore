import { Locator } from '@playwright/test';
import BaseLocators from '../../pages/Base/BaseLocators';

export default class AddressSectionLocators extends BaseLocators {
  readonly firstNameInput: Locator = this.baseLocator.getByRole('textbox', { name: 'First name' });

  readonly lastNameInput: Locator = this.baseLocator.getByRole('textbox', { name: 'Last name' });

  readonly addressInput: Locator = this.baseLocator.getByRole('textbox', {
    name: 'Address',
    exact: true,
  });

  readonly cityInput: Locator = this.baseLocator.getByRole('textbox', { name: 'City' });

  readonly stateInput: Locator = this.baseLocator.getByLabel('State');

  readonly zipPostalCodeInput: Locator = this.baseLocator.getByRole('textbox', {
    name: 'Zip/Postal Code',
  });

  readonly countryInput: Locator = this.baseLocator.getByLabel('Country');

  readonly aliasInputOptional: Locator = this.baseLocator.getByRole('textbox', { name: 'Alias' });

  readonly companyInputOptional: Locator = this.baseLocator.getByRole('textbox', {
    name: 'Company',
  });

  readonly addressComplementInputOptional: Locator = this.baseLocator.getByRole('textbox', {
    name: 'Address Complement',
  });

  readonly phoneInputOptional: Locator = this.baseLocator.getByRole('textbox', { name: 'Phone' });

  readonly checkbox: Locator = this.baseLocator.locator('input[type="radio"]');

  // TODO these locator need when user already exist in the system
  readonly addNewAddressButton: Locator = this.baseLocator
    .getByRole('paragraph')
    .filter({ hasText: 'add new address' });

  //TODO this button exist on every section -> move to parent component
  readonly editButton: Locator = this.baseLocator.getByRole('button', { name: 'Edit' });

  //TODO this is edit and delete current user info, maybe move to another component
  readonly editUserButton: Locator = this.baseLocator.getByRole('link', { name: ' Edit' });
  readonly deleteUserButton: Locator = this.baseLocator.getByRole('link', { name: ' Delete' });
  readonly filledPersonalInfo: Locator = this.baseLocator.locator('article.address-item');

}
