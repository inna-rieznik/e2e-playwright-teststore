import { Locator } from '@playwright/test';
import BaseLocators from '../../../pages/Base/BaseLocators';

export default class MyWishlistsLocators extends BaseLocators {

    readonly closeButton: Locator = this.baseLocator.getByRole('button', { name: 'Close' });

    readonly wishlistItems: Locator = this.baseLocator.getByRole('listitem');

    readonly createNewWishlistButton: Locator = this.baseLocator.locator('.modal-footer').first();
}
