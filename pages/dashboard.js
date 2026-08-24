import { getCurrentMonthExpenses, getExpensesByCategory } from '/js/expenses.js';
import { getCurrentMonthIncomes, getIncomesByCategory } from '/js/incomes.js';
import { getSettings } from '/js/settings.js';

let charts = [];
let listenersAttached = false;

export function init() {
    render();

    if (!listenersAttached) {
        document.addEventListener('transactions-changed', render);
        document.addEventListener('settings-changed', render);
        listenersAttached = true;
    }
}

function destroyCharts() {
    charts.forEach((chart) => chart.destroy());
    charts = [];
}

function render() {
    destroyCharts();

    const currencyOption = { style: "currency", currency: "USD" };
    const formatter = new Intl.NumberFormat("en-US", currencyOption);

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const monthExpenses = getCurrentMonthExpenses();
    const monthIncomes = getCurrentMonthIncomes();

    const totalDep = monthExpenses.reduce((acc, val) => acc + val.amount, 0);
    const totalRev = monthIncomes.reduce((acc, val) => acc + val.amount, 0);
    const currentBalanceValue = totalRev - totalDep;

    const expenseData = getExpensesByCategory(monthExpenses);
    const incomeData = getIncomesByCategory(monthIncomes);

    document.getElementById('textBalance').textContent = formatter.format(currentBalanceValue);
    document.getElementById('textExpenses').textContent = formatter.format(totalDep);
    document.getElementById('textIncomes').textContent = formatter.format(totalRev);

    const baseDonutOptions = {
        chart: { type: 'donut', width: '100%', height: 160, sparkline: { enabled: true } },
        stroke: { width: 0 },
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: {
            pie: { borderRadius: 6, spacing: 3, donut: { size: '85%', labels: { show: false } } }
        },
        tooltip: {
            enabled: true, fillSeriesColor: false, theme: 'dark',
            y: { formatter: (val) => formatter.format(val) }
        },
        states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } }
    };

    /*============= CHART 1: CURRENT BALANCE ================*/
    const chartBalance = new ApexCharts(document.querySelector("#currentBalance"), {
        ...baseDonutOptions,
        series: [totalDep, currentBalanceValue],
        labels: ['Expenses', 'Remaining Balance'],
        colors: ['#EF4444', '#3B82F6']
    });
    chartBalance.render();
    charts.push(chartBalance);

    /*============= CHART 2: EXPENSES BY CATEGORY ================*/
    let expenseSeries = expenseData.amounts;
    let expenseLabels = expenseData.labels;
    if (expenseSeries.length === 0) { expenseSeries = ""; expenseLabels = ['No expenses yet']; }

    const chartExpenses = new ApexCharts(document.querySelector("#expenses"), {
        ...baseDonutOptions,
        series: expenseSeries,
        labels: expenseLabels,
        colors: ['#EF4444', '#F97316', '#F59E0B', '#D946EF', '#EC4899', '#F43F5E', '#E11D48', '#C084FC', '#FB923C', '#FBBF24']
    });
    chartExpenses.render();
    charts.push(chartExpenses);

    /*============= CHART 3: INCOMES BY CATEGORY ================*/
    let incomeSeries = incomeData.amounts;
    let incomeLabels = incomeData.labels;
    if (incomeSeries.length === 0) { incomeSeries = ""; incomeLabels = ['No incomes yet']; }

    const chartIncomes = new ApexCharts(document.querySelector("#incomes"), {
        ...baseDonutOptions,
        series: incomeSeries,
        labels: incomeLabels,
        colors: ['#22C55E', '#10B981', '#14B8A6', '#0EA5E9', '#6366F1', '#06B6D4', '#3B82F6', '#4ADE80', '#2DD4BF', '#38BDF8']
    });
    chartIncomes.render();
    charts.push(chartIncomes);

    /*============= CHART 4: BUDGET PROGRESS (Radial Bar) ================*/
    const { monthlyBudget } = getSettings();
    const percent = monthlyBudget > 0 ? Math.min(100, Math.round((totalDep / monthlyBudget) * 100)) : 0;

    const chartBudget = new ApexCharts(document.querySelector("#budgetProgress"), {
        chart: { type: 'radialBar', height: 220, sparkline: { enabled: true } },
        series: [percent],
        labels: ['Spent'],
        colors: [percent >= 100 ? '#EF4444' : percent >= 80 ? '#F59E0B' : '#3B82F6'],
        plotOptions: {
            radialBar: {
                hollow: { size: '65%' },
                dataLabels: {
                    value: { formatter: (val) => `${val}%`, fontSize: '20px', fontWeight: 700 }
                }
            }
        }
    });
    chartBudget.render();
    charts.push(chartBudget);

    document.getElementById('budgetLabel').textContent = monthlyBudget > 0
        ? `${formatter.format(totalDep)} of ${formatter.format(monthlyBudget)}`
        : 'No budget set';

    /*============= CHART 5: BALANCE EVOLUTION (Area) ================*/
    const lastDay = now.getDate();
    const dailyNet = {};
    for (let d = 1; d <= lastDay; d++) dailyNet[d] = 0;
    monthExpenses.forEach((e) => { dailyNet[e.date.getDate()] -= e.amount; });
    monthIncomes.forEach((i) => { dailyNet[i.date.getDate()] += i.amount; });

    let running = 0;
    const balanceData = [];
    for (let d = 1; d <= lastDay; d++) {
        running += dailyNet[d];
        balanceData.push({ x: `${d}`, y: Math.round(running * 100) / 100 });
    }

    const chartEvolution = new ApexCharts(document.querySelector("#balanceEvolution"), {
        chart: { type: 'area', height: 220, toolbar: { show: false }, zoom: { enabled: false } },
        series: [{ name: 'Balance', data: balanceData }],
        colors: ['#3B82F6'],
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
        dataLabels: { enabled: false },
        xaxis: { labels: { style: { fontSize: '11px' } } },
        yaxis: { labels: { formatter: (val) => formatter.format(val) } },
        tooltip: { y: { formatter: (val) => formatter.format(val) } },
        grid: { strokeDashArray: 4 }
    });
    chartEvolution.render();
    charts.push(chartEvolution);

}