import useSWR from 'swr';

import {useUser} from './auth.js';
import {API} from './parameters.js';

export const useCart = function () {
    const {data: user} = useUser();
    const {data, error, mutate} = useSWR(
        function () {
            if (user === undefined) return 'LOADING_CART';
            if (user === null) return 'NULL_CART';
            return `//${API}/order/cart?jwt=${user.jwt}`;
        },
        async function (key) {
            if (key === 'LOADING_CART') return undefined;
            if (key === 'NULL_CART') return null;
            const res = await fetch(key);
            const carts = await res.json();
            return carts.length > 0 ? carts[0] : {total: 0, items: []};
        }
    );
    return {
        data,
        error,
        Methods: {
            add: function (item) {
                console.log(item, data);
                mutate({...data, total: 3.14});
            },
        },
    };
};
