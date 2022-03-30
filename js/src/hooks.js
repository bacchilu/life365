import useSWR from 'swr';

import {API} from './parameters.js';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useCategories = function () {
    return useSWR(`//${API}/warehouse/getCategories`, fetcher, {dedupingInterval: 60000});
};
