import BaseLocators from '../Base/BaseLocators';

export default class LoginPageLocators extends BaseLocators {
  readonly emailInput = this.baseLocator.getByRole('textbox', { name: 'Email' });

  readonly passwordInput = this.baseLocator.getByRole('textbox', { name: 'Password input' });

  readonly forgotPasswordLink = this.baseLocator.getByRole('link', {
    name: 'Forgot your password?',
  });

  readonly showPasswordButton = this.baseLocator.getByRole('button', { name: 'Show' });

  readonly signInButton = this.baseLocator.getByRole('button', { name: 'Sign in' });

  readonly createAccountLink = this.baseLocator.getByRole('link', {
    name: 'No account? Create one here',
  });

  readonly authErrorMessage = this.baseLocator.locator('.alert-danger');
}
