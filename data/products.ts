export interface Product {
    title: string;
    price: number;
    discount: number;
}

export const products = {
    hummingbirdTshirt: {
        title: 'Hummingbird printed t-shirt',
        id: 1,
        price: 23.9,
        discount: 20,
    },
    hummingbirdSweater: {
        title: 'Hummingbird printed sweater',
        id: 2,
        price: 35.9,
        discount: 20,
    },
    posterBestIsYetToCome: {
        title: 'The best is yet to come\'...',
        id: 3,
        price: 29,
        discount: 20,
    },
    posterAdventureBegins: {
        title: 'The adventure begins Framed...',
        id: 4,
        price: 29,
        discount: 20,
    },
    mugGoodDay: {
        title: 'Mug Today is a good day',
        id: 5,
        price: 11.9,
        discount: 0,
    },
};
