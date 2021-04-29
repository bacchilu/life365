import React from 'react';

import {useUser} from '../../user_hook.js';

const Submit = function ({isRunning, ...props}) {
    return (
        <button type="submit" className="btn btn-primary" disabled={isRunning}>
            {isRunning && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {props.children}
        </button>
    );
};

export const AuthForm = function () {
    const inputEl = React.useRef(null);
    React.useEffect(function () {
        inputEl.current.focus();
    }, []);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hasError, setHasError] = React.useState(false);
    const [isRunning, setIsRunning] = React.useState(false);

    const {Methods} = useUser();

    const onChange = function (e) {
        if (e.target.name === 'login') setLogin(e.target.value);
        if (e.target.name === 'password') setPassword(e.target.value);
    };

    const onSubmit = async function (e) {
        e.preventDefault();
        setIsRunning(true);
        try {
            const res = await Methods.login(login, password);
            // setHasError(false);
        } catch (e) {
            setHasError(true);
        } finally {
            // setIsRunning(false);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="modal-body">
                <div className="form-floating mb-3">
                    <input
                        ref={inputEl}
                        className="form-control"
                        placeholder="Username"
                        name="login"
                        value={login}
                        onChange={onChange}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <label>Password</label>
                </div>
                {hasError && (
                    <div className="alert alert-danger" role="alert">
                        Authentication error!
                    </div>
                )}
            </div>
            <div className="modal-footer">
                <Submit isRunning={isRunning}>Enter</Submit>
            </div>
        </form>
    );
};
