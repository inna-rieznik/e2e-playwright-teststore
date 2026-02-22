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
        const countToIncrement = 3;

        const response = await addProductToTheCart({ productId, quantity });
        expect(response.status()).toBe(200);

        await shoppingCartPage.navigateTo();
        const countOfProducts = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProducts).toContain(quantity.toString());

        await shoppingCartPage.getProductCartItem(productTitle).clickIncrementQuantity(countToIncrement);
        await shoppingCartPage.waitForNetworkIdle();

        const countOfProductsAfterIncrement = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProductsAfterIncrement).toContain((quantity + countToIncrement).toString());
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

        const response = await addProductToTheCart({ productId, quantity });
        expect(response.status()).toBe(200);

        await shoppingCartPage.navigateTo();
        const countOfProducts = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProducts).toContain(quantity.toString());

        await shoppingCartPage.getProductCartItem(productTitle).clickDecrementQuantity(countToDecrement);
        await shoppingCartPage.waitForNetworkIdle();

        const countOfProductsAfterDecrement = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProductsAfterDecrement).toContain((quantity - countToDecrement).toString());
    });

    test('[E2E-CART-003] delete item from cart', { tag: [Tags.Smoke, Tags.Regression] }, async ({
        addProductToTheCart,
        shoppingCartPage,
    }) => {
        const productTitle = products.hummingbirdTshirt.title;
        const productId = products.hummingbirdTshirt.id;
        const quantity = 5;
        const response = await addProductToTheCart({ productId, quantity });
        expect(response.status()).toBe(200);

        await shoppingCartPage.navigateTo();
        const countOfProducts = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProducts).toContain(quantity.toString());

        await shoppingCartPage.getProductCartItem(productTitle).clickDeleteButton();
        await shoppingCartPage.waitForNetworkIdle();

        const countOfProductsAfterDeletion = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProductsAfterDeletion).toContain('0');
    });

    //TODO FIX ME - problem with 2 requests in a row
    test('[E2E-CART-004] Should correctly calculate total price for all products', { tag: [Tags.Smoke, Tags.Regression] }, async ({
        addProductToTheCart,
        shoppingCartPage
    }) => {
        const product1Id = products.hummingbirdTshirt.id;
        const quantity1 = 5;
        const product1TotalPrice = products.hummingbirdTshirt.price * quantity1 * (1 - products.hummingbirdTshirt.discount / 100);

        const product2Id = products.mugGoodDay.id;
        const quantity2 = 3;
        const product2TotalPrice = products.mugGoodDay.price * quantity2 * (1 - products.mugGoodDay.discount / 100);

        const response1 = await addProductToTheCart({ productId: product1Id, quantity: quantity1 });
        expect(response1.status()).toBe(200);

        const response2 = await addProductToTheCart({ productId: product2Id, quantity: quantity2 });
        expect(response2.status()).toBe(200);

        await shoppingCartPage.navigateTo();
        const countOfProducts = await shoppingCartPage.getCountOfProducts().textContent();
        expect(countOfProducts).toContain((quantity1 + quantity2).toString());

        const totalPriceForAllProducts = product1TotalPrice + product2TotalPrice;
        const totalPriceForAllProductsInCart = await shoppingCartPage.getTotalPriceTaxIncluded().textContent();
        expect(totalPriceForAllProductsInCart).toContain(totalPriceForAllProducts.toString());




    });

});
