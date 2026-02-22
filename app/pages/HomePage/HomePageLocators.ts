import { Locator } from '@playwright/test';
import BaseLocators from '../Base/BaseLocators';

export default class HomePageLocators extends BaseLocators {

    readonly searchDropdown: Locator = this.baseLocator.locator('ul.ui-autocomplete');

    readonly searchDropdownItems: Locator = this.baseLocator.locator('.ui-menu-item');


}
