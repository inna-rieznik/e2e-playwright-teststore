import { Locator } from '@playwright/test';
import MyWishlistsLocators from './MyWishlistsLocators';
import BaseModal from '../BaseModal/BaseModal';

export default class MyWishlists extends BaseModal {
    readonly locators: MyWishlistsLocators = new MyWishlistsLocators(
        this.baseLocator
    );

    constructor(locator: Locator) {
        super(locator);
    }

    getWishListItemByName(name: string): Locator {
        return this.locators.wishlistItems.filter({ hasText: name });
    }

    async selectWishlistByName(name: string): Promise<void> {
        await this.getWishListItemByName(name).first().click();
    }

    async clickMyWishlist(): Promise<void> {
        await this.locators.wishlistItems.first().click();
    }

    async clickCreateNewWishlist(): Promise<void> {
        await this.locators.createNewWishlistButton.click();
    }
}
