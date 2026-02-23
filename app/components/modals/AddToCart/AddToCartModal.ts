import { Locator } from "@playwright/test";
import AddToCartModalLocators from "./AddToCartModalLocators";
import BaseModal from "../BaseModal/BaseModal";

export default class AddToCartModal extends BaseModal {
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

    getBannerText() {
        return this.locators.banner;
    }


}
