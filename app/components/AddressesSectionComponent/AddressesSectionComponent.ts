import { Locator } from '@playwright/test';
import BaseComponent from '../Base/BaseComponent';
import AddressesSectionComponentLocators from './AddressesSectionComponentLocators';

export default class AddressesSectionComponent extends BaseComponent {
  readonly locators: AddressesSectionComponentLocators = new AddressesSectionComponentLocators(
    this.baseLocator
  );

  constructor(locator: Locator) {
    super(locator);
  }

  private async fillFirstNameInput(firstName: string) {
    await this.locators.firstNameInput.fill(firstName);
  }

  private async fillLastNameInput(lastName: string) {
    await this.locators.lastNameInput.fill(lastName);
  }

  private async fillAddressInput(address: string) {
    await this.locators.addressInput.fill(address);
  }

  private async fillCityInput(city: string) {
    await this.locators.cityInput.fill(city);
  }

  private async fillStateInput(state: string) {
    await this.locators.stateInput.selectOption(state);
  }

  private async fillZipPostalCodeInput(zipPostalCode: string) {
    await this.locators.zipPostalCodeInput.fill(zipPostalCode);
  }

  private async fillCountryInput(country: string) {
    await this.locators.countryInput.selectOption(country);
  }

  private async fillAliasInput(alias: string) {
    await this.locators.aliasInputOptional.fill(alias);
  }

  private async fillCompanyInput(company: string) {
    await this.locators.companyInputOptional.fill(company);
  }

  private async fillAddressComplementInput(addressComplement: string) {
    await this.locators.addressComplementInputOptional.fill(addressComplement);
  }

  private async fillPhoneInput(phone: string) {
    await this.locators.phoneInputOptional.fill(phone);
  }

  async clickCheckbox() {
    await this.locators.checkbox.click();
  }

  async clickContinueButton() {
    await this.locators.continueButton.click();
  }

  async fillOnlyRequiredFields({
    firstName,
    lastName,
    address,
    city,
    state,
    zipPostalCode,
    country,
  }: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipPostalCode: string;
    country: string;
  }) {
    await this.fillFirstNameInput(firstName);
    await this.fillLastNameInput(lastName);
    await this.fillAddressInput(address);
    await this.fillCityInput(city);
    await this.fillStateInput(state);
    await this.fillZipPostalCodeInput(zipPostalCode);
    await this.fillCountryInput(country);
  }

  async fillOptionalFields({
    alias,
    company,
    addressComplement,
    phone,
  }: {
    alias?: string;
    company?: string;
    addressComplement?: string;
    phone?: string;
  }) {
    if (alias) await this.fillAliasInput(alias);
    if (company) await this.fillCompanyInput(company);
    if (addressComplement) await this.fillAddressComplementInput(addressComplement);
    if (phone) await this.fillPhoneInput(phone);
  }
}
