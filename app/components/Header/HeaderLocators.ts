// baseLocator object is a realization of Facade and Adapter patterns

import { Locator } from '@playwright/test';
import BaseLocators from '../../pages/Base/BaseLocators';

//this class interacts only with locators
export default class HeaderLocators extends BaseLocators {
  //extend from BaseLocators because it already has implemented constructor with initialization of baseLocator
  readonly signInButton: Locator = this.baseLocator.locator('#_desktop_user_info');

  readonly cartButton: Locator = this.baseLocator.locator('[class*=blockcart]');

  readonly cartButtonProductsCount: Locator = this.baseLocator.locator('.cart-products-count');

  readonly searchInput: Locator = this.baseLocator.getByRole('textbox', { name: 'Search' });

  readonly logo: Locator = this.baseLocator.locator('#_desktop_logo');

  readonly signOutButton: Locator = this.baseLocator.locator('a[class*=logout]');

  readonly currentUserButton: Locator = this.baseLocator.locator('.account');

  readonly clothesButton: Locator = this.baseLocator.getByRole('link', {
    name: 'Clothes',
  });

  readonly accessoriesButton: Locator = this.baseLocator.getByRole('link', {
    name: 'Accessories',
  });

  readonly artButton: Locator = this.baseLocator.getByRole('link', {
    name: 'Art',
  });

  readonly userButton: Locator = this.baseLocator.locator('.account');

  readonly userButtonText: Locator = this.userButton.locator('span.hidden-sm-down');
}
