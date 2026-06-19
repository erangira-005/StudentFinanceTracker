const KEY = "finance-data";

export function saveTransactions(data){

    localStorage.setItem(
        KEY,
        JSON.stringify(data)
    );

}


export function loadTransactions(){

    return JSON.parse(

        localStorage.getItem(KEY)

        ||

        "[]"

    );

}