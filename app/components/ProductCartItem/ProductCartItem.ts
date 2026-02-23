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

  getTotalPriceForAllProducts(): Locator {
    const price = this.locators.totalPriceForAllProductsRow;
    return price;
  }

  getRegularPriceForOneProduct(): Locator {
    const price = this.locators.regularPriceForOneProductRow;
    return price;
  }

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
