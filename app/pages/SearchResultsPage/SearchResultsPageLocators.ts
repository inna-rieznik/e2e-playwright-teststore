import { Locator } from "@playwright/test";
import BaseLocators from "../Base/BaseLocators";

export default class SearchResultsPageLocators extends BaseLocators {
    readonly noResultsMessage: Locator = this.baseLocator.locator('#product-search-no-matches');
}
