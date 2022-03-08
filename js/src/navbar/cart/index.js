import React from 'react';

import {CurrencyFormatter} from '../../utils';
import {BigModal} from '../../libs/modal';
import {useCart} from '../../cart';
import {Table} from './table';

const CartModal = function (props) {
    const {data: cart} = useCart();

    return (
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title">Cart</h5>
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="table-responsive">
                    <Table cart={cart} />
                </div>
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
    const {data: cart} = useCart();
    const [modalOpened, setModalOpened] = React.useState(false);

    if (cart === undefined || cart === null) return null;

    const onCart = function (e) {
        e.preventDefault();
        setModalOpened(true);
    };

    return (
        <React.Fragment>
            <BigModal opened={modalOpened} setOpened={setModalOpened}>
                <CartModal />
            </BigModal>
            <a className="nav-link" href="#">
                <button type="button" className="btn btn-light" onClick={onCart}>
                    Cart <i className="bi bi-cart4"></i> <sub>{CurrencyFormatter.format(cart.total)}</sub>
                </button>
            </a>
        </React.Fragment>
    );
};
