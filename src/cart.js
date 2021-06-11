import useSWR from 'swr';

import {useUser} from './auth';
import {API} from './parameters';

const evalEuristicTotal = function (cart) {
    const sum = cart.items
        .map(function (item) {
            const res = item.prezzo * item.qta;
            return res + (res * item.tax_value) / 100;
        })
        .reduce(function (acc, item) {
            return acc + item;
        }, 0);
    return sum + cart.shipping_cost + (cart.shipping_cost * cart.tax_value) / 100;
};

const reducer = function (cart, action) {
    const {type, value} = action;
    if (type === 'PUT_PRODUCT') {
        const newCart = {
            ...cart,
            items: cart.items.map(function (item) {
                return item.id === value.id ? {...item, qta: value.qta} : item;
            }),
        };
        newCart.total = evalEuristicTotal(newCart);
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
    const {data, error, mutate} = useSWR(
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
