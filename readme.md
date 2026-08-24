# Smart Ledger

Smart Ledger is a personal finance dashboard for tracking expenses and income, built entirely with vanilla JavaScript — no frameworks, no backend, no build step.

<p align="center">
  <img src="/assets/screenshots/light.png" width="45%" />
  <img src="/assets/screenshots/dark.png" width="45%" />
</p>


## Features

- **Transactions** — add expenses and income, each tied to a category
- **Custom categories** — add or delete categories with an icon, separately for expenses and income
- **Dashboard**
  - Current balance, total expenses, total incomes (current month)
  - Expense / income breakdown by category (donut charts)
  - Monthly budget progress (radial bar)
  - Balance evolution over the month (area chart)
  - Spending intensity heatmap
- **History** — browse past transactions with a month selector
- **Settings** — set a nickname, set a monthly budget, reset all app data
- **Dark mode**
- **Fully offline** — all data is persisted in the browser via `localStorage`, no backend or account required

## Tech Stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Markup     | HTML5                                     |
| Styling    | Tailwind CSS v4 (CDN build), custom dark-mode variant |
| Logic      | Vanilla JavaScript (ES Modules)           |
| Charts     | [ApexCharts](https://apexcharts.com/)     |
| Icons      | [Lucide](https://lucide.dev/)             |
| Storage    | Browser `localStorage`                    |

No framework, no bundler, no package manager required to run the app.

## Project Structure

```
smart-ledger/
├── index.html               # App entry point / landing page
├── readme.md
├── .gitignore
├── assets/
│   ├── icons/
│   │   └── logo.png
│   └── screenshots/          # App screenshots used in this readme
├── css/
│   └── style.css
├── js/
│   ├── app.js                 # Shared app init / navigation logic
│   ├── render.js               # Chart rendering (ApexCharts) for the dashboard
│   ├── storage.js              # Central localStorage read/write helpers
│   ├── settings.js             # Nickname, monthly budget, currency
│   ├── expenses.js             # Expense transactions + expense categories
│   └── incomes.js              # Income transactions + income categories
└── pages/
    ├── dashboard.html / dashboard.js    # Dashboard page (KPIs, charts)
    ├── transaction.html / transaction.js # Add/manage transactions
    ├── history.html / history.js         # Browse past transactions
    └── settings.html / settings.js       # App settings
```

Each page under `pages/` is its own standalone HTML file paired with a dedicated JS controller, sharing common logic from `js/` (storage, rendering, settings).

## Screenshots

<p align="center">
  <img src="/assets/screenshots/reducelight.png" width="45%" />
  <img src="/assets/screenshots/reducedark.png" width="45%" />
</p>

<p align="center">
  <img src="/assets/screenshots/dark.png" width="45%" />
  <img src="/assets/screenshots/transaction.png" width="45%" />
</p>

<p align="center">
  <img src="/assets/screenshots/settings.png" width="45%" />
  <img src="/assets/screenshots/history.png" width="45%" />
</p>

## Getting Started

The app uses native ES Modules (`<script type="module">`), which browsers block from `file://` due to CORS. You need a local server — any of the following work:

```bash
# Option 1: Python (built-in on most systems)
python -m http.server

# Option 2: Node.js
npx serve .

# Option 3: VS Code
# Right-click index.html → "Open with Live Server"
```

Then open the printed local URL (e.g. `http://localhost:8000`) in your browser.

## How Data Is Stored

All data lives in the browser's `localStorage`, under keys prefixed with `smartledger_` (see `js/storage.js`). Nothing is sent to a server — clearing your browser storage or using a different browser/device will reset the app.

Modules communicate through two custom events dispatched on `document`:

- `transactions-changed` — fired on any transaction add/delete
- `categories-changed` — fired on any category add/delete

Any page can listen for these to keep itself in sync without a shared state manager.

## Roadmap

- [ ] Edit existing transactions (currently add/delete only)
- [ ] Export / import data as JSON
- [ ] Multi-currency support

## License

MIT