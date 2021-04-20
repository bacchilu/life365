import React from 'react';
import {Switch, Route, useParams, useRouteMatch} from 'react-router-dom';

import {TreeMenu} from './tree_menu.js';
import {API} from './parameters.js';

const useProducts = function (id) {
    const [data, setData] = React.useState(null);
    React.useEffect(
        async function () {
            const response = await fetch(`//${API}/products/level_3/${id}`);
            setData(await response.json());
        },
        [id]
    );

    return data;
};

const Subcategory = function (props) {
    const {subcategory_id} = useParams();
    const id = parseInt(subcategory_id.split('-').pop());
    const products = useProducts(id);

    if (products === null) return null;
    const items = products.map(function (item) {
        return (
            <div key={item.id} className="col">
                <div className="card">
                    <img src={item.photos[0]} className="card-img-top" style={{maxHeight: '100px'}} />
                    <div className="card-body">
                        <h5 className="card-title">{item.code_simple}</h5>
                        <p className="card-text">{item.title.en}</p>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <React.Fragment>
            <p>{`SUBCATEGORY: ${subcategory_id}`}</p>
            <div className="row row-cols-1 row-cols-md-2 g-4">{items}</div>
        </React.Fragment>
    );
};

export const CategoryPanel = function (props) {
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
