import { saveData, loadData } from '/js/storage.js';

let settings = loadData('settings', { nickname: '', currency: '€', monthlyBudget: 0 });

function getSettings() {
    return settings;
}

function updateSettings(newSettings) {
    settings = { ...settings, ...newSettings };
    saveData('settings', settings);
    document.dispatchEvent(new CustomEvent('settings-changed'));
}

export { getSettings, updateSettings };