import React from 'react';
import useSWR from 'swr';

import {useUser} from '../auth.js';
import {API} from '../parameters.js';
import {CurrencyFormatter} from '../utils.js';
import {BigModal} from '../libs/modal.js';

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

const CartModal = function ({cart}) {
    return (
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title">Cart</h5>
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <pre>{JSON.stringify(cart, null, 4)}</pre>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-danger">
                    TODO SOMETHING
                </button>
            </div>
        </React.Fragment>
    );
};

export const CartButton = function (props) {
    const {data: user} = useUser();
    const {data: cart} = useCart(user);
    const [modalOpened, setModalOpened] = React.useState(false);

    if (cart === undefined || cart === null) return null;

    const onCart = function (e) {
        e.preventDefault();
        setModalOpened(true);
    };

    return (
        <React.Fragment>
            <BigModal opened={modalOpened} setOpened={setModalOpened}>
                <CartModal cart={cart} />
            </BigModal>
            <a className="nav-link" href="#">
                <button type="button" className="btn btn-light" onClick={onCart}>
                    Cart <i className="bi bi-cart4"></i> <sub>{CurrencyFormatter.format(cart.total)}</sub>
                </button>
            </a>
        </React.Fragment>
    );
};
