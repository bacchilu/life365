import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

import {API} from './parameters.js';
import {NavBar} from './navbar';
import {CategoryPanel} from './category';

const useCategories = function () {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(async function () {
        const response = await fetch(`//${API}/warehouse/getCategories`);
        setCategories(await response.json());
    }, []);

    return categories;
};

const App = function (props) {
    const categories = useCategories();

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

ReactDOM.render(<App />, document.getElementById('app'));
