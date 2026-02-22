import { Tags } from "../enums/tags";
import { test } from "../fixture";
import { requireEnv } from "../support";
import { expect } from "@playwright/test";

test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });

test.describe('Filter products', () => {
    test('[E2E-FLTR-001] check only 1 facet at a time', { tag: [Tags.Smoke, Tags.Regression] }, async ({ accessoriesPage }) => {

        await accessoriesPage.navigateTo();
        const checkedFacet = accessoriesPage.getFacet('Home accessories');
        await accessoriesPage.checkFacet('Home accessories');
        expect(await checkedFacet.isChecked()).toBeTruthy();

        const productItemsCount = await accessoriesPage.getProductItem().count();
        expect(productItemsCount).toBeGreaterThan(3);
        expect(productItemsCount).toBeLessThan(15);
    });


    test('[E2E-FLTR-002] check 2 facets at a time', { tag: [Tags.Smoke, Tags.Regression] }, async ({ accessoriesPage }) => {
        await accessoriesPage.navigateTo();
        const facets = ['Home accessories', 'Black'];
        for (const facet of facets) {
            const checkedFacet = accessoriesPage.getFacet(facet);
            await accessoriesPage.checkFacet(facet);
            expect(await checkedFacet.isChecked()).toBeTruthy();

        }
        await accessoriesPage.waitForNetworkIdle();

        const productItemsCount = await accessoriesPage.getProductItem().count();
        expect(productItemsCount).toBeGreaterThan(1);
        expect(productItemsCount).toBeLessThan(5);
    });

    test('[E2E-FLTR-003] clear all filters', { tag: [Tags.Smoke, Tags.Regression] }, async ({ accessoriesPage }) => {
        await accessoriesPage.navigateToWithFilter({ facet: 'Home accessories', facetGroupName: 'Categories' });

        const productItemsCount = await accessoriesPage.getProductItem().count();
        expect(productItemsCount).toBeLessThan(10);

        await accessoriesPage.clickClearAllFiltersButton();
        await accessoriesPage.waitForNetworkIdle();

        const productItemsCountAfterClear = await accessoriesPage.getProductItem().count();
        expect(productItemsCountAfterClear).toBeGreaterThan(10);
    });
});


