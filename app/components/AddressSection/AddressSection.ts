import { Locator } from '@playwright/test';
import BaseComponent from '../Base/BaseComponent';
import AddressSectionLocators from './AddressSectionLocators';
import { OptionalAddressInputs, RequiredAddressInputs } from '../../../types/userTypes';

export default class AddressSection extends BaseComponent {
  readonly locators: AddressSectionLocators = new AddressSectionLocators(
    this.baseLocator
  );

  constructor(locator: Locator) {
    super(locator);
  }

  private async fillFirstNameInput(firstName: string): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
  }

  private async fillLastNameInput(lastName: string): Promise<void> {
    await this.locators.lastNameInput.fill(lastName);
  }

  private async fillAddressInput(address: string): Promise<void> {
    await this.locators.addressInput.fill(address);
  }

  private async fillCityInput(city: string): Promise<void> {
    await this.locators.cityInput.fill(city);
  }

  private async fillStateInput(state: string): Promise<void> {
    await this.locators.stateInput.selectOption(state);
  }

  private async fillZipPostalCodeInput(zipPostalCode: string): Promise<void> {
    await this.locators.zipPostalCodeInput.fill(zipPostalCode);
  }

  private async fillCountryInput(country: string): Promise<void> {
    await this.locators.countryInput.selectOption(country);
  }

  private async fillAliasInput(alias: string): Promise<void> {
    await this.locators.aliasInputOptional.fill(alias);
  }

  private async fillCompanyInput(company: string): Promise<void> {
    await this.locators.companyInputOptional.fill(company);
  }

  private async fillAddressComplementInput(addressComplement: string): Promise<void> {
    await this.locators.addressComplementInputOptional.fill(addressComplement);
  }

  private async fillPhoneInput(phone: string): Promise<void> {
    await this.locators.phoneInputOptional.fill(phone);
  }

  async checkCheckbox(): Promise<void> {
    await this.locators.checkbox.check();
  }

  getFilledPersonalInfo(): Locator {
    return this.locators.filledPersonalInfo;
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButtonLocator.click();
  }

  async fillOnlyRequiredFields({
    firstName,
    lastName,
    address,
    city,
    state,
    zipPostalCode,
    country,
  }: RequiredAddressInputs): Promise<void> {
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
  }: OptionalAddressInputs): Promise<void> {
    if (alias) await this.fillAliasInput(alias);
    if (company) await this.fillCompanyInput(company);
    if (addressComplement) await this.fillAddressComplementInput(addressComplement);
    if (phone) await this.fillPhoneInput(phone);
  }

  async getFirstNameInputValue(): Promise<string> {
    return await this.locators.firstNameInput.inputValue();
  }

  async getLastNameInputValue(): Promise<string> {
    return await this.locators.lastNameInput.inputValue();
  }
}
