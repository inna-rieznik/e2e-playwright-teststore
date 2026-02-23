import { Tags } from "../enums/tags";
import { test } from "../fixture";
import { requireEnv } from "../support";
import { expect } from "@playwright/test";

test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });

test.describe('Filter products', () => {
    test('[E2E-FLTR-001] check only 1 facet at a time', { tag: [Tags.Smoke, Tags.Regression] }, async ({ accessoriesPage }) => {
        const facet = 'Home accessories';

        await test.step(`Check facet`, async () => {
            await accessoriesPage.navigateTo();
            const checkedFacet = accessoriesPage.getFacet(facet);
            await accessoriesPage.checkFacet(facet);
            expect(await checkedFacet.isChecked()).toBeTruthy();
        });

        await test.step(`Check product items count for checked facet`, async () => {
            const productItemsCount = await accessoriesPage.getProductItem().count();
            expect(productItemsCount).toBeGreaterThan(3); //not the best solution, i know :)
            expect(productItemsCount).toBeLessThan(15);
        });
    });


    test('[E2E-FLTR-002] check 2 facets at a time', { tag: [Tags.Smoke, Tags.Regression] }, async ({ accessoriesPage }) => {
        const facets = ['Home accessories', 'Black'];
        await test.step(`Check 2 facets`, async () => {
            await accessoriesPage.navigateTo();
            for (const facet of facets) {
                const checkedFacet = accessoriesPage.getFacet(facet);
                await accessoriesPage.checkFacet(facet);
                expect(await checkedFacet.isChecked()).toBeTruthy();
            }
        });

        await test.step(`Check product items count for checked facets`, async () => {
            const productItemsCount = await accessoriesPage.getProductItem().count();
            expect(productItemsCount).toBeGreaterThan(1);
            expect(productItemsCount).toBeLessThan(5);
        });
    });

    test('[E2E-FLTR-003] clear all filters', { tag: [Tags.Smoke, Tags.Regression] }, async ({ accessoriesPage }) => {
        await test.step(`Navigate to the Accessories page with checked facets`, async () => {
            await accessoriesPage.navigateToWithFilter({ facet: 'Home accessories', facetGroupName: 'Categories' });

            const productItemsCount = await accessoriesPage.getProductItem().count();
            expect(productItemsCount).toBeLessThan(10);
        });

        await test.step(`Click Clear all filters `, async () => {
            await accessoriesPage.clickClearAllFiltersButton();
        });

        await test.step(`Check product items count after clear all filters is bigger than before`, async () => {
            const productItemsCountAfterClear = await accessoriesPage.getProductItem().count();
            expect(productItemsCountAfterClear).toBeGreaterThan(10);
        });
    });
});


