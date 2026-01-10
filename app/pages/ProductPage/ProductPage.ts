import { Page } from "@playwright/test";
import ProductContainerComponent from "../../components/ProductContainerComponent/ProductContainerComponent";
import BasePage from "../Base/BasePage";

export default class ProductPage extends BasePage {
  readonly productContainerComponent: ProductContainerComponent;

  constructor(page: Page) {
    super(page);
    this.productContainerComponent = new ProductContainerComponent(this.page.locator("#main .col-md-6")); //new HeaderComponent(this.page.locator("header"));
  }
}
