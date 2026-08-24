import { saveData, loadData } from '/js/storage.js';

const defaultExpenses = [];

const defaultExpenseCategories = [
    { name: "Food", icon: "🍔" },
    { name: "Transport", icon: "🚗" },
    { name: "Rent", icon: "🏠" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Other", icon: "📦" }
].map((cat, index) => ({ ...cat, id: index + 1 }));

<<<<<<< HEAD
// On relit depuis localStorage, en reconvertissant les dates (JSON les transforme en texte)
=======
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
let allExpenses = loadData('expenses', defaultExpenses).map((item) => ({
    ...item,
    date: new Date(item.date)
}));

let expenseCategories = loadData('expenseCategories', defaultExpenseCategories);

function persistExpenses() {
    saveData('expenses', allExpenses);
}

function persistExpenseCategories() {
    saveData('expenseCategories', expenseCategories);
}

let totalExpenses = () => allExpenses.reduce((acc, val) => acc + val.amount, 0);

/*============ Transactions ============*/
function addExpense(amount, category) {
    const newExpense = {
        id: Date.now(),
        category: category,
        amount: parseFloat(amount),
<<<<<<< HEAD
        date: new Date()
=======
        date: new Date().toLocaleString()
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    };
    allExpenses.push(newExpense);
    persistExpenses();
    document.dispatchEvent(new CustomEvent('transactions-changed'));
}

function deleteExpense(id) {
    const targetId = Number(id);
    const index = allExpenses.findIndex((item) => item.id === targetId);
    if (index !== -1) {
        allExpenses.splice(index, 1);
        persistExpenses();
        document.dispatchEvent(new CustomEvent('transactions-changed'));
    }
}

/*============ Filtrage par mois ============*/
function getExpensesForMonth(month, year) {
    return allExpenses.filter((item) =>
        item.date.getMonth() === month && item.date.getFullYear() === year
    );
}

function getCurrentMonthExpenses() {
    const now = new Date();
    return getExpensesForMonth(now.getMonth(), now.getFullYear());
}

function totalExpensesForMonth(month, year) {
    return getExpensesForMonth(month, year).reduce((acc, val) => acc + val.amount, 0);
}

function getExpensesByCategory(list = allExpenses) {
    const categoriesMap = {};

    list.forEach(item => {
        const cat = item.category || "Other";
        if (!categoriesMap[cat]) {
            categoriesMap[cat] = 0;
        }
        categoriesMap[cat] += item.amount;
    });

    return {
        amounts: Object.values(categoriesMap),
        labels: Object.keys(categoriesMap)
    };
}

/*============ Catégories ============*/
function addExpenseCategory(name, icon) {
    const maxId = expenseCategories.reduce((max, cat) => Math.max(max, cat.id), 0);
    expenseCategories.push({ id: maxId + 1, name, icon });
    persistExpenseCategories();
    document.dispatchEvent(new CustomEvent('categories-changed'));
}

function deleteExpenseCategory(id) {
    const targetId = Number(id);
    const index = expenseCategories.findIndex((cat) => cat.id === targetId);
    if (index !== -1) {
        expenseCategories.splice(index, 1);
        persistExpenseCategories();
        document.dispatchEvent(new CustomEvent('categories-changed'));
    }
}

/*============ Reset (appelé depuis Settings) ============*/
function resetExpenses() {
    allExpenses.splice(0, allExpenses.length);
    expenseCategories.splice(0, expenseCategories.length, ...defaultExpenseCategories);
    persistExpenses();
    persistExpenseCategories();
}

export {
    allExpenses,
    totalExpenses,
    addExpense,
    deleteExpense,
    getExpensesByCategory,
    expenseCategories,
    addExpenseCategory,
    deleteExpenseCategory,
    getExpensesForMonth,
    getCurrentMonthExpenses,
    totalExpensesForMonth,
    resetExpenses
};