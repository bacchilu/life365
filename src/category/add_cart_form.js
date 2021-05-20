import React from 'react';

import {useCart} from '../cart.js';

const evalQty = function (qty, cartQty) {
    const res = parseInt(qty);
    if (isNaN(res)) return cartQty === 0 ? 1 : 0;
    return res;
};

export const AddCartForm = function ({item}) {
    const {data: cart, Methods} = useCart();

    const cartProduct = cart.items.find(function (e) {
        return e.id === item.id;
    });
    const cartQty = cartProduct === undefined ? 0 : cartProduct.qta;

    const [qty, setQty] = React.useState(cartQty === 0 ? '' : cartQty.toString());
    React.useEffect(
        function () {
            setQty(cartQty === 0 ? '' : cartQty.toString());
        },
        [cartQty]
    );

    const onChange = function (e) {
        setQty(e.target.value);
    };

    const addToCart = function (e) {
        e.preventDefault();
        Methods.add(item, evalQty(qty, cartQty));
    };

    return (
        <form onSubmit={addToCart}>
            <fieldset className="row g-3 float-end" disabled={item.stock === 0}>
                <div className="col-auto">
                    <input
                        type="number"
                        min="0"
                        max={item.stock}
                        step="1"
                        className="form-control form-control-sm"
                        value={qty}
                        onChange={onChange}
                    />
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
