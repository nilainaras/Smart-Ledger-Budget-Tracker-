const STORAGE_PREFIX = 'smartledger_';

<<<<<<< HEAD
/*============ Enregistrer une donnée ============*/
=======
/*============ Save data ============*/
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
function saveData(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (error) {
        console.error("Erreur d'enregistrement dans localStorage:", error);
    }
}

<<<<<<< HEAD
/*============ Lire une donnée ============*/
=======
/*============ Read data ============*/
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
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

<<<<<<< HEAD
/*============ Tout effacer (pour le bouton reset) ============*/
=======
/*============ Reset app ============*/
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc
function clearAll() {
    Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => localStorage.removeItem(key));
}

export { saveData, loadData, clearAll };