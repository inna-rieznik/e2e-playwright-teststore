import { Locator } from "@playwright/test";
import BaseComponent from "../../Base/BaseComponent";

export default abstract class BaseModal {
    protected baseLocator: Locator;
    readonly closeButton: Locator;

    constructor(baseLocator: Locator) {
        this.baseLocator = baseLocator;
        this.closeButton = this.baseLocator.getByRole('button', { name: 'Close' });
    }

    async clickCloseButton() {
        await this.closeButton.click();
    };


}
