import { Locator } from "@playwright/test";
import ProductCartItem from "../../components/ProductCartItem/ProductCartItem";
import BasePage from "../Base/BasePage";
import ShoppingCartPageLocators from "./ShoppingCartPageLocators";

export default class ShoppingCartPage extends BasePage {
    readonly locators: ShoppingCartPageLocators = new ShoppingCartPageLocators(this.page.locator('body'));

    navigateTo() {
        return super.navigateTo('?controller=cart&action=show');
    }

    getProductCartItem(productName: string) {
        const item = new ProductCartItem(
            this.page
                .locator('.cart-item')
                .filter({ has: this.page.getByRole('link', { name: productName }) })
                .first()
        );
        return item;
    }

    async clickProceedToCheckoutButton() {
        await this.locators.proceedToCheckoutButton.click();
    }

    getTotalPriceTaxIncluded(): Locator {
        return this.locators.totalPriceTaxIncluded;
    }

    getTotalPriceTaxExcluded(): Locator {
        return this.locators.totalPriceTaxExcluded;
    }

    getShippingPrice(): Locator {
        return this.locators.shippingPrice;
    }

    getCountOfProducts(): Locator {
        return this.locators.countOfProducts;
    }

    getSize(): Locator {
        return this.locators.size;
    }

    getColor(): Locator {
        return this.locators.color;
    }
}
