import BasePage from '../Base/BasePage';
import LoginPageLocators from './LoginPageLocators';

export default class LoginPage extends BasePage {
  readonly locators: LoginPageLocators = new LoginPageLocators(this.page.locator('body'));

  async goto() {
    await this.page.goto('?controller=authentication');
  }

  async fillEmail(email: string) {
    await this.locators.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.locators.passwordInput.fill(password);
  }

  async clickShowPasswordButton() {
    await this.locators.showPasswordButton.click();
  }

  async clickSignInButton() {
    await this.locators.signInButton.click();
  }

  async performSignIn({ email, password }: { email: string; password: string }) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }
}
