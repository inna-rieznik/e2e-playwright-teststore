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

    async getTotalPriceTaxIncluded(): Promise<string> {
        return (await this.locators.totalPriceTaxIncluded.textContent()) ?? '';
    }

    async getTotalPriceTaxExcluded(): Promise<string> {
        return (await this.locators.totalPriceTaxExcluded.textContent()) ?? '';
    }

    async getShippingPrice(): Promise<string> {
        return (await this.locators.shippingPrice.textContent()) ?? '';
    }

    async getCountOfProducts(): Promise<string> {
        return (await this.locators.countOfProducts.textContent()) ?? '';
    }
}
