import React from 'react';

import {Test} from '../libs/offcanvas.js';

export const MenuButton = function () {
    const [opened, setOpened] = React.useState(false);

    const onClick = function () {
        setOpened(true);
    };

    return (
        <div style={{padding: '5px'}}>
            <Test opened={opened} setOpened={setOpened} />
            <button type="button" className="btn btn-outline-success" onClick={onClick}>
                <i className="bi bi-menu-button"></i>
            </button>
        </div>
    );
};
