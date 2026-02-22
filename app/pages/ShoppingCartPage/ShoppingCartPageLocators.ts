import { Locator } from "@playwright/test";
import BaseLocators from "../Base/BaseLocators";

export default class ShoppingCartPageLocators extends BaseLocators {

    readonly proceedToCheckoutButton: Locator = this.baseLocator.getByRole('link', { name: 'Proceed to checkout' });

    //cart-summary
    readonly totalPriceTaxIncluded: Locator = this.baseLocator.locator('.cart-summary');
    readonly totalPriceTaxExcluded: Locator = this.baseLocator.getByText('Total (tax excl.) $');
    readonly shippingPrice: Locator = this.baseLocator.locator('#cart-subtotal-shipping');
    readonly countOfProducts: Locator = this.baseLocator.locator('.js-subtotal');
    readonly size: Locator = this.baseLocator.locator('.size > .value');
    readonly color: Locator = this.baseLocator.locator('.color > .value');


}
