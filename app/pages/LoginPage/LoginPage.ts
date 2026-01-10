import BasePage from '../Base/BasePage';
import LoginPageLocators from './LoginPageLocators';

export default class LoginPage extends BasePage {
  readonly locators: LoginPageLocators = new LoginPageLocators(this.page.locator('body'));

  async goto() {
    await this.page.goto('?controller=authentication');
  }

  async fillEmail(email: string) {
    this.locators.loginInput.fill(email);
  }

  async fillPassword(password: string) {
    this.locators.passwordInput.fill(password);
  }

  async clickShowPasswordButton() {
    this.locators.showPasswordButton.click();
  }

  async clickSignInButton() {
    this.locators.signInButton.click();
  }

  async performSignIn({ email, password }: { email: string; password: string }) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }
}
