import { Locator } from '@playwright/test';
import BaseLocators from '../../pages/Base/BaseLocators';

export default class ProductItemLocators extends BaseLocators {
  readonly addToWishlistButton: Locator = this.baseLocator.locator(
    'button[class="wishlist-button-add"]'
  );

  readonly discountFlag: Locator = this.baseLocator.locator('li[class*="discount"]');

  readonly priceRow: Locator = this.baseLocator.locator('[class="product-price-and-shipping"]');

  readonly productTitleRow: Locator = this.baseLocator.locator('[class*="product-title"]');

  readonly quickViewContainer: Locator = this.baseLocator.locator(
    '.product-miniature > .thumbnail-container > .thumbnail-top > .highlighted-informations'
  ); //visible only on hover -> opens modal

  readonly quickViewButton: Locator = this.baseLocator.getByRole('link', {
    name: 'Quick view',
  });
}
