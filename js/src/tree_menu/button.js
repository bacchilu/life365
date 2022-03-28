import React from 'react';
import useSWR from 'swr';

import {API} from '../parameters.js';
import {Offcanvas} from '../libs/offcanvas.js';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useCategories = function () {
    return useSWR(`//${API}/warehouse/getCategories`, fetcher, {dedupingInterval: 60000});
};

const useCategory = function (id) {
    const {data} = useCategories();
    if (data === undefined) return undefined;
    return data.find(function (item) {
        return item.ID_Categoria === id;
    });
};

const Test = function ({opened, setOpened, id}) {
    const category = useCategory(id);

    const title = category === undefined ? 'Loading...' : category.Descrizione;

    return (
        <Offcanvas opened={opened} setOpened={setOpened}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">{title}</h5>
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <div>
                    Some text as placeholder. In real life you can have the elements you have chosen. Like, text,
                    images, lists, etc.
                </div>
            </div>
        </Offcanvas>
    );
};

export const MenuButton = function ({id}) {
    const [opened, setOpened] = React.useState(false);

    const onClick = function () {
        setOpened(true);
    };

    return (
        <div style={{padding: '5px'}}>
            <Test opened={opened} setOpened={setOpened} id={id} />
            <button type="button" className="btn btn-outline-success" onClick={onClick}>
                <i className="bi bi-menu-button"></i>
            </button>
        </div>
    );
};
