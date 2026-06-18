import { writable } from 'svelte/store';

// 1. Mock the PWA stores so the rest of the app doesn't crash
export const needRefresh = writable(false);
export const offlineReady = writable(false);

// 2. Mock the update function so buttons tied to it do nothing instead of breaking
export const updateServiceWorker = async (_reloadPage?: boolean) => {
	console.log('PWA is disabled, skipping service worker update.');
};

// 3. Keep your custom data loss dialog state exactly as it was
export const updateDataLossDialog = $state({ open: false });

// 4. Mock the check function
const checkForUpdates: (() => Promise<void>) | null = async () => {};
export { checkForUpdates };
