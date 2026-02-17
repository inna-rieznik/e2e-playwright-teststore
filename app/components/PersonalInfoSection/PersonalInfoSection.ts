import { Locator } from '@playwright/test';
import BaseComponent from '../Base/BaseComponent';
import PersonalInfoSectionLocators from './PersonalInfoSectionLocators';
import type { RequiredPersonalInfoInputs } from '../../../types/checkoutTypes';

export default class PersonalInfoSection extends BaseComponent {
  readonly locators: PersonalInfoSectionLocators =
    new PersonalInfoSectionLocators(this.baseLocator);

  constructor(locator: Locator) {
    super(locator);
  }

  private async fillFirstNameInput(firstName: string): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
  }


  private async fillLastNameInput(lastName: string): Promise<void> {
    await this.locators.lastNameInput.fill(lastName);
  }


  private async fillEmailInput(email: string): Promise<void> {
    await this.locators.emailInput.fill(email);
  }

  private async fillPasswordInput(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  private async fillBirthDateInput(birthDate: string): Promise<void> {
    await this.locators.birthDateInput.fill(birthDate);
  }

  private async fillSocialTitleRadio(socialTitle: string): Promise<void> {
    if (socialTitle === 'Mr.') {
      await this.locators.mrSocialTitleRadio.click();
    } else if (socialTitle === 'Mrs.') {
      await this.locators.mrsSocialTitleRadio.click();
    }
  }

  private async fillOfferCheckbox(): Promise<void> {
    await this.locators.offerCheckbox.check();
  }


  private async fillTermsCheckbox(): Promise<void> {
    await this.locators.termsCheckbox.check();
  }

  private async fillNewsLetterCheckbox(): Promise<void> {
    await this.locators.newsLetterCheckbox.check();
  }

  async fillOnlyRequiredFields({ firstName, lastName, email, socialTitle }: RequiredPersonalInfoInputs): Promise<void> {
    await this.fillFirstNameInput(firstName);
    await this.fillLastNameInput(lastName);
    await this.fillEmailInput(email);
    await this.fillSocialTitleRadio(socialTitle);
    await this.fillTermsCheckbox();
  }

  async createNewAccount({ email, password, birthDate}: { email: string, password: string, birthDate?: string }): Promise<void> {
    await this.fillEmailInput(email);
    await this.fillPasswordInput(password);
    if (birthDate) {
      await this.fillBirthDateInput(birthDate);
    }
    await this.fillTermsCheckbox();
    await this.fillNewsLetterCheckbox();
  }
}
