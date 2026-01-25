import { Locator } from "@playwright/test";
import BaseLocators from "../../pages/Base/BaseLocators";

export default class CheckoutPersonalInformationComponentLocators extends BaseLocators {

    readonly firstNameInput: Locator = this.baseLocator.getByRole('textbox', { name: 'First name' });
    readonly lastNameInput: Locator = this.baseLocator.getByRole('textbox', { name: 'Last name' });
    readonly emailInput: Locator = this.baseLocator.getByRole('textbox', { name: 'Email Email' });
    readonly passwordInput: Locator = this.baseLocator.getByRole('textbox', { name: 'Password input' });
    readonly BirthDateInput: Locator = this.baseLocator.getByRole('textbox', { name: 'Birthdate' });
    readonly mrSocialTitleRadio: Locator = this.baseLocator.getByRole('radio', { name: 'Mr.' });
    readonly mrsSocialTitleRadio: Locator = this.baseLocator.getByRole('radio', { name: 'Mrs.' });
    readonly offerCheckbox: Locator = this.baseLocator.getByText('Receive offers from our');
    readonly termsCheckbox: Locator = this.baseLocator.getByText('I agree to the terms and');
    readonly newsLetterCheckbox: Locator = this.baseLocator.getByText('Sign up for our');
}
