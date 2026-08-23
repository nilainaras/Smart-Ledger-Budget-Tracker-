const mainContent = document.getElementById('mainContent');
export async function renderPage(pageName) {
    try {
        const response = await fetch(`/pages/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`Page "${pageName}" introuvable (${response.status})`);
        }

        const html = await response.text(); //extract the content of the page
        mainContent.innerHTML = html;

        lucide.createIcons();

        try {
            const pageModule = await import(`/pages/${pageName}.js`);
            pageModule.init?.(); // call init() if the module export that
        } catch (moduleErr) {
            console.info(`Aucun module JS pour "${pageName}", ou erreur de chargement :`, moduleErr);
        }
    } catch (err) {
        mainContent.innerHTML = `<p class="text-red-500 dark:text-red-400">Impossible de charger cette page.</p>`;
        console.error(err);
    }
}