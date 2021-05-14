import React from 'react';

import {useCart} from '../navbar/cart.js';
import {CurrencyFormatter} from '../utils.js';
import {AddCartForm} from './add_cart_form.js';

const Price = function ({value}) {
    return (
        <strong>
            <em>{value === null ? null : CurrencyFormatter.format(value.price)}</em>
        </strong>
    );
};

const ProductRowNotAuthenticated = function ({item}) {
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

export const ProductRow = function ({item}) {
    const {data: cart} = useCart();

    if (cart === undefined || cart === null) return <ProductRowNotAuthenticated item={item} />;

    const cartProduct = cart.items.find(function (e) {
        return e.id === item.id;
    });

    return (
        <div className={`card mb-1 ${cartProduct !== undefined ? 'border-dark' : ''}`}>
            <div className="row g-0">
                <div className="col-md-2 text-center align-middle">
                    <img src={item.photos[0]} className="img-fluid" style={{maxHeight: '100px'}} />
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md">
                                <h5 className="card-title">{item.code_simple}</h5>
                            </div>
                            <div className="col-md">
                                <AddCartForm item={item} />
                            </div>
                        </div>
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
