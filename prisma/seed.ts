import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This must match the hardcoded user injected by `meganMode` in src/hooks.server.ts.
// Without this row, any write that references userId (workouts, splits,
// mesocycles, settings) fails with a foreign-key violation on a fresh database.
const MEGAN_USER_ID = 'txdfz3nduruk0ajgbubukgpx';

async function main() {
	const user = await prisma.user.upsert({
		where: { id: MEGAN_USER_ID },
		update: {},
		create: {
			id: MEGAN_USER_ID,
			name: 'Megan',
			email: 'megan@example.com',
			emailVerified: null
		}
	});

	console.log(`Seeded user: ${user.name} (${user.id})`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
