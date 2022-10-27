import React from 'react';

import {TreeMenu} from '.';
import {useCategories} from '../hooks';
import {Offcanvas} from '../libs/offcanvas.js';

const useCategory = function (id) {
    const categories = useCategories();
    if (categories === undefined) return undefined;
    return categories.find(function (item) {
        return item.ID_Categoria === id;
    });
};

const OffcanvasMenu = function ({opened, setOpened, id}) {
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
                <TreeMenu id={id} />
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
            <OffcanvasMenu opened={opened} setOpened={setOpened} id={id} />
            <button type="button" className="btn btn-outline-success btn-lg" onClick={onClick}>
                <i className="bi bi-menu-button"></i>
            </button>
        </div>
    );
};
