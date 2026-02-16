import { Page } from '@playwright/test';
import ProductContainer from '../../components/ProductContainer/ProductContainer';
import BasePage from '../Base/BasePage';
import AddToCartModal from '../../components/AddToCartModal/AddToCartModal';

export default class ProductDetailsPage extends BasePage {
  readonly productContainer: ProductContainer;
  readonly addToCartModal: AddToCartModal;

  constructor(page: Page) {
    super(page);
    this.productContainer = new ProductContainer(
      this.page.locator('#main .col-md-6')
    );

    this.addToCartModal = new AddToCartModal(
      this.page.locator('#blockcart-modal')
    );
  }
}
