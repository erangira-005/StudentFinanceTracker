import { transactions } from "./state.js";

import { highlight, filterRecords } from "./search.js";

import { convertAmount }
from "./currency.js";

import { saveTransactions }
from "./storage.js";

import { updateDashboard }
from "./dashboard.js";

import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    hasDuplicateWords
}
from "./validators.js";

// keeps track of which transaction we're editing
// null = we're adding a new one, not editing
let editingId = null;

export function getEditingId(){

    return editingId;

}

export function setEditingId(id){

    editingId = id;

}

export function clearEditingId(){

    editingId = null;

}


export function attachDeleteEvents(){

    const deleteButtons =
        document.querySelectorAll(
            ".delete-btn"
        );

    deleteButtons.forEach(button => {

        button.addEventListener(

            "click",

            function(){

                const id =
                    button.dataset.id;

                if(

                    confirm(
                        "Delete this transaction?"
                    )

                ){

                    const index =
                        transactions.findIndex(

                            transaction =>

                            transaction.id === id

                        );

                    if(index !== -1){

                        transactions.splice(
                            index,
                            1
                        );

                        saveTransactions(
                            transactions
                        );

                        renderTable();

                        updateDashboard();

                        attachDeleteEvents();

                        attachEditEvents();

                        const statusMessage =
                            document.getElementById("status-message");

                        statusMessage.textContent =
                            "Transaction deleted.";

                    }

                }

            }

        );

    });

}

// instead of using prompt(), this now loads the transaction
// into the actual form so it goes through the same regex validation
export function attachEditEvents(){

    const editButtons =
        document.querySelectorAll(
            ".edit-btn"
        );

    editButtons.forEach(button => {

        button.addEventListener(

            "click",

            function(){

                const id =
                    button.dataset.id;

                const transaction =
                    transactions.find(

                        transaction =>

                        transaction.id === id

                    );

                if(!transaction)
                    return;

                // fill the form with this transaction's data
                document.getElementById("description").value =
                    transaction.description;

                document.getElementById("amount").value =
                    transaction.amount;

                document.getElementById("category").value =
                    transaction.category;

                document.getElementById("date").value =
                    transaction.date;

                // remember which one we're editing
                setEditingId(id);

                // change the button text and show cancel button
                const submitBtn =
                    document.getElementById("submit-btn");

                submitBtn.textContent =
                    "Save Changes";

                document.getElementById("cancel-edit-btn")
                    .hidden = false;

                // scroll up and focus the form so keyboard users
                // land right where they need to be
                document.getElementById("form-section")
                    .scrollIntoView({ behavior: "smooth" });

                document.getElementById("description").focus();

                document.getElementById("status-message").textContent =
                    "Editing transaction. Make changes and click Save Changes.";

            }

        );

    });

}

export function renderTable(re = null){

    const tableBody =
        document.getElementById("table-body");

    tableBody.innerHTML = "";

    // only keep the transactions that actually match the
    // search pattern - description, category, date, and amount
    // all get checked, not just description
    const visibleTransactions =
        filterRecords(transactions, re);

    const resultsCount =
        document.getElementById("results-count");

    if(resultsCount){

        resultsCount.textContent =

            re

            ? `${visibleTransactions.length} of ${transactions.length} transactions match`

            : `${transactions.length} transaction${transactions.length === 1 ? "" : "s"}`;

    }

    if(visibleTransactions.length === 0){

        tableBody.innerHTML = `
        <tr>
            <td colspan="5">
                ${re ? "No transactions match that pattern." : "No transactions found."}
            </td>
        </tr>
        `;

        return;

    }

    visibleTransactions.forEach(transaction => {

        const currency =
    document.getElementById("currency").value;

const eurRate =
    Number(
        document.getElementById("eur-rate").value
    );

const rwfRate =
    Number(
        document.getElementById("rwf-rate").value
    );

const converted =
    convertAmount(
        transaction.amount,
        currency,
        eurRate,
        rwfRate
    );

let symbol;

switch(currency){

    case "USD":
        symbol = "$";
        break;

    case "EUR":
        symbol = "€";
        break;

    case "RWF":
        symbol = "RWF ";
        break;

    default:
        symbol = "";
}

       tableBody.innerHTML += `
<tr>

<td>${highlight(transaction.description,re)}</td>

<td>${highlight(symbol + converted.toFixed(2),re)}</td>

<td>${highlight(transaction.category,re)}</td>

<td>${highlight(transaction.date,re)}</td>

<td>

    <button
        class="edit-btn"
        data-id="${transaction.id}"
        aria-label="Edit ${transaction.description}">
        Edit
    </button>

    <button
        class="delete-btn"
        data-id="${transaction.id}"
        aria-label="Delete ${transaction.description}">
        Delete
    </button>

</td>

</tr>

        `;

    });

}