import { Page } from "@playwright/test";
import Header from "../../components/Header/Header";
import MyWishlists from "../../components/modals/MyWishlists/MyWishlists";

export default abstract class BasePage {
  readonly page: Page;
  readonly header: Header;
  readonly myWishlistsModal: MyWishlists;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator("#header"));
    this.myWishlistsModal = new MyWishlists(this.page.locator(".modal-content"));
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
