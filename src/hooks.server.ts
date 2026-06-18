import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const trpcHandle = createTRPCHandle({
	router,
	createContext,
	onError: ({ type, path, error }) =>
		console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});

// Single-user mode: authenticate every request as the app owner.
const meganMode: Handle = async ({ event, resolve }) => {
	const session = {
		user: { id: 'txdfz3nduruk0ajgbubukgpx', name: 'Megan', email: 'megan@example.com' },
		expires: '2999-12-31T23:59:59.999Z'
	};
	event.locals.auth = async () => session;
	return resolve(event);
};

export const handle = sequence(meganMode, trpcHandle);
