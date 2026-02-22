import { Locator, Page } from '@playwright/test';
import BasePage from '../Base/BasePage';
import SearchResultsPageLocators from './SearchResultsPageLocators';


export default class SearchResultsPage extends BasePage {

  readonly locators: SearchResultsPageLocators;


  constructor(page: Page) {
    super(page);
    this.locators = new SearchResultsPageLocators(this.page.locator('body'));
  }

  async getNoResultsMessage(): Promise<string> {
    return await this.locators.noResultsMessage.textContent() || '';
  }

  getProductItem(): Locator {
    return this.page.locator('article.product-miniature');
  }
}
