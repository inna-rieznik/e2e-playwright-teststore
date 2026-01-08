import ProductItemComponent from "../../components/ProductItemComponent/ProductItemComponent";
import BasePage from "../Base/BasePage";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

export default class HomePage extends BasePage {
  // readonly productItemComponent: ProductItemComponent =
  //   new ProductItemComponent(this.page.locator('[class*="product-miniature"]'));

  // readonly header: HeaderComponent = new HeaderComponent(
  //   this.page.locator('header')
  // );

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
