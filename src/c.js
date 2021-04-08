import React from 'react';
import ReactDOM from 'react-dom';

import {getAuthenticatedUser} from './auth.js';
import {API} from './parameters.js';
import {NavBar} from './navbar';
import {UserProvider, useUser} from './user-context.js';

const App = function (props) {
    const [categories, setCategories] = React.useState([]);
    const [user, setUser] = useUser();
    React.useEffect(async function () {
        const response = await fetch(`//${API}/warehouse/getCategories`);
        setCategories(await response.json());
        setUser(await getAuthenticatedUser());
    }, []);

    return (
        <React.Fragment>
            <header>
                <NavBar categories={categories} />
            </header>
            <main>
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-md-4">TODO</div>
                </div>
            </main>
        </React.Fragment>
    );
};

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,
    document.getElementById('app')
);
