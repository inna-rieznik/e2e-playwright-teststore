import BaseLocators from '../../pages/Base/BaseLocators';

export default class ProductLineShoppingCartLocators extends BaseLocators {
  readonly deleteIcon = this.baseLocator.getByRole('link', { name: 'delete' });
  readonly singleProductPrice = this.baseLocator.locator('.product-line-grid-body .product-price');
  readonly totalProductPrice = this.baseLocator.locator('span.product-price');
  readonly productTitle = this.baseLocator.locator('.product-line-info').first();
}
