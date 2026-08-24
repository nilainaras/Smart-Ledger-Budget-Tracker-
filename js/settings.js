import { saveData, loadData } from '/js/storage.js';

<<<<<<< HEAD
let settings = loadData('settings', { nickname: '', currency: '$', monthlyBudget: 0 });
=======
let settings = loadData('settings', { nickname: '', currency: '€', monthlyBudget: 0 });
>>>>>>> 6abd46415789b73de99de8035521418835dcb9cc

function getSettings() {
    return settings;
}

function updateSettings(newSettings) {
    settings = { ...settings, ...newSettings };
    saveData('settings', settings);
    document.dispatchEvent(new CustomEvent('settings-changed'));
}

export { getSettings, updateSettings };