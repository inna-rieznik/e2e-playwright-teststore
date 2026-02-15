import { Page } from '@playwright/test';
import ProductContainerComponent from '../../components/ProductContainerComponent/ProductContainerComponent';
import BasePage from '../Base/BasePage';
import ProductAddedToCartModalComponent from '../../components/ProductAddedToCartModalComponent.ts/ProductAddedToCartModalComponent';

export default class ProductDetailsPage extends BasePage {
  readonly productContainer: ProductContainerComponent;
  readonly productAddedToCartModal: ProductAddedToCartModalComponent;

  constructor(page: Page) {
    super(page);
    this.productContainer = new ProductContainerComponent(
      this.page.locator('#main .col-md-6')
    );

    this.productAddedToCartModal = new ProductAddedToCartModalComponent(
      this.page.locator('#blockcart-modal')
    );
  }
}
