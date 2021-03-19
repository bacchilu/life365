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
            localforage.setItem('user', {value: user, ts: new Date()});
        },
    };
})();

const JwtCookie = {
    set: function (jwt) {
        var date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        const expires = '; expires=' + date.toGMTString();
        document.cookie = 'jwt=' + jwt + expires + '; path=/';
    },
    remove: function () {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    },
    get: function () {
        const value = '; ' + document.cookie;
        const parts = value.split('; jwt=');
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
};

// export const getAuthenticatedUser = async function () {
//     const jwt = JwtCookie.get();
//     if (jwt === undefined) return null;

//     try {
//         const res = await fetch(`${API}/auth/?jwt=${jwt}`);
//         if (!res.ok) throw new Error('Auth Error');
//         const user = await res.json();
//         user['jwt'] = jwt;
//         return user;
//     } catch (e) {
//         return null;
//     }
// };

const auth = async function (username, password) {
    const res = await fetch(`${params.API2}/auth/?login=${username}&password=${password}`);
    const user = await res.json();
    if (user !== null) {
        JwtCookie.set(user['jwt']);
        // return getAuthClient();
        return user;
    }
    JwtCookie.remove();
    return null;
};

const logout = function () {
    JwtCookie.remove();
};

export const getAuthenticatedUser = async function () {
    return LocalStorage.get();
};

export const setAuthenticatedUser = async function (login, password) {
    const res = await fetch(`${API}/auth/?login=${login}&password=${password}`);
    const user = await res.json();
    LocalStorage.set(user);
    return user;
};
