export function isValidTransaction(transaction){

    return (

        transaction.id &&

        typeof transaction.description
        === "string"

        &&

        transaction.description.trim().length > 0

        &&

        typeof transaction.amount
        === "number"

        &&

        transaction.amount >= 0

        &&

        typeof transaction.category
        === "string"

        &&

        typeof transaction.date
        === "string"

        &&

        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(transaction.date)

        &&

        transaction.createdAt

        &&

        transaction.updatedAt

    );

}