import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import ProductCartItemLocators from "./ProductCartItemLocators";

export default class ProductCartItem extends BaseComponent {
  readonly locators: ProductCartItemLocators =
    new ProductCartItemLocators(this.baseLocator);

  constructor(locator: Locator) {
    super(locator);
  }

  async clickDeleteButton() {
    await this.locators.deleteButton.click();
  }

  async getQuantity(): Promise<string> {
    const quantity = await this.locators.quantityInput.inputValue();
    return quantity;
  }

  async getTotalPriceForAllProducts(): Promise<string> {
    const price = await this.locators.totalPriceForAllProductsRow.textContent();
    return price ?? '';
  }

  async getRegularPriceForOneProduct(): Promise<string> {
    const price = await this.locators.regularPriceForOneProductRow.textContent();
    return price ?? '';
  }





  //get price after discount
  //get discount


  async clickIncrementQuantity(numberOfClicks: number) {
    for (let i = 0; i < numberOfClicks; i++) {
      await this.locators.quantityIncrementButton.click();
    }
  }

  async clickDecrementQuantity(numberOfClicks: number) {
    for (let i = 0; i < numberOfClicks; i++) {
      await this.locators.quantityDecrementButton.click();
    }
  }
}
