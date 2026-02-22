import { Page } from '@playwright/test';
import ProductContainer from '../../components/ProductContainer/ProductContainer';
import BasePage from '../Base/BasePage';
import AddToCartModal from '../../components/modals/AddToCart/AddToCartModal';
import ProductDetailsPageLocators from './ProductDetailsPageLocators';

export default class ProductDetailsPage extends BasePage {
  readonly productContainer: ProductContainer;
  readonly addToCartModal: AddToCartModal;
  readonly locators: ProductDetailsPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductDetailsPageLocators(this.page.locator('body'));
    this.productContainer = new ProductContainer(
      this.page.locator('#main .col-md-6')
    );

    this.addToCartModal = new AddToCartModal(
      this.page.locator('#blockcart-modal')
    );
  }
}
