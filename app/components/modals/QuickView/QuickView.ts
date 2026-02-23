import { Locator } from "@playwright/test";
import BaseModal from "../BaseModal/BaseModal";
import QuickViewModalLocators from "./QuickViewLocators";

export default class QuickViewModal extends BaseModal {
    readonly locators: QuickViewModalLocators =
        new QuickViewModalLocators(this.baseLocator);

    constructor(locator: Locator) {
        super(locator);
    }

    async setQuantity(quantity: string) {
        await this.locators.quantityInput.fill(quantity);
    }

    async clickAddToCartButton() {
        await this.locators.addToCartButton.click();
    }

}
