import React from 'react';
import ReactDOM from 'react-dom';

import {NavBar} from './navabar';

const App = function (props) {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(async function () {
        const response = await fetch('https://www.life365.eu/api/warehouse/getCategories');
        setCategories(await response.json());
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
