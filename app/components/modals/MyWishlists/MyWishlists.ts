import { Locator } from '@playwright/test';
import BaseComponent from '../../Base/BaseComponent';
import MyWishlistsLocators from './MyWishlistsLocators';

export default class MyWishlists extends BaseComponent {
    readonly locators: MyWishlistsLocators = new MyWishlistsLocators(
        this.baseLocator
    );

    constructor(locator: Locator) {
        super(locator);
    }

    async clickCloseButton(): Promise<void> {
        await this.locators.closeButton.click();
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
