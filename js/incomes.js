let allIncomes = [
    { id: 125, category: "salary", amount: 2000, date: "21-10-2026" }
];

let totalIncomes = () => allIncomes.reduce((acc, val) => acc + val.amount, 0);

function addIncome(amount, category) {
    const newIncome = {
        id: Date.now(),
        category: category,
        amount: parseFloat(amount), // On garde un NOMBRE pur ici
        date: new Date().toLocaleDateString('fr-FR')
    };

    allIncomes.push(newIncome);
}

function deleteIncome(id) {
    // Number(id) : le HTML (data-id) renvoie toujours une string,
    // alors que les id stockés ici sont des nombres (Date.now()).
    // Sans cette conversion, "125" === 125 renverrait toujours false.
    const targetId = Number(id);
    const index = allIncomes.findIndex((item) => item.id === targetId);
    if (index !== -1) {
        allIncomes.splice(index, 1);
    }
}

function getIncomesByCategory() {
    const categoriesMap = {};

    allIncomes.forEach(item => {
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

const incomeCategories = [
    { name: "Salary", icon: "💼" },
    { name: "Freelance", icon: "💻" },
    { name: "Investments", icon: "📈" },
    { name: "Gifts", icon: "🎁" },
    { name: "Other", icon: "💰" }
].map((cat, index) => ({ ...cat, id: index + 1 }));


export { allIncomes, totalIncomes, addIncome, deleteIncome, getIncomesByCategory, incomeCategories };