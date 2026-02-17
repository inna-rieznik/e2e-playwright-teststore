import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import ProductContainerLocators from "./ProductContainerLocators";

export default class ProductContainer extends BaseComponent {
  private locators: ProductContainerLocators;

  constructor(locator: Locator) {
    super(locator);
    this.locators = new ProductContainerLocators(this.baseLocator);
  }

  async clickAddToCartButton() {
    this.locators.addToCartButton.click();
  }

  async setQuantity(quantity: string) {
    this.locators.quantityInput.fill(quantity);
  }
}
