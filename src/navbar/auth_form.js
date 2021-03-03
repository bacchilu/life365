import React from 'react';

export const AuthForm = function ({user, isVisible}) {
    const inputEl = React.useRef(null);
    React.useEffect(
        function () {
            inputEl.current.focus();
            if (isVisible) console.log(user);
        },
        [isVisible]
    );
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChange = function (e) {
        if (e.target.name === 'login') setLogin(e.target.value);
        if (e.target.name === 'password') setPassword(e.target.value);
    };

    const onSubmit = function (e) {
        e.preventDefault();
        console.log('SUBMIT', login, password);
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
                <div className="form-floating">
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
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                    Enter
                </button>
            </div>
        </form>
    );
};
