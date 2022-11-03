import useSWR from 'swr';

import {useUser} from '../auth';
import {API} from '../parameters';
import {Fetch} from './fetch';
import {CartUtils} from './utils';

const useShippingFees = function () {
    const res = useSWR(
        `${API}/utils/shipping-fees`,
        async function (url) {
            return (await fetch(url)).json();
        },
        {dedupingInterval: 60000}
    );
    if (res.data !== undefined) {
        const data = res.data.reduce(function (acc, item) {
            const courier = item.corriere;
            const elem = {
                cash: item.cash,
                city: item.city,
                country: item.country,
                dropship: item.dropship,
                rows: item.rows,
            };
            return {...acc, [courier]: acc[courier] === undefined ? [elem] : [...acc[courier], elem]};
        }, {});
        const data2 = {};
        for (const [key, value] of Object.entries(data))
            data2[key] = value.reduce(function (acc, item) {
                const country = item.country;
                const elem = {cash: item.cash, city: item.city, dropship: item.dropship, rows: item.rows};
                return {...acc, [country]: acc[country] === undefined ? [elem] : [...acc[country], elem]};
            }, {});
        return {...res, data: data2};
    }
    return res;
};

const reducer = function (cart, shippingFees, action) {
    console.assert(cart !== undefined);
    console.assert(shippingFees !== undefined);
    const {type, value} = action;
    if (type === 'PUT_PRODUCT') {
        const newCart = {
            ...cart,
            items: cart.items.map(function (item) {
                const singleWeight = item.peso / item.qta;
                const euristicWeight = singleWeight * value.qta;
                return item.id === value.id ? {...item, qta: value.qta, peso: euristicWeight} : item;
            }),
        };
        newCart.shipping_cost = CartUtils.evalShippingCost(newCart, shippingFees);
        newCart.total = CartUtils.evalTotal(newCart, shippingFees);
        return newCart;
    }
    throw new Error('Cart operation not implemented!');
};

export const useCart = function () {
    const {data: user} = useUser();
    const {data: shippingFees} = useShippingFees();
    const {
        data: cart,
        error,
        mutate,
    } = useSWR(
        function () {
            if (user === undefined) return 'LOADING_CART';
            if (user === null) return 'NULL_CART';
            return `${API}/order/cart?jwt=${user.jwt}`;
        },
        async function (key) {
            if (key === 'LOADING_CART') return undefined;
            if (key === 'NULL_CART') return null;
            const res = await fetch(key);
            const carts = await res.json();
            return carts.length > 0 ? carts[0] : {total: 0, items: [], empty: true};
        },
        {dedupingInterval: 60000}
    );

    const data = shippingFees === undefined ? undefined : cart;

    return {
        data,
        error,
        Methods: {
            add: async function (item, qty) {
                const action = {type: 'PUT_PRODUCT', value: {id: item.id, qta: qty}};
                await mutate(reducer(data, shippingFees, action), false);
                return mutate(Fetch.putProduct(user, data.id, action), false);
            },
        },
    };
};
