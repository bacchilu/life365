import React from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';

import {API} from './parameters.js';

const toslug = function (t) {
    return t
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const useTree = function (id) {
    const [data, setData] = React.useState(null);
    React.useEffect(
        async function () {
            const response = await fetch(`//${API}/warehouse/tree/${id}`);
            setData(await response.json());
        },
        [id]
    );

    return data;
};

export const TreeMenu = function ({id}) {
    const match = useRouteMatch();
    const data = useTree(id);

    if (data === null) return null;
    const items = data.map(function (item) {
        const items = item.children.map(function (item) {
            return (
                <NavLink
                    key={item.id}
                    to={`${match.url}/${toslug(item.name.en)}-${item.id}`}
                    activeClassName="active"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                >
                    {item.name.en}
                </NavLink>
            );
        });

        return (
            <div key={item.id} className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse_${item.id}`}
                        aria-controls={`collapse_${item.id}`}
                    >
                        {item.name.en}
                    </button>
                </h2>
                <div id={`collapse_${item.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionTree">
                    <div className="accordion-body">
                        <div className="list-group list-group-flush">{items}</div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className="accordion" id="accordionTree">
            {items}
        </div>
    );
};
