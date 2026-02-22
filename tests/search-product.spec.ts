import { expect } from "@playwright/test";
import { test } from '../fixture';
import { products } from '../data/products';
import { requireEnv } from "../support";
import { Tags } from "../enums/tags";

test.describe('Search Product', () => {
    test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });
    test('[E2E-SRCH-001] show all products containing the search query in the dropdown', { tag: [Tags.Smoke, Tags.Regression] }, async ({ page, homePage }) => {

        const productName = products.hummingbirdTshirt.title.split(' ')[0];

        await homePage.navigateTo();
        await homePage.header.fillSearchInput(productName, page);

        const dropdown = homePage.getSearchDropdown();
        await expect(dropdown).toBeVisible();

        const allProductsInDropdown = homePage.getSearchDropdownItems();
        const count = await allProductsInDropdown.count();
        for (let i = 0; i < count; i++) {
            await expect(allProductsInDropdown.nth(i)).toContainText(productName);
        }
    });

    test('[E2E-SRCH-002] show all products containing the search query on the search results page', { tag: [Tags.Smoke, Tags.Regression] }, async ({ page, homePage, searchResultsPage }) => {

        const productName = products.hummingbirdTshirt.title.split(' ')[0];

        await homePage.navigateTo();
        await homePage.header.fillSearchInput(productName, page);
        await homePage.header.pressEnter();

        const countOfProductsInSearchResults = await searchResultsPage.getProductItem().count();
        for (let i = 0; i < countOfProductsInSearchResults; i++) {
            await expect(searchResultsPage.getProductItem().nth(i)).toContainText(productName);
        }
    });

    test('[E2E-SRCH-003] search existing product by name and click on it', { tag: [Tags.Regression] }, async ({ page, homePage, productDetailsPage }) => {
        const productName = products.hummingbirdTshirt.title;

        await homePage.navigateTo();
        await homePage.header.fillSearchInput(productName, page);

        const dropdown = homePage.getSearchDropdown();
        await expect(dropdown).toBeVisible();

        const allProducts = homePage.getSearchDropdownItems();
        await allProducts.nth(0).click();

        const actualProductName = productDetailsPage.productContainer.getProductName();
        expect(actualProductName).toContainText(productName);
    });


    test('[E2E-SRCH-004] search non-existing product by name', { tag: [Tags.Regression] }, async ({ page, homePage, searchResultsPage }) => {
        const nonExistingProductName = 'Lorem ipsum dolor sit amet';
        const expectedNoResultsMessage = 'No matches were found for your search';

        await homePage.navigateTo();
        await homePage.header.fillSearchInput(nonExistingProductName, page);
        await homePage.header.pressEnter();

        const noResults = await searchResultsPage.getNoResultsMessage();
        expect(noResults).toContain(expectedNoResultsMessage);
    });
});



