import { Locator } from "@playwright/test";
import BaseLocators from "../Base/BaseLocators";

export default class ProductPageLocators extends BaseLocators {
  readonly addToCartButton: Locator = this.baseLocator.locator(
    '[class*="product-add-to-cart"] button[class*="add-to-cart"]'
  );

  readonly addToWishlistButton: Locator = this.baseLocator.locator(
    '[class*="product-add-to-cart"] button[class*="wishlist-button-add"]'
  );
}
