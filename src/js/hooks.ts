import useSWR from 'swr';

import {API} from './parameters';

interface Category {
    Descrizione: string;
    ID_Categoria: number;
    image: string;
    listaAziende: string;
    rappresentante: {
        email: string;
        skype: string;
    };
    slug: string;
    telefono: string;
}

const fetcher = async function (...args: [string]) {
    const res = await fetch(...args);
    return res.json();
};

export const useCategories = function () {
    const {data} = useSWR<Category[]>(`//${API}/warehouse/getCategories`, fetcher, {dedupingInterval: 60000});
    return data;
};
