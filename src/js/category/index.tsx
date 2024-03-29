import React from 'react';
import {useParams} from 'react-router-dom';
import useSWR from 'swr';

import {AuthData, useUser} from '../auth';
import {API} from '../parameters';
import {MenuButton, TreeMenu} from '../tree_menu';
import {ProductRow} from './product';
import {RootPanel} from './root_panel';

interface Product {
    id: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Product[]>);

const useProducts = function (id: number, user: AuthData | null | undefined) {
    if (user === undefined) return {data: undefined, error: undefined};
    const baseUrl = `//${API}/products/level_3/${id}`;
    const url = user === null ? baseUrl : `${baseUrl}?jwt=${user.jwt}`;
    return useSWR(url, fetcher, {dedupingInterval: 60000});
};

const Subcategory = function () {
    const {subcategory_id} = useParams();

    const id = parseInt(subcategory_id!.split('-').pop()!);
    const {data: user} = useUser();
    const {data, error} = useProducts(id, user);

    if (error !== undefined)
        return (
            <div className="alert alert-danger" role="alert">
                Error!
            </div>
        );
    if (data === undefined) return <div className="spinner-border" role="status"></div>;

    const items = data.map(function (item) {
        return <ProductRow key={item.id} item={item} />;
    });
    return <div className="row row-cols-1 m-1">{items}</div>;
};

const TreeMenuPanel = function () {
    const {category_id} = useParams();

    const id = parseInt(category_id!.split('-').pop()!);

    return (
        <>
            <div className="d-none d-sm-block">
                <TreeMenu id={id} />
                <div className="fixed-bottom">
                    <MenuButton id={id} />
                </div>
            </div>
            <div className="d-block d-sm-none fixed-bottom">
                <MenuButton id={id} />
            </div>
        </>
    );
};

export const SubCategoryPanel = function () {
    return (
        <div className="row">
            <div className="col-sm-2">
                <TreeMenuPanel />
            </div>
            <div className="col-sm-10">
                <Subcategory />
            </div>
        </div>
    );
};

export const CategoryPanel = function () {
    const {category_id} = useParams();

    const id = parseInt(category_id!.split('-').pop()!);

    return (
        <div className="row">
            <div className="col-sm-2">
                <TreeMenuPanel />
            </div>
            <div className="col-sm-10">
                <RootPanel />
            </div>
        </div>
    );
};
