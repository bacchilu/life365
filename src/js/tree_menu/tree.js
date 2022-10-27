import React from 'react';
import {NavLink, useMatch, useParams} from 'react-router-dom';
import useSWR from 'swr';

import {API} from '../parameters';

const toslug = function (t) {
    return t
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const useTree = function (id) {
    return useSWR(
        `//${API}/warehouse/tree/${id}`,
        async function (url) {
            return (await fetch(url)).json();
        },
        {dedupingInterval: 60000}
    );
};

export const TreeMenu = function ({id}) {
    const match = useMatch('*');
    const {subcategory_id} = useParams();
    const {data} = useTree(id);

    if (data === undefined)
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    if (data === undefined) return null;

    const baseUrl = match.pathname.split('/').slice(0, 3).join('/');

    const subcategoryId = subcategory_id !== undefined ? parseInt(subcategory_id.split('-').pop()) : null;
    const rootSubcategory = data.find(function (e) {
        return e.children.find(function (f) {
            return f.id === subcategoryId;
        });
    });
    const rootId = rootSubcategory?.id;

    const items = data.map(function (item) {
        const items = item.children.map(function (item) {
            return (
                <NavLink
                    key={item.id}
                    to={`${baseUrl}/${toslug(item.name.en)}-${item.id}`}
                    className={({isActive}) => 'list-group-item list-group-item-action' + (isActive ? ' active' : '')}
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
                        className={`accordion-button ${rootId === item.id ? null : 'collapsed'}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse_${item.id}`}
                        aria-controls={`collapse_${item.id}`}
                    >
                        {item.name.en}
                    </button>
                </h2>
                <div
                    id={`collapse_${item.id}`}
                    className={`accordion-collapse collapse ${rootId === item.id ? 'show' : null}`}
                    data-bs-parent="#accordionTree"
                >
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
