import React from 'react';

import {AuthForm} from './auth_form.js';

export const AuthModal = function ({onUserAuthenticated}) {
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

export const UserModal = function ({user, onLogout}) {
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
