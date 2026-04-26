import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	optimizeDeps: {
		include: [
			'paneforge',
			'posthog-js',
			'tailwind-variants',
			'chart.js',
			'@internationalized/date',
			'clsx',
			'tailwind-merge',
			'devalue',
			'dequal',
			'nanoid/non-secure',
			'@floating-ui/dom',
			'focus-trap',
			'@prisma/client',
			'mode-watcher',
			'svelte-dnd-action',
			'@auth/sveltekit/client',
			'bits-ui',
			'svelte-sonner',
			'workbox-window',
			'workbox-precaching',
			'workbox-routing',
			'workbox-strategies',
			'svelte-infinite-loading',
			'trpc-sveltekit',
			'trpc-transformer',
			'@trpc/client',
			'vaul-svelte',
			'cmdk-sv',
			'embla-carousel',
			'embla-carousel-svelte',
			'embla-carousel-reactive-utils',
			'@auth/prisma-adapter',
			'@auth/sveltekit/providers/github',
			'@auth/sveltekit/providers/google',
			'mongodb',
			'dotenv/config',
			'zod',
			'@paralleldrive/cuid2',
			'@trpc/server',
			'@auth/sveltekit',
			'set-cookie-parser',
			'marked',
			'dompurify',
			'chartjs-adapter-date-fns'
		]
	},
	define: {
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? '"production"' : '"development"',
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			defaultClass: 'pointer-events-none'
		})
	]
});