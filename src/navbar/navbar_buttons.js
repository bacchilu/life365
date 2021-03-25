import React from 'react';

import {Search} from './search.js';
import {Modal} from './modal.js';
import {AuthForm} from './auth_form.js';
import {useUser} from '../user-context.js';
import {logout} from '../auth.js';

const LoginButton = function ({user, onLogin, onUser}) {
    if (user === undefined)
        return (
            <a className="nav-link disabled" href="#">
                <button type="button" className="btn btn-light">
                    Login <i className="bi bi-box-arrow-in-right"></i>
                </button>
            </a>
        );
    if (user === null)
        return (
            <a className="nav-link" href="#">
                <button type="button" className="btn btn-light" onClick={onLogin}>
                    Login <i className="bi bi-box-arrow-in-right"></i>
                </button>
            </a>
        );
    return (
        <a className="nav-link" href="#">
            <button type="button" className="btn btn-light" onClick={onUser}>
                <strong>
                    {user.login} <i className="bi bi-person"></i>
                </strong>
            </button>
        </a>
    );
};

const AuthModal = function ({onUserAuthenticated}) {
    return (
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title">Authentication</h5>
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <AuthForm onUserAuthenticated={onUserAuthenticated} />
        </React.Fragment>
    );
};

const UserModal = function ({user, onLogout}) {
    return (
        <React.Fragment>
            <div className="modal-header">
                <h5 className="modal-title">User</h5>
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>{user.name}</p>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-danger" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </React.Fragment>
    );
};

export const NavBarButtons = function (props) {
    const [user, setUser] = useUser();
    const [modalOpened, setModalOpened] = React.useState(false);

    const onLogin = function (e) {
        e.preventDefault();
        setModalOpened(true);
    };

    const onUser = function (e) {
        e.preventDefault();
        setModalOpened(true);
    };

    const onCart = function (e) {
        e.preventDefault();
    };

    const onUserAuthenticated = function (currentUser) {
        setUser(currentUser);
        setModalOpened(false);
    };

    const onLogout = function () {
        setUser(null);
        setModalOpened(false);
        logout();
    };

    return (
        <React.Fragment>
            <Modal opened={modalOpened} setOpened={setModalOpened}>
                {(user === null && <AuthModal onUserAuthenticated={onUserAuthenticated} />) || (
                    <UserModal user={user} onLogout={onLogout} />
                )}
            </Modal>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <div className="navbar-collapse collapse" id="navbarCollapse">
                        <ul className="navbar-nav flex-row flex-wrap me-auto mb-2 mb-md-0">
                            <li className="nav-item col-6 col-lg-auto ms-auto">
                                <LoginButton user={user} onLogin={onLogin} onUser={onUser} />
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
