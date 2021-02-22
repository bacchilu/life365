import React from 'react';
import ReactDOM from 'react-dom';

import {Search} from './search.js';

const AuthForm = function ({isVisible}) {
    const inputEl = React.useRef(null);
    React.useEffect(
        function () {
            inputEl.current.focus();
        },
        [isVisible]
    );

    const onSubmit = function (e) {
        e.preventDefault();
        console.log('SUBMIT');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="modal-body">
                <div className="form-floating mb-3">
                    <input ref={inputEl} type="email" className="form-control" placeholder="Username" />
                    <label>Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password" />
                    <label>Password</label>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                    Enter
                </button>
            </div>
        </form>
    );
};

const Modal = function ({user, opened, hide, Body, children}) {
    // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    const modalEl = React.useRef(null);
    const modalJs = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);
    React.useEffect(function () {
        modalJs.current = new bootstrap.Modal(modalEl.current, {});
        modalEl.current.addEventListener('hidden.bs.modal', function (event) {
            hide();
            setIsVisible(false);
        });
        modalEl.current.addEventListener('shown.bs.modal', function () {
            setIsVisible(true);
        });
    }, []);
    React.useEffect(
        function () {
            console.log(user);
            opened ? modalJs.current.show() : modalJs.current.hide();
        },
        [opened]
    );

    return ReactDOM.createPortal(
        <div ref={modalEl} className="modal fade" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Authentication</h5>
                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <Body isVisible={isVisible} />
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
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

    const [modalOpened, setModalOpened] = React.useState(false);
    const hideModal = function () {
        setModalOpened(false);
    };
    const onLogin = function (e) {
        e.preventDefault();
        setModalOpened(true);
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
            <Modal user={user} opened={modalOpened} hide={hideModal} Body={AuthForm}>
                <AuthForm />
            </Modal>
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
