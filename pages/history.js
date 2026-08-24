import { allExpenses } from '/js/expenses.js';
import { allIncomes } from '/js/incomes.js';

export function init() {
    const monthSelect = document.getElementById('monthSelect');

    populateMonthSelect(monthSelect);

    monthSelect.addEventListener('change', () => {
        const [year, month] = monthSelect.value.split('-').map(Number);
        render(month, year);
    });

    document.addEventListener('transactions-changed', () => {
        const previousValue = monthSelect.value;
        populateMonthSelect(monthSelect);
<<<<<<< HEAD
        // On garde le mois sélectionné s'il existe encore, sinon on retombe sur le premier
=======
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
        if ([...monthSelect.options].some(opt => opt.value === previousValue)) {
            monthSelect.value = previousValue;
        }
        const [year, month] = monthSelect.value.split('-').map(Number);
        render(month, year);
    });

<<<<<<< HEAD
    // Affichage initial : mois en cours si dispo, sinon le plus récent
=======
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    const [year, month] = monthSelect.value.split('-').map(Number);
    render(month, year);
}

/*============ Construit la liste déroulante des mois disponibles ============*/
function populateMonthSelect(monthSelect) {
    const allTransactions = [...allExpenses, ...allIncomes];

    const monthsSet = new Set(
        allTransactions.map((t) => `${t.date.getFullYear()}-${t.date.getMonth()}`)
    );

<<<<<<< HEAD
    // On s'assure que le mois en cours est toujours proposé, même sans transaction
    const now = new Date();
    monthsSet.add(`${now.getFullYear()}-${now.getMonth()}`);

    const monthsArray = [...monthsSet].sort().reverse(); // du plus récent au plus ancien
=======
    const now = new Date();
    monthsSet.add(`${now.getFullYear()}-${now.getMonth()}`);

    const monthsArray = [...monthsSet].sort().reverse(); 
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc

    monthSelect.innerHTML = '';
    monthsArray.forEach((key) => {
        const [y, m] = key.split('-').map(Number);
        const label = new Date(y, m).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

        const option = document.createElement('option');
        option.value = key;
        option.textContent = label.charAt(0).toUpperCase() + label.slice(1);
        monthSelect.appendChild(option);
    });

    monthSelect.value = `${now.getFullYear()}-${now.getMonth()}`;
}

/*============ Affiche les transactions du mois choisi ============*/
function render(month, year) {
    const currencyOption = { style: "currency", currency: "USD" };
    const formatter = new Intl.NumberFormat("en-US", currencyOption);

    const historyList = document.getElementById('historyList');
    const monthSummary = document.getElementById('monthSummary');
    if (!historyList) return;

    const monthTransactions = [
        ...allExpenses.filter(e => e.date.getMonth() === month && e.date.getFullYear() === year).map(e => ({ ...e, type: 'expense' })),
        ...allIncomes.filter(i => i.date.getMonth() === month && i.date.getFullYear() === year).map(i => ({ ...i, type: 'income' }))
    ].sort((a, b) => b.date - a.date);

    const monthTotal = monthTransactions.reduce((acc, t) => {
        return acc + (t.type === 'expense' ? -t.amount : t.amount);
    }, 0);

    monthSummary.innerHTML = `Solde du mois : <span class="font-semibold ${monthTotal >= 0 ? 'text-green-500' : 'text-red-500'}">${monthTotal >= 0 ? '+' : ''}${formatter.format(monthTotal)}</span>`;

    historyList.innerHTML = '';

    if (monthTransactions.length === 0) {
        historyList.innerHTML = `<li class="py-3 text-sm text-gray-400 italic">Aucune transaction ce mois-ci</li>`;
        return;
    }

    monthTransactions.forEach((t) => {
        const sign = t.type === 'expense' ? '-' : '+';
        const colorClass = t.type === 'expense' ? 'text-red-500' : 'text-green-500';

        const li = document.createElement('li');
        li.className = "flex justify-between items-center py-2.5 text-sm";
        li.innerHTML = `
            <div class="text-left">
                <p class="font-semibold text-slate-800 dark:text-white capitalize">${t.category}</p>
                <p class="text-xs text-gray-400">${t.date.toLocaleDateString('fr-FR')}</p>
            </div>
            <span class="font-bold ${colorClass}">${sign}${formatter.format(t.amount)}</span>
        `;
        historyList.appendChild(li);
    });
}