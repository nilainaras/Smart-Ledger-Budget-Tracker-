import { renderPage } from './render.js';
import { totalExpenses } from '/js/expenses.js';
import { totalIncomes } from '/js/incomes.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    const screenDash = document.querySelector('.screen-dashboard');
    const sidebar = document.getElementById('sidebar');
    const sideLeftTemplate = document.getElementById('sideLeft');
    const fullSidebar = document.getElementById('fullSide');

    const notifNone = document.getElementById('notifNone');
    const notifTemplate = document.getElementById('notifTemplate');
    const notifContent = document.getElementById('notifContent');


    /*============ HEADER : search, clear, dark mode ============*/
    header.addEventListener('click', (event) => {
        const searchBtn = event.target.closest('#searchBtn');
        if (searchBtn) {
            searchBtn.style.cssText = "position: absolute; top:0; right: 18vw; transition: all 0.3s;";
            searchBar.classList.remove('opacity-0', 'pointer-events-none');
            setTimeout(() => { searchInput.focus(); }, 50);
            return;
        }

        const stateModeBtn = event.target.closest('#stateMode');
        if (stateModeBtn) {
            const isDark = document.documentElement.classList.toggle('dark');
            stateModeBtn.innerHTML = isDark
                ? '<i data-lucide="sun" class="hover:cursor-pointer w-5 h-5 text-yellow-400"></i>'
                : '<i data-lucide="moon" class="hover:cursor-pointer w-5 h-5 text-black"></i>';
            lucide.createIcons();
            return;
        }
    });

    header.addEventListener('mousedown', (event) => {
        const clearBtn = event.target.closest('#clearBtn');
        if (clearBtn) {
            event.preventDefault();
            searchInput.value = "";
            searchInput.focus();
        }
    });

    searchInput.addEventListener('blur', () => {
        const searchBtn = document.getElementById('searchBtn');
        searchBar.classList.add('opacity-0', 'pointer-events-none');
        searchInput.value = "";
        if (searchBtn) {
            searchBtn.style.cssText = "transition: all 0.3s;";
        }
    });

    /*============ SIDEBAR : open / close / active menu / routing ============*/
    let activeMenu = 'dashboard';

    function applyActiveMenu() {
        sidebar.querySelectorAll('.menu').forEach((el) => {
            el.classList.toggle('menu-active', el.dataset.menu === activeMenu);
        });
    }

    sidebar.addEventListener('click', (event) => {
        if (event.target.closest('#sideClose')) {
            showReducedSidebar();
            return;
        }
        if (event.target.closest('#sideopen')) {
            showFullSidebar();
            return;
        }

        const menuItem = event.target.closest('.menu');
        if (menuItem) {
            event.preventDefault();
            activeMenu = menuItem.dataset.menu;
            applyActiveMenu();
            renderPage(activeMenu); // loading active menu on the main side
        }
    });

    function showFullSidebar() {
        screenDash.style.gridTemplateColumns = "18vw 82vw";
        sidebar.innerHTML = "";
        sidebar.appendChild(fullSidebar.content.cloneNode(true));
        lucide.createIcons();
        applyActiveMenu();
    }

    function showReducedSidebar() {
        screenDash.style.gridTemplateColumns = "6vw 94vw";
        sidebar.innerHTML = "";
        sidebar.appendChild(sideLeftTemplate.content.cloneNode(true));
        lucide.createIcons();
        applyActiveMenu();
    }

<<<<<<< HEAD
    /*============ NOTIFICATIONS : bell state + toggle panel ============*/
    function showPlainBell() {
        notifNone.innerHTML = '<i data-lucide="bell" class="hover:cursor-pointer z-50 w-5 h-5" id="notifBtn"></i>';
        lucide.createIcons();
        notifContent.classList.add('opacity-0');
    }

    function showAlertBell(dotColor, pingColor) {
        notifNone.innerHTML = "";
        notifNone.appendChild(notifTemplate.content.cloneNode(true));

        const dot = notifNone.querySelector('#notifDot');
        const ping = notifNone.querySelector('#notifPing');
        dot.classList.add(dotColor);
        ping.classList.add(pingColor);

        lucide.createIcons();
=======
    function showPlainBell() {
        notifNone.innerHTML = '<i data-lucide="bell" class="hover:cursor-pointer z-50 w-5 h-5" id="notifBtn"></i>';
        lucide.createIcons();
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    }

    function notification() {
        const totalRev = totalIncomes();
        const totalDep = totalExpenses();
        const currentBalanceValue = totalRev - totalDep;

        if (totalRev === 0) {
            showPlainBell();
            return;
        }

        if (currentBalanceValue <= totalRev * 0) {
<<<<<<< HEAD
            showAlertBell('bg-red-800', 'bg-red-600');
            notifRed();
        } else if (currentBalanceValue <= totalRev * 0.25) {
            showAlertBell('bg-orange-600', 'bg-orange-400')
            notifOrange();
        } else if (currentBalanceValue <= totalRev * 0.5) {
            showAlertBell('bg-yellow-500', 'bg-yellow-400');
            notifYellow();
        } else if (currentBalanceValue <= totalRev * 0.75) {
            showAlertBell('bg-blue-500', 'bg-blue-400');
            notifBlue();
        } else if (currentBalanceValue <= totalRev * 0.9) {
            showAlertBell('bg-green-500', 'bg-green-400');
=======
            showAlertBell('bg-red-700', 'bg-red-500');
            notifRed();
        } else if (currentBalanceValue <= totalRev * 0.25) {
            showAlertBell('bg-orange-600', 'bg-orange-400');
            notifOrange();
        } else if (currentBalanceValue <= totalRev * 0.5) {
            showAlertBell('bg-blue-500', 'bg-blue-400');
            notifBlue();
        } else if (currentBalanceValue <= totalRev * 0.9) {
            showAlertBell('bg-emerald-500', 'bg-emerald-400');
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
            notifGreen();
        } else {
            showPlainBell();
        }
    }

<<<<<<< HEAD
    function notifGreen() {
        const notifShowToggle = document.getElementById('notifToggle');
        const notifContent = document.getElementById('notifContent');

        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let notifText = `
            <div class="p-4 w-auto h-auto ">
                <p class="text-center p-2 border-b border-slate-300/50 text-gray-950 dark:text-sky-200 font-global">You spent 10% of your current budget.</p>
            </div>
            `;
            notifContent.innerHTML = notifText;

            lucide.createIcons();
        });
=======
    function showAlertBell(dotColor, pingColor) {
        notifNone.innerHTML = "";
        notifNone.appendChild(notifTemplate.content.cloneNode(true));

        const dot = notifNone.querySelector('#notifDot');
        const ping = notifNone.querySelector('#notifPing');
        dot.classList.add(dotColor);
        ping.classList.add(pingColor);

        lucide.createIcons();
    }

    function notifGreen() {
        const notifShowToggle = document.getElementById('notifToggle');
        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let date = new Date().toLocaleString();
            let notifText = `
            <div class="border-b border-slate-300 dark:border-slate-300/50 flex flex-col items-center text-center">
                <p class="text-black dark:text-white font-global transition-colors duration-300 pb-2 ">You have spent 20% of your current budget.</p>
                <p class="text-gray-950 dark:text-white font-global transition-colors duration-300 pb-2 font-light ">${date}</p>
            </div >
            `;
            notifContent.innerHTML = notifText;
            lucide.createIcons();
        })
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    }

    function notifBlue() {
        const notifShowToggle = document.getElementById('notifToggle');
<<<<<<< HEAD
        const notifContent = document.getElementById('notifContent');

        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let notifText = `
            <div class="p-4 border-b border-slate-300/50">
                <p class="text-center text-gray-950 dark:text-sky-200 font-global">You spent more than 25% of your current budget.</p>
            </div>
            `;
            notifContent.innerHTML = notifText;

            lucide.createIcons();
        });
    }

    function notifYellow() {
        const notifShowToggle = document.getElementById('notifToggle');
        const notifContent = document.getElementById('notifContent');

        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let notifText = `
            <div class="p-4 border-b border-slate-300/50">
                <p class="text-center text-gray-950 dark:text-sky-200 font-global">You spent more than 50% of your current budget.</p>
            </div>
            `;
            notifContent.innerHTML = notifText;

            lucide.createIcons();
        });
    }


    function notifOrange() {
        const notifShowToggle = document.getElementById('notifToggle');
        const notifContent = document.getElementById('notifContent');

        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let notifText = `
            <div class="p-4 border-b border-slate-300/50">
                <h2 class="text-center text-orange-500! dark:text-yellow-400! font-bold">Warning</h2> 
                <p class="text-center text-gray-950 dark:text-sky-200 font-global">You spent more than 75% of your current budget</p>
            </div>
            `;
            notifContent.innerHTML = notifText;

            lucide.createIcons();
        });
=======
        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let date = new Date().toLocaleString();
            let notifText = `
            <div class="border-b border-slate-300 dark:border-slate-300/50 flex flex-col items-center text-center">
                <p class="text-black dark:text-white font-global transition-colors duration-300 pb-2 ">You have spent more than 50% of your current budget.</p>
                <p class="text-gray-950 dark:text-white font-global transition-colors duration-300 pb-2 font-light ">${date}</p>
            </div >
            `;
            notifContent.innerHTML = notifText;
            lucide.createIcons();
        })
    }

    function notifOrange() {
        const notifShowToggle = document.getElementById('notifToggle');
        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let date = new Date().toLocaleString();
            let notifText = `
            <div class="border-b border-slate-300 dark:border-slate-300/50 flex flex-col items-center text-center">
                <p class="text-black dark:text-white font-global transition-colors duration-300 pb-2 "><h2>Warning</h2><br> You have spent over 25% of your current budget</p>
                <p class="text-gray-950 dark:text-white font-global transition-colors duration-300 pb-2 font-light ">${date}</p>
            </div >
            `;
            notifContent.innerHTML = notifText;
            lucide.createIcons();
        })
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    }

    function notifRed() {
        const notifShowToggle = document.getElementById('notifToggle');
<<<<<<< HEAD
        const notifContent = document.getElementById('notifContent');

        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let notifText = `
            <div class="p-4 border-b border-slate-300/50">
                <h2 class="text-center text-red-500! dark:text-red-800! font-bold">Alert</h2> 
                <p class="text-center text-gray-950 dark:text-sky-200 font-global">You have exceeded your total current budget</p>
            </div>
            `;
            notifContent.innerHTML = notifText;

            lucide.createIcons();
        });
    }


=======
        notifShowToggle.addEventListener('click', () => {
            notifContent.classList.toggle('opacity-0');
            let date = new Date().toLocaleString();
            let notifText = `
            <div class="border-b border-slate-300 dark:border-slate-300/50 flex flex-col items-center text-center">
                <p class="text-black dark:text-white font-global transition-colors duration-300 pb-2 "><h2>Alert</h2><br> You have spent over of your current budget.</p>
                <p class="text-gray-950 dark:text-white font-global transition-colors duration-300 pb-2 font-light ">${date}</p>
            </div >
            `;
            notifContent.innerHTML = notifText;
            lucide.createIcons();
        })
    }
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
    /*============ Initial loading page ============*/
    renderPage(activeMenu);
    notification();

    document.addEventListener('transactions-changed', notification);
});