import {Link, NavLink} from 'react-router-dom';

import {NavBarButtons} from './navbar_buttons.js';

const CategoryMenu = function ({categories}) {
    const navItems = categories.map(function (item) {
        const onClick = function () {
            document.getElementById('navbarCollapse').classList.remove('show');
        };

        return (
            <li key={item.ID_Categoria} className="nav-item col-6 col-lg-auto">
                <NavLink
                    className={function ({isActive}) {
                        return `nav-link ${isActive ? ' active' : ''}`;
                    }}
                    to={`/c/${item.slug}-${item.ID_Categoria}`}
                    onClick={onClick}
                >
                    {item.Descrizione}
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

export const NavBar = function ({categories}) {
    return (
        <>
            <CategoryMenu categories={categories} />
            <NavBarButtons />
        </>
    );
};
