// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';

const UserContext = React.createContext();

export const useUser = function () {
    const context = React.useContext(UserContext);
    if (!context) throw 'useUser must be used within a UserContext';
    return context;
};

export const UserProvider = function (props) {
    const [user, setUser] = React.useState(undefined);
    const value = React.useMemo(
        function () {
            return [user, setUser];
        },
        [user]
    );
    return <UserContext.Provider value={value} {...props} />;
};

// import useSWR from 'swr';
// const {data, error} = useSWR('auth', function (...args) {
//     return getAuthenticatedUser();
// });
