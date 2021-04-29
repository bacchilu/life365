// https://kentcdodds.com/blog/application-state-management-with-react

import useSWR from 'swr';

import {getAuthenticatedUser, setAuthenticatedUser, logout} from './auth.js';

export const useUser = function () {
    const {data, error, mutate} = useSWR('auth', function () {
        return getAuthenticatedUser();
    });

    return {
        data,
        error,
        Methods: {
            login: async function (login, password) {
                return mutate(setAuthenticatedUser(login, password));
            },
            logout: function () {
                mutate(logout());
            },
        },
    };
};
