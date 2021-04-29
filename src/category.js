import React from 'react';
import {Switch, Route, useParams, useRouteMatch} from 'react-router-dom';
import useSWR from 'swr';

import {TreeMenu} from './tree_menu.js';
import {API} from './parameters.js';
import {useUser} from './auth.js';

const useProducts = function (id, user) {
    const baseUrl = `//${API}/products/level_3/${id}`;
    return useSWR(user === null ? baseUrl : `${baseUrl}?jwt=${user.jwt}`);
};

const Subcategory = function (props) {
    const {subcategory_id} = useParams();
    const id = parseInt(subcategory_id.split('-').pop());
    const {data: user} = useUser();
    const {data, error} = useProducts(id, user);

    if (error !== undefined)
        return (
            <div className="alert alert-danger" role="alert">
                Error!
            </div>
        );
    if (data === undefined)
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );

    const items = data.map(function (item) {
        return (
            <div key={item.id} className="card mb-1">
                <div className="row g-0">
                    <div className="col-md-2 text-center align-middle">
                        <img src={item.photos[0]} className="img-fluid" style={{maxHeight: '100px'}} />
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <h5 className="card-title">{item.code_simple}</h5>
                            <p className="card-text">{item.title.en}</p>
                            <p className="card-text">
                                {(item.stock === 0 && <small className="text-danger">not available</small>) || (
                                    <small className="text-muted">{item.stock} available</small>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <React.Fragment>
            <div className="row row-cols-1 m-1">{items}</div>
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
