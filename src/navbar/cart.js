import React from 'react';
import useSWR from 'swr';

import {useUser} from '../auth.js';
import {API} from '../parameters.js';
import {CurrencyFormatter} from '../utils.js';

const useCart = function (user) {
    return useSWR(
        function () {
            return `//${API}/order/cart?jwt=${user.jwt}`;
        },
        async function (key) {
            const res = await fetch(key);
            const carts = await res.json();
            return carts.length > 0 ? carts[0] : {total: 0};
        }
    );
};

export const CartButton = function (props) {
    const {data: user} = useUser();
    const {data: cart} = useCart(user);

    if (cart === undefined || cart === null) return null;

    const onCart = function (e) {
        e.preventDefault();
        console.log(cart);
    };

    return (
        <a className="nav-link" href="#">
            <button type="button" className="btn btn-light" onClick={onCart}>
                Cart <i className="bi bi-cart4"></i> <sub>{CurrencyFormatter.format(cart.total)}</sub>
            </button>
        </a>
    );
};
