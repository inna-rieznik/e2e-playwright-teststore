import { Locator } from '@playwright/test';
import BaseLocators from '../../pages/Base/BaseLocators';

export default class ProductCartItemLocators extends BaseLocators {

  readonly productTitleRow: Locator = this.baseLocator.locator('[class*="product-line-info"]');

  readonly deleteButton: Locator = this.baseLocator.getByRole('link', { name: 'delete' });

  readonly quantityInput: Locator = this.baseLocator.locator('input[class*="js-cart-line-product-quantity"]');

  readonly quantityIncrementButton: Locator = this.baseLocator.getByRole('button').first();

  readonly quantityDecrementButton: Locator = this.baseLocator.getByRole('button').nth(1);

  readonly regularPriceForOneProductRow: Locator = this.baseLocator.locator('.regular-price');

  readonly totalPriceForAllProductsRow: Locator = this.baseLocator.locator('[class="product-price"]');

  readonly discountRow: Locator = this.baseLocator.locator('.discount-percentage');

  readonly priceWithDiscountForOneProductRow: Locator = this.baseLocator.locator('.current-price');

  // readonly quickViewContainer: Locator = this.baseLocator.locator(
  //   '.product-miniature > .thumbnail-container > .thumbnail-top > .highlighted-informations'
  // ); //visible only on hover -> opens modal

  // readonly quickViewButton: Locator = this.baseLocator.getByRole('link', {
  //   name: 'Quick view',
  // });
}
