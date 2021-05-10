import React from 'react';

import {useUser} from '../auth.js';
import {useCart} from '../navbar/cart.js';
import {CurrencyFormatter} from '../utils.js';

const Price = function ({value}) {
    return (
        <strong>
            <em>{value === null ? null : CurrencyFormatter.format(value.price)}</em>
        </strong>
    );
};

export const ProductRow = function ({item}) {
    const {data: user} = useUser();
    const {data: cart} = useCart(user);

    return (
        <div className="card mb-1">
            <div className="row g-0">
                <div className="col-md-2 text-center align-middle">
                    <img src={item.photos[0]} className="img-fluid" style={{maxHeight: '100px'}} />
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{item.code_simple}</h5>
                        <p className="card-text">{item.title.en}</p>
                        <p className="card-text">
                            {(item.stock === 0 && <small className="text-danger">not available</small>) || (
                                <small className="text-muted">{item.stock} available</small>
                            )}
                            <span className="float-end">
                                <Price value={item.price} />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
