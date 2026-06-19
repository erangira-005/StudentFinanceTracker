export function convertAmount(
    amount,
    currency,
    eurRate,
    rwfRate
){

    switch(currency){

        case "USD":

            return amount;

        case "EUR":

            return amount * eurRate;

        case "RWF":

            return amount * rwfRate;

        default:

            return amount;

    }

}