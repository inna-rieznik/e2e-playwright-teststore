import { test } from "../fixture";
import { requireEnv } from "../support";
import { expect } from "@playwright/test";

test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });

test.describe('Filter products', () => {
    test('[E2E-FLTR-001] should check only one facet at a time', async ({ accessoriesPage }) => {

        await accessoriesPage.navigateTo();
        const checkedFacet = accessoriesPage.getFacet('Home accessories');
        await accessoriesPage.checkFacet('Home accessories');
        expect(await checkedFacet.isChecked()).toBeTruthy();

        const productItemsCount = await accessoriesPage.getProductItem().count();
        expect(productItemsCount).toBeGreaterThan(3);
        expect(productItemsCount).toBeLessThan(15);
    });


    test('[E2E-FLTR-002] should check 2 facets at a time', async ({ accessoriesPage }) => {
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

    test('[E2E-FLTR-003] should clear all filters', async ({ accessoriesPage }) => {

        await accessoriesPage.navigateTo();

        //re wright with api request
        const checkedFacet = accessoriesPage.getFacet('Home accessories');
        await accessoriesPage.checkFacet('Home accessories');
        expect(await checkedFacet.isChecked()).toBeTruthy();

        const productItemsCount = await accessoriesPage.getProductItem().count();
        expect(productItemsCount).toBeGreaterThan(10);

        await accessoriesPage.clickClearAllFiltersButton();

    });
});


