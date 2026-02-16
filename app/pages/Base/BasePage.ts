import { Page } from "@playwright/test";
import Header from "../../components/Header/Header";

export default abstract class BasePage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator("#header"));
  }

  async navigateTo(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  //can be methods
  //reload
}
