import localforage from 'localforage';
import useSWR from 'swr';

import {API} from './parameters';

interface AuthData {
    country: 'IT' | 'ES' | 'PT' | 'NL' | 'CN';
    email: string;
    id: number;
    jwt: string;
    level: number;
    login: string;
    name: string;
    role: 'customer';
    sigla: string;
}

interface LocalForageToken {
    value: AuthData;
    ts: Date;
}

const LocalStorage = (function () {
    localforage.config({
        name: 'github.com/bacchilu/life365',
    });

    return {
        get: async function () {
            const res = await localforage.getItem<LocalForageToken>('user');
            if (res === null || res === undefined) return null;
            if (res.ts < new Date(Date.now() - 1000 * 60 * 60 * 24)) {
                localforage.clear();
                return null;
            }
            return res.value;
        },
        set: function (user: AuthData) {
            return localforage.setItem('user', {value: user, ts: new Date()});
        },
        clear: function () {
            return localforage.clear();
        },
    };
})();

const checkAuthentication = function () {
    return LocalStorage.get();
};

const login = async function (login: string, password: string) {
    const res = await fetch(`${API}/auth/?login=${login}&password=${password}`);
    const user: AuthData = await res.json();
    LocalStorage.set(user);
    return user;
};

const logout = async function () {
    await LocalStorage.clear();
    return null;
};

export const useUser = function () {
    const {data, error, mutate} = useSWR('AUTH', checkAuthentication, {dedupingInterval: 60000});

    return {
        data,
        error,
        Methods: {
            login: async function (username: string, password: string) {
                return mutate(login(username, password));
            },
            logout: function () {
                mutate(logout());
            },
        },
    };
};
