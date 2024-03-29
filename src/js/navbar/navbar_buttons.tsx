import React from 'react';

import {AuthData, useUser} from '../auth';
import {Modal} from '../libs/modal';
import {CartButton} from './cart';
import {AuthModal, UserModal} from './modals';
import {Search} from './search';

const LoginButton = function ({
    user,
    onLogin,
    onUser,
}: {
    user: AuthData | null | undefined;
    onLogin: (e: React.MouseEvent) => void;
    onUser: (e: React.MouseEvent) => void;
}) {
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

export const NavBarButtons = function () {
    const {data: user} = useUser();
    const [modalOpened, setModalOpened] = React.useState(false);

    const onLogin = function (e: React.MouseEvent) {
        e.preventDefault();
        setModalOpened(true);
    };

    const onUser = function (e: React.MouseEvent) {
        e.preventDefault();
        setModalOpened(true);
    };

    return (
        <>
            <Modal opened={modalOpened} setOpened={setModalOpened}>
                {(user === null && <AuthModal />) || <UserModal />}
            </Modal>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-collapse">
                        <ul className="navbar-nav flex-row flex-wrap me-auto mb-2 mb-md-0">
                            <li className="nav-item col-6 col-lg-auto ms-auto">
                                <LoginButton user={user} onLogin={onLogin} onUser={onUser} />
                            </li>
                            <li className="nav-item col-6 col-lg-auto">
                                <CartButton />
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
        </>
    );
};
