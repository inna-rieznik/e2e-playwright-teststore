import { Locator } from "@playwright/test";
import BaseLocators from "../../pages/Base/BaseLocators";

export default class ProductAddedToCartModalComponentLocators extends BaseLocators {

    readonly proceedToCheckoutButton: Locator = this.baseLocator.getByRole('link', { name: 'Proceed to checkout' });
    readonly continueShoppingButton: Locator = this.baseLocator.getByRole('button', { name: 'Continue shopping' });
    readonly closeButton: Locator = this.baseLocator.getByRole('button', { name: 'Close' });
    readonly banner: Locator = this.baseLocator.locator('#myModalLabel');


}
