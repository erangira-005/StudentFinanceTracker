export function compileRegex(
    input,
    flags = "i"
){

    try{

        return input
            ? new RegExp(input, flags)
            : null;

    }

    catch{

        return null;

    }

}

export function highlight(text, re){

    if(!re)
        return text;

    try{

        return text.replace(
            re,
            match => `<mark>${match}</mark>`
        );

    }

    catch{

        return text;

    }

}


// checks one transaction against the regex across
// description, category and date - so searching for
// a date like "2026-06" actually filters the table
export function matchesRecord(transaction, re){

    if(!re)
        return true;

    return (

        re.test(transaction.description)

        ||

        re.test(transaction.category)

        ||

        re.test(transaction.date)

        ||

        re.test(String(transaction.amount))

    );

}


// returns only the transactions that match the pattern
// (or all of them if no pattern was entered)
export function filterRecords(transactions, re){

    if(!re)
        return transactions;

    return transactions.filter(

        transaction => matchesRecord(transaction, re)

    );

}