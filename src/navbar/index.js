import React from 'react';
import ReactDOM from 'react-dom';

import {Search} from './search.js';

const AuthModal = function (props) {
    const modalEl = React.useRef(null);
    React.useEffect(function () {
        console.log(modalEl.current);
        const myModal = new bootstrap.Modal(modalEl.current, {});
        myModal.show();
    }, []);

    return ReactDOM.createPortal(
        <div ref={modalEl} className="modal fade" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

const openAuthModal = function () {
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    myModal.show();
    // ReactDOM.render(<AuthModal />, document.getElementById('modal'));
};

export const NavBar = function ({categories, user}) {
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

    const onLogin = function (e) {
        e.preventDefault();
        console.log(user);
        openAuthModal();
    };

    const onCart = function (e) {
        e.preventDefault();
    };

    const navItems = categories.map(function (item) {
        const onClick = function (e) {
            e.preventDefault();
        };

        return (
            <li key={item['ID_Categoria']} className="nav-item col-6 col-lg-auto">
                <a className="nav-link" href={item['slug']} onClick={onClick}>
                    {item['Descrizione']}
                </a>
            </li>
        );
    });
    return (
        <React.Fragment>
            <AuthModal />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img
                            className="brand-img"
                            alt="Brand"
                            src="https://static.life365.eu/common/template_01/images/life365-09.gif"
                            style={{width: '200px'}}
                        />
                    </a>
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
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <div className="navbar-collapse collapse" id="navbarCollapse">
                        <ul className="navbar-nav flex-row flex-wrap me-auto mb-2 mb-md-0">
                            <li className="nav-item col-6 col-lg-auto ms-auto">
                                <a className="nav-link" href="#">
                                    <button type="button" className="btn btn-light" onClick={onLogin}>
                                        Login <i className="bi bi-box-arrow-in-right"></i>
                                    </button>
                                </a>
                            </li>
                            <li className="nav-item col-6 col-lg-auto">
                                <a className="nav-link" href="#">
                                    <button type="button" className="btn btn-light" onClick={onCart}>
                                        Cart <i className="bi bi-cart4"></i>
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="bd-subnavbar py-2" aria-label="Secondary navigation">
                <div className="container-fluid">
                    <Search />
                </div>
            </nav>
        </React.Fragment>
    );
};
