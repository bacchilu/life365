import React from 'react';

import {CurrencyFormatter, PercentFormatter} from '../../../utils';
import {useCart} from '../../../cart';

const QtyEditForm = function ({item, done}) {
    const {Methods} = useCart();
    const inputEl = React.useRef(null);
    React.useEffect(function () {
        inputEl.current.select();
    }, []);
    const [value, setValue] = React.useState(item.qta.toString());

    const onChange = function (e) {
        setValue(e.target.value);
    };
    const onSubmit = function (e) {
        e.preventDefault();
        const v = parseInt(value);
        if (isNaN(v)) return;
        Methods.add(item, v);
        done();
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                ref={inputEl}
                type="number"
                min="0"
                max={item.stock}
                step="1"
                className="form-control"
                value={value}
                onChange={onChange}
                onBlur={done}
            />
        </form>
    );
};

const QtyCol = function ({item}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const onClick = function () {
        setIsEditing(true);
    };

    return isEditing ? (
        <QtyEditForm item={item} done={() => setIsEditing(false)} />
    ) : (
        <button className="btn btn-link" onClick={onClick} disabled={item.virtual}>
            {item.qta}
        </button>
    );
};

export const Row = function ({item}) {
    return (
        <tr style={{verticalAlign: 'middle'}}>
            <td align="center" style={{width: '100px', height: '100px'}}>
                <div>
                    {item.photos !== undefined && (
                        <img src={item.photos[0]} style={{maxWidth: '100%', maxHeight: '100%'}} />
                    )}
                </div>
            </td>
            <th scope="row">{item.Codicesenza}</th>
            <td>
                <QtyCol item={item} />
            </td>
            <td>
                <em>{CurrencyFormatter.format(item.prezzo)}</em>
            </td>
            <td>
                <em>{CurrencyFormatter.format(item.prezzo * item.qta)}</em>
            </td>
            <td>{PercentFormatter.format(item.tax_value / 100)}</td>
        </tr>
    );
};
