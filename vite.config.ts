import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

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
		SvelteKitPWA({
			srcDir: 'src',
			filename: 'service-worker.ts',
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			scope: '/',
			base: '/',
			manifest: {
				id: '/?app=megfit',
				name: 'MegFit',
				short_name: 'MegFit',
				start_url: '/',
				display: 'standalone',
				background_color: '#fdf2f8', // Barbie Pink Background
				theme_color: '#ec4899', // Barbie Pink Theme
				orientation: 'portrait',
				description: "Megan's Custom Fitness Tracker",
				icons: [
					{
						src: 'android/android-launchericon-512-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'android/android-launchericon-192-192.png',
						sizes: '192x192',
						type: 'image/png'
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,ttf,webp,webmanifest,woff}', 'prerendered/**/*.html']
			},
			kit: {
				includeVersionFile: true
			}
		}),
		Icons({
			compiler: 'svelte',
			defaultClass: 'pointer-events-none'
		})
	]
});