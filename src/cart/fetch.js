import {API} from '../parameters';

export const Fetch = {
    putProduct: async function (user, cartId, action) {
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
