import {AuthData} from '../auth';
import {API} from '../parameters';

interface Action {
    type: 'PUT_PRODUCT';
    value: {
        id: number;
        qta: number;
    };
}

export const Fetch = {
    putProduct: async function (user: AuthData, cartId: number | undefined, action: Action) {
        if (cartId === undefined) throw Error('We need to create a new cart');

        const resource = await fetch(`//${API}/order/cart/${cartId}?jwt=${user.jwt}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action),
        });
        return resource.json();
    },
};
