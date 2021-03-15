import React from 'react';

import {Search} from './search.js';
import {useModal, Modal2} from './modal.js';
import {AuthForm} from './auth_form.js';

export const NavBarButtons = function ({user}) {
    const [Modal, show, hide] = useModal();

    const [modalOpened, setModalOpened] = React.useState(false);

    const onLogin = function (e) {
        e.preventDefault();
        // show();
        setModalOpened(true);
    };
    const onCart = function (e) {
        e.preventDefault();
    };
    const onUserAuthenticated = function (u) {
        console.log(u);
        // hide();
        setModalOpened(false);
    };

    return (
        <React.Fragment>
            <Modal>
                <AuthForm user={user} onUserAuthenticated={onUserAuthenticated} />
            </Modal>
            <Modal2 opened={modalOpened} setOpened={setModalOpened}>
                <div className="modal-header">
                    <h5 className="modal-title">Authentication</h5>
                    <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <AuthForm user={user} onUserAuthenticated={onUserAuthenticated} />
            </Modal2>
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
