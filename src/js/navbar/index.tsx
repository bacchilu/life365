import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import {Category} from '../hooks';
import {NavBarButtons} from './navbar_buttons';

const CategoryMenu = function ({categories}: {categories: Category[]}) {
    const navItems = categories.map(function (category) {
        const onClick = function () {
            document.getElementById('navbarCollapse')!.classList.remove('show');
        };

        return (
            <li key={category.ID_Categoria} className="nav-item col-6 col-lg-auto">
                <NavLink
                    className={function ({isActive}) {
                        return `nav-link ${isActive ? ' active' : ''}`;
                    }}
                    to={`/c/${category.slug}-${category.ID_Categoria}`}
                    onClick={onClick}
                >
                    {category.Descrizione}
                </NavLink>
            </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        className="brand-img"
                        src="https://static.life365.eu/common/template_01/images/life365-09.gif"
                        style={{width: '200px'}}
                    />
                </Link>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`navbar-collapse collapse ${false ? 'show' : ''}`} id="navbarCollapse">
                    <ul className="navbar-nav flex-row flex-wrap me-auto mb-2 mb-md-0">{navItems}</ul>
                </div>
            </div>
        </nav>
    );
};

export const NavBar = function ({categories}: {categories: Category[]}) {
    return (
        <>
            <CategoryMenu categories={categories} />
            <NavBarButtons />
        </>
    );
};
