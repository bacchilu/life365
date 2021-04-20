import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from 'react-router-dom';

import {getAuthenticatedUser} from './auth.js';
import {API} from './parameters.js';
import {NavBar} from './navbar';
import {UserProvider, useUser} from './user-context.js';
import {TreeMenu} from './tree_menu.js';

const Subcategory = function (props) {
    const {subcategory_id} = useParams();

    const id = parseInt(subcategory_id.split('-').pop());

    return <p>{`SUBCATEGORY: ${subcategory_id}`}</p>;
};

const CategoryPanel = function (props) {
    const {category_id} = useParams();
    const match = useRouteMatch();

    const id = parseInt(category_id.split('-').pop());

    return (
        <div className="row">
            <div className="col-sm-2">
                <TreeMenu id={id} />
            </div>
            <div className="col-sm-10">
                <Switch>
                    <Route path={`${match.path}/:subcategory_id`}>
                        <Subcategory />
                    </Route>
                    <Route path={match.path}>
                        <p>{`ROOT CATEGORY: ${category_id}`}</p>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

const App = function (props) {
    const [categories, setCategories] = React.useState([]);
    const [user, setUser] = useUser();
    React.useEffect(async function () {
        const response = await fetch(`//${API}/warehouse/getCategories`);
        setCategories(await response.json());
        setUser(await getAuthenticatedUser());
    }, []);

    const cards = categories.map(function (item) {
        return (
            <div key={item['ID_Categoria']} className="col d-flex justify-content-center">
                <div
                    className="card text-center border-light shadow p-3 mb-5 bg-white rounded"
                    style={{width: '18rem'}}
                >
                    <Link to={`/c/${item['slug']}-${item['ID_Categoria']}`} className="text-decoration-none">
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
                    </Link>
                </div>
            </div>
        );
    });
    return (
        <Router>
            <header>
                <NavBar categories={categories} />
            </header>
            <main>
                <div className="container-fluid">
                    <Switch>
                        <Route path="/c/:category_id">
                            <CategoryPanel />
                        </Route>
                        <Route path="/">
                            <div className="row row-cols-1 row-cols-md-4 g-4">{cards}</div>
                        </Route>
                    </Switch>
                </div>
            </main>
        </Router>
    );
};

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,
    document.getElementById('app')
);
