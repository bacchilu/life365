import React from 'react';

import {NavBarButtons} from './navbar_buttons.js';
import {Link, NavLink} from 'react-router-dom';

export const NavBar = function ({categories}) {
    // React.useEffect(function () {
    //     // https://stackoverflow.com/questions/23764863/how-to-close-an-open-collapsed-navbar-when-clicking-outside-of-the-navbar-elemen
    //     // $(document).ready(function () {
    //     //     $(document).click(function (event) {
    //     //         var clickover = $(event.target);
    //     //         var _opened = $('.navbar-collapse').hasClass('navbar-collapse in');
    //     //         if (_opened === true && !clickover.hasClass('navbar-toggle')) {
    //     //             $('button.navbar-toggle').click();
    //     //         }
    //     //     });
    //     // });

    //     const cb = function (e) {
    //         console.log(e.target);
    //     };
    //     document.addEventListener('click', cb);
    //     return function () {
    //         document.removeEventListener('click', cb);
    //     };
    // }, []);

    const navItems = categories.map(function (item) {
        return (
            <li key={item['ID_Categoria']} className="nav-item col-6 col-lg-auto">
                <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to={`/c/${item['slug']}-${item['ID_Categoria']}`}
                >
                    {item['Descrizione']}
                </NavLink>
            </li>
        );
    });
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            className="brand-img"
                            alt="Brand"
                            src="https://static.life365.eu/common/template_01/images/life365-09.gif"
                            style={{width: '200px'}}
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarCollapse">
                        <ul className="navbar-nav flex-row flex-wrap me-auto mb-2 mb-md-0">{navItems}</ul>
                    </div>
                </div>
            </nav>
            <NavBarButtons />
        </React.Fragment>
    );
};
