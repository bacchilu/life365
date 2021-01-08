import React from 'react';
import ReactDOM from 'react-dom';

const App = function (props) {
    return (
        <div className="container-fluid">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav> */}
            <h1>life365</h1>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
