const STORAGE_PREFIX = 'smartledger_';

/*============ Save data ============*/
function saveData(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (error) {
        console.error("Erreur d'enregistrement dans localStorage:", error);
    }
}

/*============ Read data ============*/
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

/*============ Reset app ============*/
function clearAll() {
    Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => localStorage.removeItem(key));
}

export { saveData, loadData, clearAll };