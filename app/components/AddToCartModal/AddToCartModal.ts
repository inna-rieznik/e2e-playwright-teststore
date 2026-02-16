import { Locator } from "@playwright/test";
import AddToCartModalLocators from "./AddToCartModalLocators";
import BaseComponent from "../Base/BaseComponent";

export default class AddToCartModal extends BaseComponent {
    readonly locators: AddToCartModalLocators =
        new AddToCartModalLocators(this.baseLocator);

    constructor(locator: Locator) {
        super(locator);
    }

    async clickProceedToCheckoutButton() {
        await this.locators.proceedToCheckoutButton.click();
    };

    async clickContinueShoppingButton() {
        await this.locators.continueShoppingButton.click();
    };

    async clickCloseButton() {
        await this.locators.closeButton.click();
    };

    getBannerText() {
        return this.locators.banner;
    }


}
