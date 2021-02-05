import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';

localforage.config({
    name: 'github.com/bacchilu/life365',
});
// localforage.setItem('prova', {v: 'Luca', ts: new Date()});
// localforage.clear();
// localforage.getItem('prova').then(function (item) {
//     console.log(item);
// });

import {API} from './parameters.js';
import {NavBar} from './navabar';

const LocalStorage = {};

const JwtCookie = {
    set: function (jwt) {
        var date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        const expires = '; expires=' + date.toGMTString();
        document.cookie = 'jwt=' + jwt + expires + '; path=/';
    },
    remove: function () {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    },
    get: function () {
        const value = '; ' + document.cookie;
        const parts = value.split('; jwt=');
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
};

const getAuthClient = async function () {
    const jwt = JwtCookie.get();
    if (jwt === undefined) return null;

    try {
        const res = await fetch(`${API}/auth/?jwt=${jwt}`);
        if (!res.ok) throw new Error('Auth Error');
        const user = await res.json();
        user['jwt'] = jwt;
        return user;
    } catch (e) {
        return null;
    }
};

const auth = async function (username, password) {
    const res = await fetch(`${params.API2}/auth/?login=${username}&password=${password}`);
    const user = await res.json();
    if (user !== null) {
        JwtCookie.set(user['jwt']);
        // return getAuthClient();
        return user;
    }
    JwtCookie.remove();
    return null;
};

const logout = function () {
    JwtCookie.remove();
};

const App = function (props) {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(async function () {
        const response = await fetch(`//${API}/warehouse/getCategories`);
        setCategories(await response.json());

        const user = await getAuthClient();
        console.log(user);
    }, []);

    const cards = categories.map(function (item) {
        return (
            <div key={item['ID_Categoria']} className="col d-flex justify-content-center">
                <div
                    className="card text-center border-light shadow p-3 mb-5 bg-white rounded"
                    style={{width: '18rem'}}
                >
                    <a href={item['slug']} className="text-decoration-none">
                        <div style={{height: '13rem'}}>
                            <img
                                src={item['image']}
                                className="card-img-top"
                                alt="..."
                                style={{maxWidth: '13rem', maxHeight: '13rem'}}
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-dark">{item['Descrizione']}</h5>
                        </div>
                    </a>
                </div>
            </div>
        );
    });
    return (
        <React.Fragment>
            <header>
                <NavBar categories={categories} />
            </header>
            <main>
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-md-4 g-4">{cards}</div>
                </div>
            </main>
        </React.Fragment>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
