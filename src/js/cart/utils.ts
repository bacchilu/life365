interface Cart {
    courier: number;
    tax_value: number;
    dropshipping: boolean;
    payment_type: string;
    empty: boolean;
    addr: {spedizione: {nazione: number; provincia: number}};
    items: {prezzo: number; qta: number; tax_value: number; peso: number}[];
}

interface ShippingFees {
    [a: number]: {[b: number]: {city: number | null; dropship: boolean; cash: boolean; rows: {[a: number]: number}}[]};
}

export const CartUtils = (function () {
    const doEvalShippingCost = function (cart: Cart, shippingFees: ShippingFees) {
        if (cart.empty) return 0;

        const weight = cart.items.reduce(function (acc, item) {
            return acc + item.peso;
        }, 0);
        const shippingFeeByCountry = shippingFees[cart.courier][cart.addr.spedizione.nazione];
        const res = shippingFeeByCountry.find(function (item) {
            return item.city === cart.addr.spedizione.provincia;
        });
        const res2 =
            res !== undefined
                ? res
                : shippingFeeByCountry.find(function (item) {
                      return item.city === null;
                  });
        console.assert(res2 !== undefined);
        if (cart.dropshipping) console.assert(res2!.dropship);
        if (['CONTRASSEGNO-ASSEGNO', 'CONTRASSEGNO-CONTANTI'].includes(cart.payment_type)) console.assert(res2!.cash);
        const rows = res2!.rows;
        const indexRow = Math.max(
            ...Object.keys(rows)
                .map(function (w) {
                    return parseInt(w);
                })
                .filter(function (w) {
                    return w <= weight;
                })
        );
        return rows[indexRow];
    };

    return {
        evalTotal: function (cart: Cart, shippingFees: ShippingFees) {
            const sum = cart.items
                .map(function (item) {
                    const res = item.prezzo * item.qta;
                    return res + (res * item.tax_value) / 100;
                })
                .reduce(function (acc, item) {
                    return acc + item;
                }, 0);
            const shippingCost = doEvalShippingCost(cart, shippingFees);
            return sum + shippingCost + (shippingCost * cart.tax_value) / 100;
        },
        evalShippingCost: doEvalShippingCost,
    };
})();
