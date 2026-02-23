import BaseLocators from "../../../pages/Base/BaseLocators";
import { Locator } from "@playwright/test";

export default class QuickViewModalLocators extends BaseLocators {

    readonly quantityInput: Locator = this.baseLocator.getByRole('spinbutton', { name: 'Quantity' });

    readonly addToCartButton: Locator = this.baseLocator.locator(
        ".btn-primary.add-to-cart"
    );
}
