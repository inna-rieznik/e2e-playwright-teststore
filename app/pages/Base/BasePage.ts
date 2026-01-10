import { Page } from "@playwright/test";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

export default abstract class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(this.page.locator("#header"));
  }

  //can be methods
  //wait until page loaded
  //reload
}
