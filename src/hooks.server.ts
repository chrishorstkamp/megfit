import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import github from '@auth/sveltekit/providers/github';
import google from '@auth/sveltekit/providers/google';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

const prisma = new PrismaClient();

const { handle: authHandle } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	basePath: '/auth',
	providers: [google, github],
	trustHost: true,
	callbacks: {
		session({ session, user }) {
			session.userId = user.id;
			return session;
		}
	}
});

const trpcHandle = createTRPCHandle({
	router,
	createContext,
	onError: ({ type, path, error }) =>
		console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});

const meganMode: any = async ({ event, resolve }) => {
	const user = {
		id: "txdfz3nduruk0ajgbubukgpx",
		name: "Megan",
		email: "megan@example.com",
	};

	event.locals.user = user;
	event.locals.session = { user, userId: user.id };
	
	// These two lines satisfy the "Internal Error" you're seeing
	event.locals.auth = async () => event.locals.session;
	event.locals.getSession = async () => event.locals.session;

	return resolve(event);
};

export const handle = sequence(meganMode, trpcHandle);