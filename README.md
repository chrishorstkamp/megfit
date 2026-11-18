# MegFit

A personal workout tracker for logging reps, load and RIR (reps in reserve), organizing training into exercise splits and mesocycles, and suggesting progressive overload for the next session.

MegFit runs in single-user mode: there is no login, and every request is treated as one user (see `meganMode` in `src/hooks.server.ts`).

## Stack

- [SvelteKit](https://kit.svelte.dev/) app, deployed on [Vercel](https://vercel.com/)
- [tRPC](https://trpc.io/) API between the pages and the server
- PostgreSQL on [Neon](https://neon.tech/), accessed through [Prisma](https://www.prisma.io/)

## Local development

Requires Node.js 20 or 22.

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Copy `sample.env` to `.env` and fill in the Neon connection strings (`DATABASE_URL` and `DIRECT_URL`).

   **The database in `.env` is the one the app reads and writes.** If it points at the production database, anything you do locally changes real data.

3. For a new, empty database, apply the schema and create the app's user:

   ```bash
   npx prisma migrate deploy
   ```

   ```bash
   npx prisma db seed
   ```

4. Start the dev server and open `http://localhost:5173`:

   ```bash
   npm run dev
   ```

## Checks

```bash
npm run lint
```

```bash
npm run check
```

```bash
npm test
```

`npm test` runs the progression unit tests in `tests/`. They need no browser or database. GitHub Actions runs all three checks on every push to `main`.

## Database changes

Vercel does not run migrations. After changing the schema in `prisma/schema/`, create a migration and apply it to the production database yourself with `npx prisma migrate deploy`.

## License and credits

MegFit is based on [MyFit](https://github.com/WhyAsh5114/MyFit) by WhyAsh5114 and is licensed under the GNU Affero General Public License v3.0. See [LICENSE](./LICENSE).
