import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],

	kit: {
		adapter: adapter(),
		// SvelteKit 2 automatically detects src/service-worker.ts.
		// We set register to false because the PWA plugin handles it.
		serviceWorker: { register: false },
		alias: { '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js' }
	}
};

export default config;
