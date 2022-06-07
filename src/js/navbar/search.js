import React from 'react';
import useSWR from 'swr';

import {API} from '../parameters.js';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useProducts = function (value) {
    const {data} = useSWR(
        value !== '' ? `//${API}/search/suggest?page=0&s=${encodeURIComponent(value)}` : null,
        fetcher,
        {
            dedupingInterval: 60000,
        }
    );
    return data === undefined
        ? undefined
        : data.results.map(function (item) {
              return {id: item.id, code: item.code};
          });
};

export const Search = function () {
    const [value, setValue] = React.useState('');
    const suggestions = useProducts(value.trim());
    // const [matchedProduct, setMatchedProduct] = React.useState(null);
    // React.useEffect(
    //     function () {
    //         if (suggestions === undefined) {
    //             setMatchedProduct(null);
    //             return;
    //         }
    //         const res = suggestions.find(function (item) {
    //             return item.code.toLowerCase().trim() === value.toLowerCase().trim();
    //         });
    //         setMatchedProduct(res === undefined ? null : res);
    //     },
    //     [value, suggestions]
    // );
    // React.useEffect(
    //     function () {
    //         console.log(matchedProduct);
    //     },
    //     [matchedProduct]
    // );
    // console.log(matchedProduct);

    const onChange = function (e) {
        setValue(e.target.value);
    };

    const options =
        suggestions === undefined
            ? null
            : suggestions.map(function (item) {
                  return <option key={item.id} value={item.code} />;
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
