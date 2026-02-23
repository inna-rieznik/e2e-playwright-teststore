
import { Locator, Page } from '@playwright/test';
import ProductItem from '../../components/ProductItem/ProductItem';
import BasePage from '../Base/BasePage';
import HomePageLocators from './HomePageLocators';
import QuickViewModal from '../../components/modals/QuickView/QuickView';
import AddToCartModal from '../../components/modals/AddToCart/AddToCartModal';

export default class HomePage extends BasePage {
  readonly locators: HomePageLocators;
  readonly quickViewModal: QuickViewModal;
  readonly addToCartModal: AddToCartModal;

  constructor(page: Page) {
    super(page);
    this.locators = new HomePageLocators(this.page.locator('body'));

    this.quickViewModal = new QuickViewModal(
      this.page.locator('.modal-content')
    );

    this.addToCartModal = new AddToCartModal(
      this.page.locator('.modal-dialog')
    );
  }

  async navigateTo() {
    await super.navigateTo('/');
  }

  getProductItem(productName: string) {
    const item = new ProductItem(
      this.page
        .locator('article.product-miniature')
        .filter({ has: this.page.getByRole('link', { name: productName }) })
        .first()
    );
    return item;
  }

  getSuccessToast() {
    return this.page.locator(".wishlist-toast.success");
  }

  getSearchDropdown(): Locator {
    return this.locators.searchDropdown;
  }

  getSearchDropdownItems(): Locator {
    return this.locators.searchDropdownItems;
  }
}
