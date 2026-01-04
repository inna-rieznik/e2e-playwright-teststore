import { Page } from "@playwright/test";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

export default abstract class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
