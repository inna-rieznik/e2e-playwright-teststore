
import { Locator } from '@playwright/test';
import ProductItem from '../../components/ProductItem/ProductItem';
import BasePage from '../Base/BasePage';

export default class HomePage extends BasePage {

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


  //popular products -> every product is a new component

  //links
  //getByRole('link', { name: 'All products ' })
  //getByRole('link', { name: 'All sale products ' })

  //section[class*="featured-products"] a[class*="all-product-link"]
}
