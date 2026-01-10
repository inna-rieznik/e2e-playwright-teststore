import ProductItemComponent from '../../components/ProductItemComponent/ProductItemComponent';
import BasePage from '../Base/BasePage';

export default class HomePage extends BasePage {
  private getBaseProductItemLocator = (productName: string) =>
    `//h3[contains(@class, "product-title")]//a[normalize-space(text())="${productName}"]/ancestor::article[contains(@class, "product-miniature")]`;

  getProductItem(productName: string) {
    const item = new ProductItemComponent(
      this.page.locator(this.getBaseProductItemLocator(productName))
    );
    return item;
  }

  //carousel

  //popular products -> every product is a new component

  //links
  //getByRole('link', { name: 'All products ' })
  //getByRole('link', { name: 'All sale products ' })

  //section[class*="featured-products"] a[class*="all-product-link"]
}
