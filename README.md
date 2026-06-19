# Student Finance Tracker

A responsive, accessible web app for tracking student expenses, built with vanilla HTML, CSS and JavaScript.

**Live demo:** https://erangira-005.github.io/StudentFinanceTracker/
**Repository:** https://github.com/erangira-005/StudentFinanceTracker
## Demo Video:** https://www.loom.com/share/1d0880719d594d829dece6e36cc6d26f
---

## Theme

**Student Finance Tracker** — log transactions, set a monthly budget cap, search records using regex patterns, and track spending by category and over time.

---

## Features

- **About** — purpose of the app and contact info
- **Dashboard** — total transactions, total spending, top category, budget cap with remaining/over-budget status, and a 7-day spending trend chart
- **Add / Edit Transaction** — single form used for both adding new transactions and editing existing ones, with real-time validation per field
- **Records** — full transaction table with live regex search, case-insensitive toggle, sorting by date / description / amount, and `<mark>` highlighting of matches
- **Settings** — currency selection (USD base + EUR + RWF), manual exchange rates, JSON export, and JSON import with structure validation

---

## Regex Catalog

| Rule | Pattern | Purpose | Matches | Rejects |
|---|---|---|---|---|
| Description | `/^\S(?:.*\S)?$/` | No leading/trailing spaces | `"Coffee"` | `" Coffee "` |
| Amount | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | Valid money format, max 2 decimals | `"12.50"`, `"0"` | `"012"`, `"12.555"` |
| Date | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | YYYY-MM-DD format | `"2026-06-19"` | `"19-06-2026"`, `"2026-13-40"` |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Letters, spaces, hyphens only | `"Food"`, `"Eating Out"` | `"Food123"` |
| **Advanced — back-reference** | `/\b(\w+)\s+\1\b/i` | Detects a repeated word | `"coffee coffee"` | `"coffee tea"` |

### Example search patterns to try

- `coffee` — find all coffee-related transactions
- `\.\d{2}\b` — find amounts with cents present (e.g. `12.50`)
- `(coffee\|tea)` — find any beverage transaction, case-insensitive
- `2026-06` — find every transaction from June 2026
- `\b(\w+)\s+\1\b` — find any record with a duplicated word in its description

Search checks the **description, category, date, and amount** fields, and only shows rows that match — non-matching rows are filtered out, not just left unhighlighted.

---

## Keyboard Map

| Key | Action |
|---|---|
| `Tab` | Move forward through links, inputs, and buttons |
| `Shift + Tab` | Move backward |
| `Enter` | Submit the active form / activate the focused button or link |
| `Tab` (first press on page load) | Reveals the "Skip to content" link |

All interactive elements have a visible focus outline. The skip link lets keyboard users jump straight past the header/nav into the main content. The nav also highlights whichever section is currently scrolled into view, so keyboard and mouse users alike always know where they are on the page.

---

## Accessibility Notes

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- One `<h1>` per page, with a logical `<h2>` per section
- Every input has an associated `<label>` (including visually-hidden labels where a placeholder already describes the field)
- Form errors appear in a `<span role="alert">` next to the relevant field, and toggle `aria-invalid` on the input itself
- `#status-message` and `#budget-status` use `role="status"` with `aria-live`, switching between `polite` (under budget) and `assertive` (over budget)
- Budget status is also color-coded (green/red) for sighted users, not just announced to screen readers
- Visible focus outline on every input, button, and link
- Tested and confirmed responsive at three breakpoints: ~360–430px (mobile), 768px (tablet), and 1024px+ (desktop) — nav, dashboard grid, and table all adapt correctly at each size
- Respects `prefers-reduced-motion` for users with motion sensitivity

See [`a11y-plan.md`](./a11y-plan.md) for the full reasoning behind these decisions.

---

## Data Model

```json
{
  "id": "txn_1",
  "description": "Coffee",
  "amount": 5,
  "category": "Food",
  "date": "2026-06-19",
  "createdAt": "2026-06-19T10:00:00Z",
  "updatedAt": "2026-06-19T10:00:00Z"
}
```

Default categories: Food, Books, Transport, Entertainment, Fees (freely editable by typing any category name in the form).

See [`data-model.md`](./data-model.md) for full field-by-field documentation.

---

## Currency

- Base currency: **USD**
- Also supports: **EUR**, **RWF**
- Exchange rates are entered manually in Settings — no external API calls

---

## How to Run

This app uses ES modules, so it needs to be served over `http://`, not opened directly as a `file://` path.

```bash
# Option 1 — Python
python3 -m http.server 5500

# Option 2 — VS Code "Live Server" extension
# Right-click index.html → Open with Live Server
```

Then visit `http://127.0.0.1:5500` in your browser.

## How to Run Tests

Open `tests.html` in the browser (served the same way as above). It runs a set of assertions against the validators, the regex search compiler, the highlight function, and the import validator, and shows a pass/fail result for each one, plus a summary count at the bottom.

---

## File Structure

├── index.html

├── tests.html

├── seed.json

├── README.md

├── data-model.md

├── a11y-plan.md

├── WIREFRAME.md

├── styles/

│   └── style.css

└── scripts/

├── app.js              entry point — wires up event listeners, active-nav-link tracking

├── state.js            holds the transactions array

├── storage.js          localStorage save/load

├── validators.js       4 regex rules + advanced back-reference rule

├── search.js           safe regex compiler, highlight, filter

├── ui.js                renders the table, handles edit/delete

├── dashboard.js        stats, budget cap, 7-day trend chart

├── currency.js          currency conversion logic

└── importValidator.js  validates structure of imported JSON


## Notes

- Sample data is provided in `seed.json` — import it via Settings → Import JSON to quickly populate the app with test records.
- All data is stored in the browser's `localStorage` under the key `finance-data`. Clearing browser storage will reset the app.

## References

This project was built independently as coursework, with the following resources consulted for specific implementation patterns:

- [W3Schools — CSS Position: Sticky](https://www.w3schools.com/howto/howto_css_sticky_navbar.asp) — referenced for the sticky header navigation pattern
- [W3Schools — HTML5 Web Storage API](https://www.w3schools.com/html/html5_webstorage.asp) — referenced for the `localStorage` save/load pattern used in `storage.js`
- [W3Schools — JavaScript File API](https://www.w3schools.com/jsref/api_file.asp) — referenced for the `FileReader` pattern used when importing JSON
- [W3Schools — CSS RWD Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) — referenced for the responsive breakpoint structure

AI assistance (Claude) was used to help structure and word this README file, and to review/debug code I had already written. All core logic, validation rules, and feature implementation are my own work.
