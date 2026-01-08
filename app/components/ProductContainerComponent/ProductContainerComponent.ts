import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import ProductContainerComponentLocators from "./ProductContainerComponentLocators";

export default class ProductContainerComponent extends BaseComponent {
  private locators: ProductContainerComponentLocators;

  constructor(locator: Locator) {
    super(locator);
    this.locators = new ProductContainerComponentLocators(this.baseLocator);
  }

  async clickAddToCartButton() {
    this.locators.addToCartButton.click();
  }

  async setQuantity(quantity: string) {
    this.locators.quantityInput.fill(quantity);
  }
}
