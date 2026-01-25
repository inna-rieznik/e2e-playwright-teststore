import BaseComponent from '../Base/BaseComponent';
import ProductLineShoppingCartLocators from './ProductLineShoppingCartLocators';

export default class ProductLineShoppingCart extends BaseComponent {
  readonly locators: ProductLineShoppingCartLocators = new ProductLineShoppingCartLocators(
    this.baseLocator
  );

  async clickDeleteIcon() {
    await this.locators.deleteIcon.click();
  }

  getPriceForOneItem() {
    return this.locators.singleProductPrice;
  }

  getTotalPrice() {
    return this.locators.totalProductPrice;
  }


}
