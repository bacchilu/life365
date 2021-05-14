import React from 'react';

import {useCart} from '../navbar/cart.js';

export const AddCartForm = function ({item}) {
    const {data: cart, Methods} = useCart();

    const cartProduct = cart.items.find(function (e) {
        return e.id === item.id;
    });

    const addToCart = function (e) {
        e.preventDefault();
        Methods.add(item);
    };

    return (
        <form onSubmit={addToCart}>
            <fieldset className="row g-3 float-end" disabled={item.stock === 0}>
                <div className="col-auto">{cartProduct !== undefined && <em>{cartProduct.qta}</em>}</div>
                <div className="col-auto">
                    <input type="number" min="0" max={item.stock} step="1" className="form-control form-control-sm" />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary btn-sm">
                        <i className="bi bi-cloud-plus"></i>
                    </button>
                </div>
            </fieldset>
        </form>
    );
};
