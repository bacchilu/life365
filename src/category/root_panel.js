import React from 'react';
import useSWR from 'swr';

import {API} from '../parameters';
import {useUser} from '../auth';

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

    console.log(data);
    if (data === undefined)
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );

    return <p>{`ROOT CATEGORY: ${category_id}`}</p>;
};
