import localforage from 'localforage';

import {API} from './parameters.js';

const LocalStorage = (function () {
    localforage.config({
        name: 'github.com/bacchilu/life365',
    });

    return {
        get: async function () {
            const res = await localforage.getItem('user');
            if (res === null) return null;
            if (res.ts < Date.now() - 1000 * 60 * 60 * 24) {
                localforage.clear();
                return null;
            }
            return res.value;
        },
        set: function (user) {
            return localforage.setItem('user', {value: user, ts: new Date()});
        },
        clear: function () {
            return localforage.clear();
        },
    };
})();

export const checkAuthentication = function () {
    return LocalStorage.get();
};

export const login = async function (login, password) {
    const res = await fetch(`${API}/auth/?login=${login}&password=${password}`);
    const user = await res.json();
    LocalStorage.set(user);
    return user;
};

export const logout = function () {
    return LocalStorage.clear();
};
