import React from 'react';
import useSWR from 'swr';

import {API} from '../parameters';
import {useUser} from '../auth';
// import {Test} from '../libs/offcanvas';

const useInEvidenza = function (user, category_id) {
    const baseUrl = `//${API}/warehouse/in_evidenza/${category_id}`;
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

export const RootPanel = function ({category_id}) {
    const {data: user} = useUser();
    const {data} = useInEvidenza(user, category_id);
    // const [opened, setOpened] = React.useState(false);

    if (data === undefined)
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );

    const cards = data.map(function (item) {
        return (
            <div key={item.id} className="col">
                <div className="card">
                    <img src={item.url_image} style={{height: '300px'}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.Codicesenza}</h5>
                        <p className="card-text">{item.Descrizione}</p>
                    </div>
                </div>
            </div>
        );
    });

    const onClick = function () {
        // setOpened(true);
    };

    return (
        <div onClick={onClick} className="row row-cols-1 row-cols-md-3 g-4">
            {/* <Test opened={opened} setOpened={setOpened} /> */}
            {cards}
        </div>
    );
};
