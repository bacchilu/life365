import {createRoot} from 'react-dom/client';
import {HashRouter, Link, Route, Routes} from 'react-router-dom';

import {CategoryPanel, SubCategoryPanel} from './category';
import {useCategories} from './hooks';
import {NavBar} from './navbar';

const Spinner = function () {
    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" style={{width: '8rem', height: '8rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5 lead">
                Nel mezzo del cammin di nostra vita
                <br />
                mi ritrovai per una selva oscura,
                <br />
                ché la diritta via era smarrita.
            </div>
        </>
    );
};

const IndexPage = function ({categories}) {
    const cards = categories.map(function (item) {
        return (
            <div key={item.ID_Categoria} className="col d-flex justify-content-center">
                <div
                    className="card text-center border-light shadow p-3 mb-5 bg-white rounded"
                    style={{width: '18rem'}}
                >
                    <Link to={`/c/${item.slug}-${item.ID_Categoria}`} className="text-decoration-none">
                        <div style={{height: '13rem'}}>
                            <img
                                src={item.image}
                                className="card-img-top"
                                style={{maxWidth: '13rem', maxHeight: '13rem'}}
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-dark">{item.Descrizione}</h5>
                        </div>
                    </Link>
                </div>
            </div>
        );
    });

    return <div className="row row-cols-1 row-cols-md-4 g-4">{cards}</div>;
};

const App = function () {
    const categories = useCategories();

    if (categories === undefined) return <Spinner />;
    return (
        <HashRouter>
            <header>
                <NavBar categories={categories} />
            </header>
            <main>
                <div className="container-fluid">
                    <Routes>
                        <Route path="/" element={<IndexPage categories={categories} />} />
                        <Route path="/c/:category_id" element={<CategoryPanel />} />
                        <Route path="/c/:category_id/:subcategory_id" element={<SubCategoryPanel />} />
                    </Routes>
                </div>
            </main>
        </HashRouter>
    );
};

createRoot(document.getElementById('app')).render(<App />);
