document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    const screenDash = document.querySelector('.screen-dashboard');
    const sidebar = document.getElementById('sidebar');
    const sideLeftTemplate = document.getElementById('sideLeft');
    const fullSidebar = document.getElementById('fullSide');

    /*============ HEADER : recherche, clear, dark mode ============*/
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
            // 1. Ajoute ou supprime la classe 'dark' sur l'élément HTML global
            const isDark = document.documentElement.classList.toggle('dark');

            if (isDark) {
                stateModeBtn.innerHTML = '<i data-lucide="sun" class="hover:cursor-pointer w-5 h-5 text-yellow-400"></i>';
            } else {
                stateModeBtn.innerHTML = '<i data-lucide="moon" class="hover:cursor-pointer w-5 h-5 text-black"></i>';
            }

            lucide.createIcons();
            return;
        }
    });

    // mousedown (pas click) pour pouvoir faire preventDefault() avant le blur de l'input
    header.addEventListener('mousedown', (event) => {
        const clearBtn = event.target.closest('#clearBtn');
        if (clearBtn) {
            event.preventDefault();
            searchInput.value = "";
            searchInput.focus();
        }
    });

    // L'input lui-même n'est jamais recréé par lucide, un listener direct suffit ici
    searchInput.addEventListener('blur', () => {
        const searchBtn = document.getElementById('searchBtn');
        searchBar.classList.add('opacity-0', 'pointer-events-none');
        searchInput.value = "";
        if (searchBtn) {
            searchBtn.style.cssText = "transition: all 0.3s;";
        }
    });

    /*============ SIDEBAR : ouverture / fermeture / menu actif ============*/

    // Etat persistant, indépendant du DOM : survit aux clonages de template
    let activeMenu = 'dashboard';

    function applyActiveMenu() {
        sidebar.querySelectorAll('.menu').forEach((el) => {
            if (el.dataset.menu === activeMenu) {
                el.classList.add('menu-active');
            } else {
                el.classList.remove('menu-active');
            }
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
            activeMenu = menuItem.dataset.menu;
            applyActiveMenu();
        }
    });

    function showFullSidebar() {
        screenDash.style.gridTemplateColumns = "18vw 82vw";
        sidebar.innerHTML = "";

        const fullcode = fullSidebar.content.cloneNode(true);
        sidebar.appendChild(fullcode);

        lucide.createIcons();
        applyActiveMenu();
    }

    function showReducedSidebar() {
        screenDash.style.gridTemplateColumns = "6vw 94vw";
        sidebar.innerHTML = "";

        const clone = sideLeftTemplate.content.cloneNode(true);
        sidebar.appendChild(clone);

        lucide.createIcons();
        applyActiveMenu();
    }
});