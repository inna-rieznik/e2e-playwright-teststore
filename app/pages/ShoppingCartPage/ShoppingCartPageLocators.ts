import { Locator } from "@playwright/test";
import BaseLocators from "../Base/BaseLocators";

export default class ShoppingCartPageLocators extends BaseLocators {

    readonly proceedToCheckoutButton: Locator = this.baseLocator.getByRole('link', { name: 'Proceed to checkout' });
}
