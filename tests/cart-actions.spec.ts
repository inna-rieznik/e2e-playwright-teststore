//TODO move to separate file

import { expect } from "@playwright/test";
import { products } from "../data/products";
import { test } from "../fixture";
import { requireEnv } from "../support";
import { Tags } from "../enums/tags";

test.describe('Cart Actions', () => {
    test.use({ userToLogin: { email: requireEnv('EMAIL'), password: requireEnv('PASSWORD') } });

    test('[E2E-CART-001] increment items count in the cart',
        { tag: [Tags.Smoke, Tags.Regression] }, async ({
            addProductToTheCart,
            shoppingCartPage,
        }) => {

        const productTitle = products.hummingbirdTshirt.title;
        const productId = products.hummingbirdTshirt.id;
        const quantity = 3;
        const countToIncrement = 4;

        await test.step(`Add product to the cart using API`, async () => {
            const response = await addProductToTheCart({ productId, quantity });
            expect(response.status()).toBe(200);
        });

        await test.step(`Check initial product items count in the cart`, async () => {
            await shoppingCartPage.navigateTo();
            const countOfProducts = shoppingCartPage.getCountOfProducts();
            await expect(countOfProducts).toContainText(quantity.toString());
        });

        await test.step(`Increment product items count in the cart`, async () => {
            await shoppingCartPage.getProductCartItem(productTitle).clickIncrementQuantity(countToIncrement);
            await shoppingCartPage.waitForNetworkIdle();
        });

        await test.step(`Check product items count in the cart after increment`, async () => {
            const countOfProductsAfterIncrement = shoppingCartPage.getCountOfProducts();
            await expect(countOfProductsAfterIncrement).toContainText((quantity + countToIncrement).toString());
        });
    });

    test('[E2E-CART-002] decrement items count in the cart',
        { tag: [Tags.Smoke, Tags.Regression] }, async ({
            addProductToTheCart,
            shoppingCartPage,
        }) => {
        const productTitle = products.hummingbirdTshirt.title;
        const productId = products.hummingbirdTshirt.id;
        const quantity = 3;
        const countToDecrement = 2;

        await test.step(`Add product to the cart using API`, async () => {
            const response = await addProductToTheCart({ productId, quantity });
            expect(response.status()).toBe(200);
        });

        await test.step(`Check initial product items count in the cart`, async () => {
            await shoppingCartPage.navigateTo();
            const countOfProducts = shoppingCartPage.getCountOfProducts();
            await expect(countOfProducts).toContainText(quantity.toString());
        });

        await test.step(`Decrement product items count in the cart`, async () => {
            await shoppingCartPage.getProductCartItem(productTitle).clickDecrementQuantity(countToDecrement);
            await shoppingCartPage.waitForNetworkIdle();
        });

        await test.step(`Check product items count in the cart after decrement`, async () => {
            const countOfProductsAfterDecrement = shoppingCartPage.getCountOfProducts();
            await expect(countOfProductsAfterDecrement).toContainText((quantity - countToDecrement).toString());
        });
    });

    test('[E2E-CART-003] delete item from cart', { tag: [Tags.Smoke, Tags.Regression] }, async ({
        addProductToTheCart,
        shoppingCartPage,
    }) => {
        const productTitle = products.hummingbirdTshirt.title;
        const productId = products.hummingbirdTshirt.id;
        const quantity = 5;

        await test.step(`Add product to the cart using API`, async () => {
            const response = await addProductToTheCart({ productId, quantity });
            expect(response.status()).toBe(200);
        });

        await test.step(`Check initial product items count in the cart`, async () => {
            await shoppingCartPage.navigateTo();
            const countOfProducts = shoppingCartPage.getCountOfProducts();
            await expect(countOfProducts).toContainText(quantity.toString());
        });

        await test.step(`Delete product from the cart`, async () => {
            await shoppingCartPage.getProductCartItem(productTitle).clickDeleteButton();
            await shoppingCartPage.waitForNetworkIdle();
        });

        await test.step(`Check product items count in the cart is 0 after deletion`, async () => {
            const countOfProductsAfterDeletion = shoppingCartPage.getCountOfProducts();
            await expect(countOfProductsAfterDeletion).toContainText('0');
        });
    });

    test('[E2E-CART-004] calculate total price for all products', { tag: [Tags.Smoke, Tags.Regression] }, async ({
        addProductToTheCart,
        shoppingCartPage
    }) => {
        const product1Id = products.hummingbirdTshirt.id;
        const quantity1 = 5;
        const product1TotalPrice = products.hummingbirdTshirt.price * quantity1 * (1 - products.hummingbirdTshirt.discount / 100);

        const product2Id = products.mugGoodDay.id;
        const quantity2 = 3;
        const product2TotalPrice = products.mugGoodDay.price * quantity2 * (1 - products.mugGoodDay.discount / 100);

        await test.step(`Add product to the cart using API`, async () => {
            const response1 = await addProductToTheCart({ productId: product1Id, quantity: quantity1 });
            expect(response1.status()).toBe(200);

            const response2 = await addProductToTheCart({ productId: product2Id, quantity: quantity2 });
            expect(response2.status()).toBe(200);
        });


        await test.step(`Check initial product items count in the cart`, async () => {
            await shoppingCartPage.navigateTo();
            const countOfProducts = shoppingCartPage.getCountOfProducts();
            await expect(countOfProducts).toContainText((quantity1 + quantity2).toString());
        });

        await test.step(`Check total price for all products`, async () => {
            const totalPriceForAllProducts = product1TotalPrice + product2TotalPrice;
            const totalPriceForAllProductsInCart = shoppingCartPage.getTotalPriceTaxIncluded();
            await expect(totalPriceForAllProductsInCart).toContainText(totalPriceForAllProducts.toString());
        });
    });

    test('[E2E-CART-005] fill checkout form and place order', { tag: [Tags.Regression] }, async ({ addProductToTheCart, shoppingCartPage, checkoutPage }) => {

        const productId = products.posterBestIsYetToCome.id;
        const quantity = 3;
        const userName = 'Test User';

        await test.step(`Add product to the cart using API`, async () => {
            const response = await addProductToTheCart({ productId, quantity });
            expect(response.status()).toBe(200);
        });

        await test.step(`Proceed to checkout`, async () => {
            await shoppingCartPage.navigateTo();
            await shoppingCartPage.clickProceedToCheckoutButton();
        });

        await test.step(`Check filled personal info`, async () => {
            const filledInfo = checkoutPage.addressSection.getFilledPersonalInfo();
            await expect(filledInfo).toContainText(userName);
        });

        await test.step(`Proceed to payment method selection`, async () => {
            await checkoutPage.addressSection.clickContinueButton();
            await checkoutPage.shippingSection.checkCheckboxByTitle('My carrier');
            await checkoutPage.shippingSection.clickContinueButton();
        });
    });
});
