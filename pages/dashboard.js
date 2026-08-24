import { totalExpenses, getExpensesByCategory } from '/js/expenses.js';
import { totalIncomes, getIncomesByCategory } from '/js/incomes.js';

// ==========================================
//  MAIN INITIALIZATION FUNCTION
// ==========================================

export function init() {
    const currencyOption = { style: "currency", currency: "USD" };
    const formatter = new Intl.NumberFormat("en-US", currencyOption);

    const totalRev = totalIncomes();
    const totalDep = totalExpenses();
    const currentBalanceValue = totalRev - totalDep;

    const expenseData = getExpensesByCategory();
    const incomeData = getIncomesByCategory();

    document.getElementById('textBalance').textContent = formatter.format(currentBalanceValue);
    document.getElementById('textExpenses').textContent = formatter.format(totalDep);
    document.getElementById('textIncomes').textContent = formatter.format(totalRev);

    // Shared configuration with the very thin design style
    const baseDonutOptions = {
        chart: {
            type: 'donut',
            width: '100%',
            height: 160,
            sparkline: { enabled: true }
        },
        stroke: { width: 0 },
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: {
            pie: {
                borderRadius: 6,
                spacing: 3,
                donut: {
                    size: '85%',
                    labels: { show: false }
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return formatter.format(val);
                }
            }
        },
        states: {
            hover: { filter: { type: 'none' } },
            active: { filter: { type: 'none' } }
        }
    };

    /*============= CHART 1: CURRENT BALANCE ================*/
    const optionsBalance = {
        ...baseDonutOptions,
        series: [totalDep, currentBalanceValue],
        labels: ['Expenses', 'Remaining Balance'],
        colors: ['#EF4444', '#3B82F6']
    };
    const chartBalance = new ApexCharts(document.querySelector("#currentBalance"), optionsBalance);
    chartBalance.render();

    /*============= CHART 2: TOTAL EXPENSES BY CATEGORY ================*/
    let expenseSeries = expenseData.amounts;
    let expenseLabels = expenseData.labels;

    if (expenseSeries.length === 0) {
        expenseSeries = "";
        expenseLabels = ['No expenses yet'];
    }

    const optionsExpenses = {
        ...baseDonutOptions,
        series: expenseSeries,
        labels: expenseLabels,
        colors: [
            '#EF4444', '#F97316', '#F59E0B', '#D946EF', '#EC4899',
            '#F43F5E', '#E11D48', '#C084FC', '#FB923C', '#FBBF24',
            '#BE185D', '#9D174D', '#A21CAF', '#C2410C', '#B45309',
            '#86198F', '#9F1239', '#E11D48', '#FDA4AF', '#FDBA74'
        ]
    };
    const chartExpenses = new ApexCharts(document.querySelector("#expenses"), optionsExpenses);
    chartExpenses.render();

    /*============= CHART 3: TOTAL INCOMES BY CATEGORY ================*/
    let incomeSeries = incomeData.amounts;
    let incomeLabels = incomeData.labels;

    if (incomeSeries.length === 0) {
        incomeSeries = "";
        incomeLabels = ['No incomes yet'];
    }

    const optionsIncomes = {
        ...baseDonutOptions,
        series: incomeSeries,
        labels: incomeLabels,
        colors: [
            '#22C55E', '#10B981', '#14B8A6', '#0EA5E9', '#6366F1',
            '#06B6D4', '#3B82F6', '#4ADE80', '#2DD4BF', '#38BDF8',
            '#15803D', '#047857', '#0F766E', '#0369A1', '#4338CA',
            '#166534', '#065F46', '#115E59', '#075985', '#3730A3'
        ]
    };
    const chartIncomes = new ApexCharts(document.querySelector("#incomes"), optionsIncomes);
    chartIncomes.render();
}
