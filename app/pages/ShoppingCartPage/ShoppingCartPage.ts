import BasePage from "../Base/BasePage";
import ShoppingCartPageLocators from "./ShoppingCartPageLocators";

export default class ShoppingCartPage extends BasePage {
    readonly locators: ShoppingCartPageLocators = new ShoppingCartPageLocators(this.page.locator('body'));

    async clickProceedToCheckoutButton() {
        await this.locators.proceedToCheckoutButton.click();
    }
}
