import React from 'react';

import {API} from './parameters.js';

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
    const data = useTree(id);

    if (data === null) return null;
    const items = data.map(function (item) {
        console.log(item);
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
                        <div className="list-group">
                            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                The current link item
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                A second link item
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                A third link item
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                A fourth link item
                            </a>
                        </div>
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
