import { expenseCategories, addExpenseCategory, deleteExpenseCategory, resetExpenses } from '/js/expenses.js';
import { incomeCategories, addIncomeCategory, deleteIncomeCategory, resetIncomes } from '/js/incomes.js';
import { getSettings, updateSettings } from '/js/settings.js';
import { clearAll } from '/js/storage.js';

let currentType = 'expense';

export function init() {
    const btnExpense = document.getElementById('btnExpense');
    const btnIncome = document.getElementById('btnIncome');
    const categoriesUl = document.getElementById('categoriesUl');
    const addCategoryForm = document.getElementById('addCategoryForm');
    const newCategoryIcon = document.getElementById('newCategoryIcon');
    const newCategoryInput = document.getElementById('newCategoryInput');
    const addCategoryBtn = document.getElementById('addCategoryBtn');

    const nicknameInput = document.getElementById('nicknameInput');
    const settingsPreview = document.getElementById('settingsPreview');
    const resetAppBtn = document.getElementById('resetAppBtn');

    /*============ Affichage de la liste ============*/
    function renderCategoriesTable() {
        const list = currentType === 'expense' ? expenseCategories : incomeCategories;
        categoriesUl.innerHTML = '';

        if (list.length === 0) {
            const li = document.createElement('li');
            li.className = "py-3 text-sm text-gray-400 italic";
            li.textContent = "No categories yet";
            categoriesUl.appendChild(li);
            return;
        }

        for (let i = 0; i < list.length; i++) {
            const cat = list[i];

            const li = document.createElement('li');
            li.className = "flex justify-between items-center py-3";
            li.innerHTML = `
                <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${cat.icon || '📁'} ${cat.name}</span>
                <button type="button" class="delete-category-btn text-gray-400 hover:text-red-500 transition-colors" data-id="${cat.id}">✕</button>
            `;
            categoriesUl.appendChild(li);
        }

        categoriesUl.querySelectorAll('.delete-category-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const catId = Number(btn.dataset.id);
                const cat = list.find((c) => c.id === catId);

                const confirmed = confirm(`Delete category "${cat.name}"?`);
                if (!confirmed) return;

                if (currentType === 'expense') {
                    deleteExpenseCategory(catId);
                } else {
                    deleteIncomeCategory(catId);
                }
                renderCategoriesTable();
            });
        });
    }

    /*============ Ajout d'une catégorie ============*/
    addCategoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = newCategoryInput.value.trim();
        const icon = newCategoryIcon.value.trim() || '📁';
        if (!name) return;

        const list = currentType === 'expense' ? expenseCategories : incomeCategories;
        const alreadyExists = list.some((cat) => cat.name.toLowerCase() === name.toLowerCase());
        if (alreadyExists) {
            alert("This category already exists.");
            return;
        }

        if (currentType === 'expense') {
            addExpenseCategory(name, icon);
        } else {
            addIncomeCategory(name, icon);
        }

        newCategoryInput.value = '';
        newCategoryIcon.value = '';
        renderCategoriesTable();
    });

    /*============ Bascule dépense / revenu ============*/
    function setType(type) {
        currentType = type;

        if (type === 'expense') {
            btnExpense.className = "w-full py-2 text-sm font-semibold rounded-md bg-red-500 text-white transition-all shadow-sm";
            btnIncome.className = "w-full py-2 text-sm font-semibold rounded-md text-gray-500 dark:text-gray-400 transition-all";
            addCategoryBtn.className = "px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors";
        } else {
            btnIncome.className = "w-full py-2 text-sm font-semibold rounded-md bg-green-500 text-white transition-all shadow-sm";
            btnExpense.className = "w-full py-2 text-sm font-semibold rounded-md text-gray-500 dark:text-gray-400 transition-all";
            addCategoryBtn.className = "px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors";
        }

        renderCategoriesTable();
    }

    btnExpense.addEventListener('click', () => setType('expense'));
    btnIncome.addEventListener('click', () => setType('income'));

    /*============ Paramètres : pseudo ============*/
    function updateSettingsPreview() {
        const { nickname } = getSettings();
        settingsPreview.textContent = `Welcome, ${nickname || 'Guest'}`;
    }

    function loadSettingsIntoForm() {
        const { nickname } = getSettings();
        nicknameInput.value = nickname;
    }

    nicknameInput.addEventListener('input', () => {
        updateSettings({ nickname: nicknameInput.value.trim() });
        updateSettingsPreview();
    });

    const budgetInput = document.getElementById('budgetInput');

    // dans loadSettingsIntoForm()
    function loadSettingsIntoForm() {
        const { nickname, monthlyBudget } = getSettings();
        nicknameInput.value = nickname;
        budgetInput.value = monthlyBudget || '';
    }

    // nouveau listener
    budgetInput.addEventListener('input', () => {
        updateSettings({ monthlyBudget: parseFloat(budgetInput.value) || 0 });
    });

    /*============ Réinitialisation ============*/
    resetAppBtn.addEventListener('click', () => {
        const confirmed = confirm("This will delete all your transactions, categories and preferences. Continue?");
        if (!confirmed) return;

        resetExpenses();
        resetIncomes();
        updateSettings({ nickname: '' });
        clearAll();

        loadSettingsIntoForm();
        renderCategoriesTable();
        updateSettingsPreview();

        document.dispatchEvent(new CustomEvent('transactions-changed'));
        document.dispatchEvent(new CustomEvent('categories-changed'));
    });

    /*============ Démarrage ============*/
    loadSettingsIntoForm();
    setType('expense');
    updateSettingsPreview();
}