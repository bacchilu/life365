import React from 'react';

import {Search} from './search.js';
import {useModal} from './modal.js';
import {AuthForm} from './auth_form.js';

export const NavBarButtons = function ({user}) {
    const [Modal, show] = useModal();

    const onLogin = function (e) {
        e.preventDefault();
        show();
    };
    const onCart = function (e) {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <Modal>
                <AuthForm user={user} />
            </Modal>
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
