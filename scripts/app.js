import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    hasDuplicateWords
}from "./validators.js";

import { compileRegex } 
from "./search.js";

import { transactions } from "./state.js";

import { renderTable }
from "./ui.js";

import { updateDashboard }
from "./dashboard.js";

import {
    saveTransactions,
    loadTransactions
}
from "./storage.js";

import {
    isValidTransaction
}
from "./importValidator.js";

import {
    attachDeleteEvents,
    attachEditEvents,
    getEditingId,
    clearEditingId
}
from "./ui.js";

const budgetCap =
    document.getElementById("budget-cap");

const form =
    document.getElementById("transaction-form");

const statusMessage =
    document.getElementById("status-message");

const searchInput =
    document.getElementById("search");

const caseCheckbox =
    document.getElementById("case-insensitive");

const sortSelect =
    document.getElementById("sort-select");

const exportBtn =
    document.getElementById("export-btn" );

const importFile =
    document.getElementById("import-file");

const importBtn =
    document.getElementById("import-btn");

const currency =
    document.getElementById("currency");

const eurRate =
    document.getElementById("eur-rate");

const rwfRate =
    document.getElementById("rwf-rate");

const submitBtn =
    document.getElementById("submit-btn");

const cancelEditBtn =
    document.getElementById("cancel-edit-btn");

const descInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const descError = document.getElementById("description-error");
const amountError = document.getElementById("amount-error");
const categoryError = document.getElementById("category-error");
const dateError = document.getElementById("date-error");


// shows or clears one field's error message + aria-invalid
function showError(input, errorEl, message){

    if(message){

        errorEl.textContent = message;

        input.setAttribute("aria-invalid", "true");

        input.classList.add("input-error");

    }

    else{

        errorEl.textContent = "";

        input.setAttribute("aria-invalid", "false");

        input.classList.remove("input-error");

    }

}

// resets the form back to "Add" mode
function resetFormToAddMode(){

    clearEditingId();

    form.reset();

    submitBtn.textContent = "Add Transaction";

    cancelEditBtn.hidden = true;

    showError(descInput, descError, "");
    showError(amountInput, amountError, "");
    showError(categoryInput, categoryError, "");
    showError(dateInput, dateError, "");

}


currency.addEventListener(

    "change",

    function(){

        renderTable();

        updateDashboard();

    }

);

eurRate.addEventListener(

    "input",

    function(){

        renderTable();

        updateDashboard();

    }

);


rwfRate.addEventListener(

    "input",

    function(){

        renderTable();

        updateDashboard();

    }

);


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const description =
        descInput.value;

    const amount =
        amountInput.value;

    const category =
        categoryInput.value;

    const date =
        dateInput.value;

    // run every field through its validator and show
    // a message right next to that specific field
    let hasError = false;

    if (!validateDescription(description)) {

        showError(descInput, descError, "No leading/trailing spaces, and not empty.");

        hasError = true;

    }
    else if (hasDuplicateWords(description)) {

        showError(descInput, descError, "Remove the duplicate word.");

        hasError = true;

    }
    else {

        showError(descInput, descError, "");

    }

    if (!validateAmount(amount)) {

        showError(amountInput, amountError, "Use a format like 12.50 (no leading zeros, max 2 decimals).");

        hasError = true;

    }
    else {

        showError(amountInput, amountError, "");

    }

    if (!validateDate(date)) {

        showError(dateInput, dateError, "Use YYYY-MM-DD format with a real date.");

        hasError = true;

    }
    else {

        showError(dateInput, dateError, "");

    }

    if (!validateCategory(category)) {

        showError(categoryInput, categoryError, "Letters, spaces and hyphens only.");

        hasError = true;

    }
    else {

        showError(categoryInput, categoryError, "");

    }

    if(hasError){

        statusMessage.textContent =
            "Please fix the errors above before saving.";

        return;

    }

    const editingId = getEditingId();

    if(editingId){

        // we're editing an existing transaction
        const transaction =
            transactions.find(t => t.id === editingId);

        if(transaction){

            transaction.description = description;
            transaction.amount = Number(amount);
            transaction.category = category;
            transaction.date = date;
            transaction.updatedAt = new Date().toISOString();

        }

        statusMessage.textContent =
            "Transaction updated successfully.";

    }
    else{

        // we're adding a brand new transaction
        const transaction = {

            id: "txn_" + Date.now(),

            description,

            amount: Number(amount),

            category,

            date,

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()

        };

        transactions.push(transaction);

        statusMessage.textContent =
            "Transaction added successfully.";

    }

    saveTransactions(transactions);

    renderTable();

    attachDeleteEvents();

    attachEditEvents();

    updateDashboard();

    resetFormToAddMode();

});


cancelEditBtn.addEventListener(

    "click",

    function(){

        resetFormToAddMode();

        statusMessage.textContent =
            "Edit cancelled.";

    }

);


searchInput.addEventListener(

    "input",

    function () {

        const pattern =
            searchInput.value;

        const flags =
            caseCheckbox.checked
                ? "gi"
                : "g";

        const regex =
            compileRegex(
                pattern,
                flags
            );

        const searchError =
            document.getElementById("search-error");

        if(pattern && !regex){

            searchError.textContent =
                "Invalid regex pattern.";

        }
        else{

            searchError.textContent = "";

        }

        renderTable(regex);

    }

);

sortSelect.addEventListener(
"change",

function(){

    switch(sortSelect.value){

        case "amount":

            transactions.sort(
                (a,b)=>
                a.amount-b.amount
            );

            break;

        case "description":

            transactions.sort(
                (a,b)=>
                a.description.localeCompare(
                    b.description
                )
            );

            break;

        default:

            transactions.sort(
                (a,b)=>
                new Date(a.date)
                -
                new Date(b.date)
            );

    }

    renderTable();
 });
    
 budgetCap.addEventListener(

    "input",

    function () {

        updateDashboard();

    }

);

transactions.push(
    ...loadTransactions()
);

renderTable();

attachDeleteEvents();

attachEditEvents();

updateDashboard();

exportBtn.addEventListener("click",
 function(){

        const data =
            JSON.stringify(
                transactions,
                null,
                2
            );

        const blob =
            new Blob(
                [data],
                {
                    type:
                    "application/json"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "transactions.json";

        link.click();

        URL.revokeObjectURL(url);

        statusMessage.textContent =
            "Export complete — check your downloads.";

    }

);

importBtn.addEventListener(

    "click",

    function(){

        const file =
            importFile.files[0];

        if(!file){

            alert(
                "Select a JSON file first."
            );

            return;

        }

        const reader =
            new FileReader();

        reader.onload =
            function(event){

                try{

                    const data =
                        JSON.parse(
                            event.target.result
                        );

                    if(

                        Array.isArray(data)

                        &&

                        data.every(
                            isValidTransaction
                        )

                    ){

                        transactions.length = 0;

                        transactions.push(
                            ...data
                        );

                        saveTransactions(
                            transactions
                        );

                        renderTable();

                        attachDeleteEvents();

                        attachEditEvents();

                        updateDashboard();

                        statusMessage.textContent =
                            "Import successful.";

                    }

                    else{

                        statusMessage.textContent =
                            "Invalid JSON structure.";

                    }

                }

                catch{

                    statusMessage.textContent =
                        "Invalid JSON file.";

                }

            };

        reader.readAsText(file);

        importFile.value = "";

    }

);

// highlight the nav link for whichever section is currently in view
const navLinks =
    document.querySelectorAll("nav a");

const sections =
    document.querySelectorAll("main section");

function setActiveLink(){

    let currentId = sections[0].id;

    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        // header height is roughly 70-80px, so treat anything
        // scrolled past that point as "currently in view"
        if(rect.top <= 90){

            currentId = section.id;

        }

    });

    navLinks.forEach(link => {

        const isActive =
            link.getAttribute("href") === "#" + currentId;

        link.classList.toggle(
            "active-link",
            isActive
        );

    });

}

window.addEventListener("scroll", setActiveLink);

// run once on load so a link is highlighted immediately
setActiveLink();