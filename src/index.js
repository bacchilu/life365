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
            <div key={item['ID_Categoria']} className="col">
                <div className="card border-dark text-center" style={{width: '18rem'}}>
                    <div style={{height: '286px'}}>
                        <img src={item['image']} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{item['Descrizione']}</h5>
                    </div>
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
