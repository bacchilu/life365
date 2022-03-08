import React from 'react';

import {API} from '../parameters.js';

const fetchWithAbort = function (v) {
    const controller = new AbortController();
    const res = fetch(`//${API}/search/suggest?page=0&s=${encodeURIComponent(v)}`, {
        signal: controller.signal,
    });
    return [controller, res];
};

export const Search = function (props) {
    const [value, setValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);
    React.useEffect(
        async function () {
            const v = value.trim();
            if (v === '') {
                setSuggestions([]);
                return;
            }
            const response = await fetch(`//${API}/search/suggest?page=0&s=${encodeURIComponent(v)}`);
            const res = await response.json();
            setSuggestions(
                res['results'].map(function (item) {
                    return {id: item['id'], code: item['code']};
                })
            );
        },
        [value]
    );

    const onChange = function (e) {
        setValue(e.target.value);
    };

    const options = suggestions.map(function (item) {
        return <option key={item['id']} value={item['code']} />;
    });
    return (
        <form className="d-flex">
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value}
                onChange={onChange}
                list="autocomplete-widget"
            />
            <datalist id="autocomplete-widget">{options}</datalist>
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
};
