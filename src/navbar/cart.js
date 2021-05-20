import React from 'react';

import {CurrencyFormatter, PercentFormatter} from '../utils.js';
import {BigModal} from '../libs/modal.js';
import {useCart} from '../cart.js';

const CartModal = function (props) {
    const {data: cart} = useCart();

    const rows = cart.items.map(function (item) {
        return (
            <tr key={item.id} style={{verticalAlign: 'middle'}}>
                <td align="center" style={{width: '100px', height: '100px'}}>
                    <div>
                        <img src={item.photos[0]} style={{maxWidth: '100%', maxHeight: '100%'}} />
                    </div>
                </td>
                <th scope="row">{item.Codicesenza}</th>
                <td>{item.qta}</td>
                <td>
                    <em>{CurrencyFormatter.format(item.prezzo)}</em>
                </td>
                <td>
                    <em>{CurrencyFormatter.format(item.prezzo * item.qta)}</em>
                </td>
                <td>{PercentFormatter.format(item.tax_value / 100)}</td>
            </tr>
        );
    });

    return (
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title">Cart</h5>
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">#</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total</th>
                            <th scope="col">Tax</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
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
