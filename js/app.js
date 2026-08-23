import { renderPage } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    const screenDash = document.querySelector('.screen-dashboard');
    const sidebar = document.getElementById('sidebar');
    const sideLeftTemplate = document.getElementById('sideLeft');
    const fullSidebar = document.getElementById('fullSide');

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

    /*============ Initial loading page ============*/
    renderPage(activeMenu);
});