
import { Locator, Page } from '@playwright/test';
import ProductItem from '../../components/ProductItem/ProductItem';
import BasePage from '../Base/BasePage';
import HomePageLocators from './HomePageLocators';

export default class HomePage extends BasePage {
  readonly locators: HomePageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new HomePageLocators(this.page.locator('body'));
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



  //popular products -> every product is a new component

  //links
  //getByRole('link', { name: 'All products ' })
  //getByRole('link', { name: 'All sale products ' })

  //section[class*="featured-products"] a[class*="all-product-link"]
}
