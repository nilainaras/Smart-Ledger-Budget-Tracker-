const STORAGE_PREFIX = 'smartledger_';

/*============ Enregistrer une donnée ============*/
function saveData(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (error) {
        console.error("Erreur d'enregistrement dans localStorage:", error);
    }
}

/*============ Lire une donnée ============*/
function loadData(key, fallback) {
    try {
        const raw = localStorage.getItem(STORAGE_PREFIX + key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch (error) {
        console.error("Erreur de lecture depuis localStorage:", error);
        return fallback;
    }
}

/*============ Tout effacer (pour le bouton reset) ============*/
function clearAll() {
    Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => localStorage.removeItem(key));
}

export { saveData, loadData, clearAll };