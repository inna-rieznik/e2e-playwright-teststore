import { Locator } from "@playwright/test";
import BaseLocators from "../../pages/Base/BaseLocators";

export default class ProductContainerLocators extends BaseLocators {
  readonly addToCartButton: Locator = this.baseLocator.locator(
    ".btn-primary.add-to-cart"
  );
  readonly productTitle: Locator = this.baseLocator.locator("h1");

  readonly productPrice: Locator = this.baseLocator.locator(
    ".current-price-value"
  );
  readonly quantityInput: Locator =
    this.baseLocator.locator("#quantity_wanted");


  readonly addToWishlistButton: Locator = this.baseLocator.locator(
    '[class*="product-add-to-cart"] button[class*="wishlist-button-add"]'
  );

  readonly sizeSelect: Locator = this.baseLocator.getByLabel('Size');
}
