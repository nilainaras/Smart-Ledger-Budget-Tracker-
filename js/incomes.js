import { saveData, loadData } from '/js/storage.js';

const defaultIncomes = [];

const defaultIncomeCategories = [
    { name: "Salary", icon: "💼" },
    { name: "Freelance", icon: "💻" },
    { name: "Investments", icon: "📈" },
    { name: "Gifts", icon: "🎁" },
    { name: "Other", icon: "💰" }
].map((cat, index) => ({ ...cat, id: index + 1 }));

let allIncomes = loadData('incomes', defaultIncomes).map((item) => ({
    ...item,
    date: new Date(item.date)
}));

let incomeCategories = loadData('incomeCategories', defaultIncomeCategories);

function persistIncomes() {
    saveData('incomes', allIncomes);
}

function persistIncomeCategories() {
    saveData('incomeCategories', incomeCategories);
}

let totalIncomes = () => allIncomes.reduce((acc, val) => acc + val.amount, 0);

/*============ Transactions ============*/
function addIncome(amount, category) {
    const newIncome = {
        id: Date.now(),
        category: category,
        amount: parseFloat(amount),
<<<<<<< HEAD
        date: new Date()
=======
        date: new Date().toLocaleString()
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    };
    allIncomes.push(newIncome);
    persistIncomes();
    document.dispatchEvent(new CustomEvent('transactions-changed'));
}

function deleteIncome(id) {
    const targetId = Number(id);
    const index = allIncomes.findIndex((item) => item.id === targetId);
    if (index !== -1) {
        allIncomes.splice(index, 1);
        persistIncomes();
        document.dispatchEvent(new CustomEvent('transactions-changed'));
    }
}

/*============ Filtrage par mois ============*/
function getIncomesForMonth(month, year) {
    return allIncomes.filter((item) =>
        item.date.getMonth() === month && item.date.getFullYear() === year
    );
}

function getCurrentMonthIncomes() {
    const now = new Date();
    return getIncomesForMonth(now.getMonth(), now.getFullYear());
}

function totalIncomesForMonth(month, year) {
    return getIncomesForMonth(month, year).reduce((acc, val) => acc + val.amount, 0);
}

function getIncomesByCategory(list = allIncomes) {
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
function addIncomeCategory(name, icon) {
    const maxId = incomeCategories.reduce((max, cat) => Math.max(max, cat.id), 0);
    incomeCategories.push({ id: maxId + 1, name, icon });
    persistIncomeCategories();
    document.dispatchEvent(new CustomEvent('categories-changed'));
}

function deleteIncomeCategory(id) {
    const targetId = Number(id);
    const index = incomeCategories.findIndex((cat) => cat.id === targetId);
    if (index !== -1) {
        incomeCategories.splice(index, 1);
        persistIncomeCategories();
        document.dispatchEvent(new CustomEvent('categories-changed'));
    }
}

/*============ Reset (appelé depuis Settings) ============*/
function resetIncomes() {
    allIncomes.splice(0, allIncomes.length);
    incomeCategories.splice(0, incomeCategories.length, ...defaultIncomeCategories);
    persistIncomes();
    persistIncomeCategories();
}

export {
    allIncomes,
    totalIncomes,
    addIncome,
    deleteIncome,
    getIncomesByCategory,
    incomeCategories,
    addIncomeCategory,
    deleteIncomeCategory,
    getIncomesForMonth,
    getCurrentMonthIncomes,
    totalIncomesForMonth,
    resetIncomes
};