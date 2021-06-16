import useSWR from 'swr';

import {useUser} from './auth';
import {API} from './parameters';

const useShippingFees = function () {
    const res = useSWR(`${API}/utils/shipping-fees`, {dedupingInterval: 60000});
    if (res.data !== undefined)
        return {
            ...res,
            data: res.data.reduce(function (acc, item) {
                const elem = {
                    cash: item.cash,
                    city: item.city,
                    country: item.country,
                    dropship: item.dropship,
                    rows: item.rows,
                };
                return {
                    ...acc,
                    [item.corriere]: acc[item.corriere] === undefined ? [elem] : [...acc[item.corriere], elem],
                };
            }, {}),
        };
    return res;
};

const CartUtils = (function () {
    const evalShippingCost = function (cart) {
        const weight = cart.items.reduce(function (acc, item) {
            return acc + item.peso;
        }, 0);
        return cart.shipping_cost;
    };

    return {
        evalTotal: function (cart) {
            const sum = cart.items
                .map(function (item) {
                    const res = item.prezzo * item.qta;
                    return res + (res * item.tax_value) / 100;
                })
                .reduce(function (acc, item) {
                    return acc + item;
                }, 0);
            const shippingCost = evalShippingCost(cart);
            return sum + shippingCost + (shippingCost * cart.tax_value) / 100;
        },
    };
})();

const reducer = function (cart, action) {
    const {type, value} = action;
    if (type === 'PUT_PRODUCT') {
        const newCart = {
            ...cart,
            items: cart.items.map(function (item) {
                return item.id === value.id ? {...item, qta: value.qta} : item;
            }),
        };
        newCart.total = CartUtils.evalTotal(newCart);
        return newCart;
    }
    throw new Error('Cart operation not implemented!');
};

const Fetch = {
    putProduct: async function (user, cartId, action) {
        const resource = await fetch(`//${API}/order/cart/${cartId}?jwt=${user.jwt}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action),
        });
        return resource.json();
    },
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
            return carts.length > 0 ? carts[0] : {total: 0, items: []};
        },
        {dedupingInterval: 60000}
    );

    const data = shippingFees === undefined ? undefined : cart;
    if (shippingFees !== undefined) console.log(shippingFees);

    return {
        data,
        error,
        Methods: {
            add: async function (item, qty) {
                const action = {type: 'PUT_PRODUCT', value: {id: item.id, qta: qty}};
                await mutate(reducer(data, action), false);
                return mutate(Fetch.putProduct(user, data.id, action), false);
            },
        },
    };
};
