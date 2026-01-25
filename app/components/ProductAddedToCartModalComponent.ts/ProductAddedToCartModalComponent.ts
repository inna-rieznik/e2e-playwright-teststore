import { Locator } from "@playwright/test";
import ProductAddedToCartModalComponentLocators from "./ProductAddedToCartModalComponentLocators";
import BaseComponent from "../Base/BaseComponent";

export default class ProductAddedToCartModalComponent extends BaseComponent {
    readonly locators: ProductAddedToCartModalComponentLocators =
        new ProductAddedToCartModalComponentLocators(this.baseLocator);

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
