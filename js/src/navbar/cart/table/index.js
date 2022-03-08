import React from 'react';

import {CurrencyFormatter} from '../../../utils';
import {Row} from './row';

export const Table = function ({cart}) {
    const rows = cart.items.map(function (item) {
        return <Row key={item.id} item={item} />;
    });
    const totalWithoutTax = cart.items.reduce(function (acc, item) {
        return acc + item.prezzo * item.qta;
    }, 0);
    const totalTaxes = cart.items.reduce(function (acc, item) {
        return acc + (item.prezzo * item.qta * item.tax_value) / 100;
    }, 0);

    return (
        <table className="table table-hover">
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
            <tfoot>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">
                        <em>{CurrencyFormatter.format(totalWithoutTax)}</em>
                    </th>
                    <th scope="col" className="text-danger">
                        <em>{CurrencyFormatter.format(totalTaxes)}</em>
                    </th>
                </tr>
                <tr>
                    <td colSpan="6">
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">🚚</th>
                                    <th scope="col">TOTALE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <em>{CurrencyFormatter.format(cart.shipping_cost)}</em>
                                    </td>
                                    <td className="fs-1">
                                        <em>{CurrencyFormatter.format(cart.total)}</em>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};
