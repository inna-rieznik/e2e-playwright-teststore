import BaseComponent from '../Base/BaseComponent';
import CartLineItemLocators from './CartLineItemLocators';

export default class CartLineItem extends BaseComponent {
  readonly locators: CartLineItemLocators = new CartLineItemLocators(
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
