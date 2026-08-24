// transactions.js
import { allExpenses, addExpense, deleteExpense, expenseCategories } from '/js/expenses.js';
import { allIncomes, addIncome, deleteIncome, incomeCategories } from '/js/incomes.js';

let currentType = 'expense';
let selectedCategory = '';

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function init() {
    const btnExpense = document.getElementById('btnExpense');
    const btnIncome = document.getElementById('btnIncome');
    const amountInput = document.getElementById('amountInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const submitBtn = document.getElementById('submitBtn');
    const transactionForm = document.getElementById('transactionForm');
    const categoriesGrid = document.getElementById('categoriesGrid');
    const incomesList = document.getElementById('recentIncomesList');
    const expensesList = document.getElementById('recentExpensesList');

    /*============ Catégories ============*/
    function renderCategoryPills() {
        if (!categoriesGrid) return;
        categoriesGrid.innerHTML = '';

        let currentList = expenseCategories;
        if (currentType === 'income') {
            currentList = incomeCategories;
        }

        for (let i = 0; i < currentList.length; i++) {
            const cat = currentList[i];

            const button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = `<span class="text-xl mb-1">${cat.icon}</span> ${cat.name}`;

            const isSelected = selectedCategory === cat.name;

            if (isSelected && currentType === 'expense') {
                button.className = "flex flex-col items-center justify-center p-3 bg-red-500 text-white rounded-xl border-2 border-red-600 shadow-sm text-sm font-semibold hover:scale-105";
            } else if (isSelected && currentType === 'income') {
                button.className = "flex flex-col items-center justify-center p-3 bg-green-500 text-white rounded-xl border-2 border-green-600 shadow-sm text-sm font-semibold hover:scale-105";
            } else {
                button.className = "flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-slate-700 rounded-xl border-2 border-transparent transition-all hover:scale-105 text-sm font-semibold text-slate-700 dark:text-slate-200";
            }

            button.addEventListener('click', () => {
                selectedCategory = cat.name;
                renderCategoryPills();
            });

            categoriesGrid.appendChild(button);
        }
    }

    function renderList(listEl, items, sign, colorClass, emptyText, deleteFn) {
        if (!listEl) return;
        listEl.innerHTML = '';

        const recentItems = items.slice(-5).reverse();

        if (recentItems.length === 0) {
            listEl.innerHTML = `<li class="text-xs text-gray-400 italic">${emptyText}</li>`;
            return;
        }

        for (let i = 0; i < recentItems.length; i++) {
            const item = recentItems[i];
            const subText = item.description || item.date || 'No description';

            const li = document.createElement('li');
            li.className = "flex justify-between items-center bg-gray-50 dark:bg-slate-900 p-2.5 rounded-xl text-sm";
            li.innerHTML = `
                <div class="text-left">
                    <p class="font-semibold text-slate-800 dark:text-white">${item.category}</p>
                    <p class="text-xs text-gray-400">${subText}</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-bold ${colorClass}">${sign}${formatter.format(item.amount)}</span>
                    <button type="button" class="delete-btn text-gray-400 hover:text-red-500 transition-colors" data-id="${item.id}">✕</button>
                </div>
            `;
            listEl.appendChild(li);
        }

        listEl.querySelectorAll('.delete-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                deleteFn(btn.dataset.id);
                updateLists();
            });
        });
    }

    function updateLists() {
        renderList(expensesList, allExpenses, '-', 'text-red-500', 'No recent expenses', deleteExpense);
        renderList(incomesList, allIncomes, '+', 'text-green-500', 'No recent incomes', deleteIncome);
    }

    /*============ Bascule dépense / revenu ============*/
    btnExpense.addEventListener('click', () => {
        currentType = 'expense';
        selectedCategory = '';

        btnExpense.className = "w-full py-2 text-sm font-semibold rounded-md bg-red-500 text-white transition-all shadow-sm";
        btnIncome.className = "w-full py-2 text-sm font-semibold rounded-md text-gray-500 dark:text-gray-400 transition-all";
        amountInput.classList.remove('focus:ring-green-500');
        amountInput.classList.add('focus:ring-red-500');
        submitBtn.className = "w-full py-3 bg-red-500 text-white font-bold rounded-xl shadow-md hover:bg-red-600 transition-colors";
        submitBtn.textContent = "Save Expense";

        renderCategoryPills();
    });

    btnIncome.addEventListener('click', () => {
        currentType = 'income';
        selectedCategory = '';

        btnIncome.className = "w-full py-2 text-sm font-semibold rounded-md bg-green-500 text-white transition-all shadow-sm";
        btnExpense.className = "w-full py-2 text-sm font-semibold rounded-md text-gray-500 dark:text-gray-400 transition-all";
        amountInput.classList.remove('focus:ring-red-500');
        amountInput.classList.add('focus:ring-green-500');
        submitBtn.className = "w-full py-3 bg-green-500 text-white font-bold rounded-xl shadow-md hover:bg-green-600 transition-colors";
        submitBtn.textContent = "Save Income";

        renderCategoryPills();
    });

    /*============ Soumission du formulaire ============*/
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = parseFloat(amountInput.value);
        const description = descriptionInput.value.trim();

        if (!selectedCategory) {
            alert("Please select a category capsule first!");
            return;
        }
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (currentType === 'expense') {
            addExpense(amount, selectedCategory);
        } else {
            addIncome(amount, selectedCategory, description);
        }

        amountInput.value = '';
        descriptionInput.value = '';
        selectedCategory = '';

        renderCategoryPills();
        updateLists();
    });

    renderCategoryPills();
    updateLists();
}