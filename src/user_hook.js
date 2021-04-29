// https://kentcdodds.com/blog/application-state-management-with-react

import useSWR from 'swr';

import {checkAuthentication, login, logout} from './auth.js';

export const useUser = function () {
    const {data, error, mutate} = useSWR('auth', function () {
        return checkAuthentication();
    });

    return {
        data,
        error,
        Methods: {
            login: async function (username, password) {
                return mutate(login(username, password));
            },
            logout: function () {
                mutate(logout());
            },
        },
    };
};
