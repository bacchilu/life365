import React from 'react';
import {Switch, Route, useParams, useRouteMatch} from 'react-router-dom';
import useSWR from 'swr';

import {TreeMenu} from '../tree_menu.js';
import {API} from '../parameters.js';
import {useUser} from '../auth.js';
import {ProductRow} from './product.js';

const useProducts = function (id, user) {
    const baseUrl = `//${API}/products/level_3/${id}`;
    return useSWR(
        function () {
            return user === null ? baseUrl : `${baseUrl}?jwt=${user.jwt}`;
        },
        async function (url) {
            return (await fetch(url)).json();
        },
        {dedupingInterval: 60000}
    );
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
        return <ProductRow key={item.id} item={item} />;
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
        // <div className="row">
        //     <div className="col-sm-2">
        //         <TreeMenu id={id} />
        //     </div>
        //     <div className="col-sm-10">
        //         <Switch>
        //             <Route path={`${match.path}/:subcategory_id`}>
        //                 <Subcategory />
        //             </Route>
        //             <Route path={match.path}>
        //                 <p>{`ROOT CATEGORY: ${category_id}`}</p>
        //             </Route>
        //         </Switch>
        //     </div>
        // </div>
        <div className="row">
            <Switch>
                <Route path={`${match.path}/:subcategory_id`}>
                    <div className="col-sm-2">
                        <TreeMenu id={id} />
                    </div>
                    <div className="col-sm-10">
                        <Subcategory />
                    </div>
                </Route>
                <Route path={match.path}>
                    <div className="col-sm-2">
                        <TreeMenu id={id} />
                    </div>
                    <div className="col-sm-10">
                        <p>{`ROOT CATEGORY: ${category_id}`}</p>
                    </div>
                </Route>
            </Switch>
        </div>
    );
};
