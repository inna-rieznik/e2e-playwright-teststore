import { Locator } from "@playwright/test";
import BaseLocators from "../Base/BaseLocators";

export default class AccessoriesPageLocators extends BaseLocators {
    readonly activeFilters: Locator = this.baseLocator.locator('.active-filters');

    readonly activeFacetItem: Locator = this.activeFilters.locator('.filter-block .filter-label');

    readonly facetsWrapper: Locator = this.baseLocator.locator('#search_filters_wrapper');

    readonly clearAllFiltersButton: Locator = this.baseLocator.getByRole('button', { name: 'Clear all' });
}
