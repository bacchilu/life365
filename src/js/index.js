import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter, Routes, Route, Link} from 'react-router-dom';

import {NavBar} from './navbar';
import {CategoryPanel, SubCategoryPanel} from './category';
import {useCategories} from './hooks.js';

const App = function (props) {
    const {data} = useCategories();

    const categories = data === undefined ? [] : data;
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
        <HashRouter>
            <header>
                <NavBar categories={categories} />
            </header>
            <main>
                <div className="container-fluid">
                    <Routes>
                        <Route path="/c/:category_id" element={<CategoryPanel />} />
                        <Route path="/c/:category_id/:subcategory_id" element={<SubCategoryPanel />} />
                        <Route path="/" element={<div className="row row-cols-1 row-cols-md-4 g-4">{cards}</div>} />
                    </Routes>
                </div>
            </main>
        </HashRouter>
    );
};

createRoot(document.getElementById('app')).render(<App />);
