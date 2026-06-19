import { convertAmount }
from "./currency.js";

import { transactions } from "./state.js";

export function updateDashboard() {


    // Total records
    document.getElementById("total-records")
        .textContent = transactions.length;


    // Total amount
    const total = transactions.reduce(

    (sum, transaction) =>

        sum + transaction.amount,

    0

);


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


const convertedTotal =
    convertAmount(
        total,
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

      document.getElementById("total-amount")
    .textContent =
    symbol +
    convertedTotal.toFixed(2);

    // Top category
    const categoryCount = {};

    transactions.forEach(transaction => {

        if (categoryCount[transaction.category]) {

            categoryCount[transaction.category]++;

        }

        else {

            categoryCount[transaction.category] = 1;

        }

    });

    let topCategory = "None";

    let maxCount = 0;

    for (let category in categoryCount) {

        if (categoryCount[category] > maxCount) {

            maxCount = categoryCount[category];

            topCategory = category;

        }

    }

    document.getElementById("top-category")
        .textContent = topCategory;

        const budgetCap =
    Number(
        document.getElementById("budget-cap").value
    );

const budgetStatus =
    document.getElementById("budget-status");

if (budgetCap > 0) {

    const remaining =
        budgetCap - total;

    if (remaining >= 0) {

    budgetStatus.textContent =
        `Remaining budget: $${remaining.toFixed(2)}`;

    budgetStatus.setAttribute(
        "aria-live",
        "polite"
    );

    budgetStatus.classList.remove("budget-over");
    budgetStatus.classList.add("budget-ok");

}

else {

    budgetStatus.textContent =
        `Over budget by $${Math.abs(remaining).toFixed(2)}`;

    budgetStatus.setAttribute(
        "aria-live",
        "assertive"
    );

    budgetStatus.classList.remove("budget-ok");
    budgetStatus.classList.add("budget-over");

}

}

else {

    budgetStatus.textContent =
        "No budget set.";

    budgetStatus.setAttribute(
        "aria-live",
        "polite"
    );

}


    // Last 7 days trend chart
    // NOTE: this used to be outside the function by mistake,
    // so it only ran once on page load and never updated.
    // moved it inside updateDashboard() so it refreshes every time.
    const chart =
        document.getElementById("trend-chart");

    chart.innerHTML = "";

    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    days.forEach(day => {

        const count =
            transactions.filter(transaction => {

                const date =
                    new Date(transaction.date);

                return (
                    days[date.getDay()]
                    === day
                );

            }).length;


        chart.innerHTML += `

        <div class="bar-row">

            <span>${day}</span>

            <div
                class="bar"
                style="width:${count * 30}px"
                role="img"
                aria-label="${day}: ${count} transaction${count === 1 ? '' : 's'}">
            </div>

        </div>

        `;

    });

}
