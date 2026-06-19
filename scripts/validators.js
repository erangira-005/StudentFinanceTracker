// Description validation
export function validateDescription(description) {

    const regex = /^\S(?:.*\S)?$/;

    return regex.test(description);

}


// Amount validation
export function validateAmount(amount) {

    const regex =
        /^(0|[1-9]\d*)(\.\d{1,2})?$/;

    return regex.test(amount);

}


// Date validation
export function validateDate(date) {

    const regex =
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    return regex.test(date);

}


// Category validation
export function validateCategory(category) {

    const regex =
        /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    return regex.test(category);

}


// Advanced regex (back-reference) - catches repeated words like "coffee coffee"
export function hasDuplicateWords(text) {

    const regex =
        /\b(\w+)\s+\1\b/i;

    return regex.test(text);

}