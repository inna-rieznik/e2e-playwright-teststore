import { Locator } from "@playwright/test";
import BasePage from "../Base/BasePage";
import AccessoriesPageLocators from "./AccessoriesPageLocators";
import { FilterFacet } from "../../../types/productTypes";

export default class AccessoriesPage extends BasePage {
    readonly locators: AccessoriesPageLocators = new AccessoriesPageLocators(this.page.locator('body'));


    async navigateTo(): Promise<void> {
        await this.page.goto('/index.php?id_category=6&controller=category');
    }

    async navigateToWithFilter({ facet, facetGroupName }: FilterFacet): Promise<void> {
        const transformedFacet = facet.replace(' ', '+');
        await this.page.goto(`/index.php?id_category=6&controller=category&q=${facetGroupName}-${transformedFacet}&from-xhr`);
    }

    getFacetsWrapper(): Locator {
        return this.locators.facetsWrapper;
    }

    getFacet(title: string): Locator {
        return this.locators.facetsWrapper.getByLabel(title);
    }

    async checkFacet(title: string): Promise<void> {
        await this.getFacet(title).check();
    }

    async uncheckFacet(title: string): Promise<void> {
        await this.getFacet(title).uncheck();
    }

    getProductItem(): Locator {
        return this.page.locator('article.product-miniature');
    }

    async clickClearAllFiltersButton(): Promise<void> {
        await this.locators.clearAllFiltersButton.click();
    }
}
