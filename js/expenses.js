let allExpenses = [
    { id: 1001, category: "food", amount: 200, date: "21-10-2026" },
    { id: 1002, category: "transport", amount: 60, date: "31-10-2026" }
];
let totalExpenses = () => allExpenses.reduce((acc, val) => acc + val.amount, 0);

function addExpense(amount, category) {
    const newExpense = {
        id: Date.now(),
        category: category,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString('fr-FR')
    };
    allExpenses.push(newExpense); // Correction ici : allExpenses au lieu de allExpensesExpenses
}

function deleteExpense(id) {
    // Number(id) : le HTML (data-id) renvoie toujours une string,
    // alors que les id stockés ici sont des nombres (Date.now()).
    // Sans cette conversion, "1001" === 1001 renverrait toujours false.
    const targetId = Number(id);
    const index = allExpenses.findIndex((item) => item.id === targetId);
    if (index !== -1) {
        allExpenses.splice(index, 1);
    }
}

function getExpensesByCategory() {
    const categoriesMap = {};

    allExpenses.forEach(item => {
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

const expenseCategories = [
    { name: "Food", icon: "🍔" },
    { name: "Transport", icon: "🚗" },
    { name: "Rent", icon: "🏠" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Other", icon: "📦" }
].map((cat, index) => ({ ...cat, id: index + 1 }));


export { allExpenses, totalExpenses, addExpense, deleteExpense, getExpensesByCategory, expenseCategories };