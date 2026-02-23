import { Locator, Page } from '@playwright/test';
import BasePage from '../Base/BasePage';
import SearchResultsPageLocators from './SearchResultsPageLocators';


export default class SearchResultsPage extends BasePage {

  readonly locators: SearchResultsPageLocators;


  constructor(page: Page) {
    super(page);
    this.locators = new SearchResultsPageLocators(this.page.locator('body'));
  }

  getNoResultsMessage(): Locator {
    return this.locators.noResultsMessage;
  }

  getProductItem(): Locator {
    return this.page.locator('article.product-miniature');
  }
}
