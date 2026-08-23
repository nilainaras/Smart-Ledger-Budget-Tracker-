export function init() {
    const form = document.getElementById('transactionForm');
    const list = document.getElementById('txList');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const label = document.getElementById('txLabel').value.trim();
        const amount = document.getElementById('txAmount').value;

        if (!label || !amount) return;

        const item = document.createElement('li');
        item.className = "bg-white px-3 py-2 rounded-lg flex justify-between dark:bg-slate-800 dark:text-slate-100";
        item.innerHTML = `<span>${label}</span><span>${amount} Ar</span>`;
        list.appendChild(item);

        form.reset();
    });
}