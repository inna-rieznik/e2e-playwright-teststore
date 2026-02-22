import { Locator } from "@playwright/test";
import BaseComponent from "../Base/BaseComponent";
import ProductContainerLocators from "./ProductContainerLocators";
import { ProductColor, ProductSize } from "../../../types/productTypes";

export default class ProductContainer extends BaseComponent {
  private locators: ProductContainerLocators;

  constructor(locator: Locator) {
    super(locator);
    this.locators = new ProductContainerLocators(this.baseLocator);
  }

  async clickAddToCartButton() {
    await this.locators.addToCartButton.click();
  }

  async setQuantity(quantity: string) {
    await this.locators.quantityInput.fill(quantity);
  }

  getColorCheckbox(color: ProductColor): Locator {
    return this.baseLocator.locator(`input[title="${color}"]`);
  }

  async checkColorCheckbox(color: ProductColor): Promise<void> {
    await this.getColorCheckbox(color).check();
  }

  getProductName(): Locator {
    return this.locators.productTitle;
  }

  async selectSize(size: ProductSize): Promise<void> {
    await this.locators.sizeSelect.selectOption({ label: size });
  }

}
