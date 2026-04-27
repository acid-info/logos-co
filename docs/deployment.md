# Deployment Guide

Operational notes for deploying `apps/web` and `apps/cms` to Vercel. The full architectural plan lives in [cms-github-content-plan.md](./cms-github-content-plan.md); this document covers only what is needed to make a green deploy.

## 1. The Two Apps

| App | Vercel project | Purpose | DB needed? |
| --- | --- | --- | --- |
| `apps/web` | `logos-co-web` | Public marketing site | No — reads `content/**` at build time |
| `apps/cms` | `logos-co-cms` | Payload Admin + REST/GraphQL API | Yes — Payload stores users, sessions, drafts, PR cache |

`apps/cms` does **not** own production page content. The repository's `content/` directory is the source of truth (see plan §1). Payload's database is for editor state only.

## 2. Known Issue: SQLite on Vercel (resolved)

Symptom previously observed at `https://logos-co-cms.vercel.app/api/pages`:

```json
{"message":"There was an error initializing Payload"}
```

Root cause: the original CMS config defaulted to SQLite (`DATABASE_URL=file:./cms.db`). Vercel's serverless filesystem is read-only outside `/tmp`, and `/tmp` is per-instance ephemeral. Payload tried to open / create the file at boot, the underlying driver failed, and Payload bailed out with the generic "error initializing" message.

The CMS now ships with `@payloadcms/db-postgres` and refuses to boot without a `DATABASE_URL`, printing actionable text in deploy logs:

```text
DATABASE_URL is required (postgresql:// connection string).
For local dev copy apps/cms/.env.example to apps/cms/.env and fill it in.
```

## 3. Required Environment Variables (apps/cms on Vercel)

| Variable | Required | Notes |
| --- | --- | --- |
| `PAYLOAD_SECRET` | yes | `openssl rand -hex 32`. Used for cookies / JWTs. Production build throws when unset. |
| `DATABASE_URL` | yes | Postgres connection string. Supabase pooler URLs (port 6543) work directly. |
| `PAYLOAD_DB_SCHEMA` | optional | Schema name scoping Payload tables. Defaults to `payload`. Use a distinct value per env when sharing one database (e.g. `payload_preview`). |
| `PAYLOAD_DB_PUSH` | optional | When `false`, disables automatic schema sync. Default behaviour pushes schema changes on every boot — leave it on until proper migrations are wired up (Phase 4+). |
| `NEXT_PUBLIC_SERVER_URL` | recommended | Public CMS URL for CORS + CSRF. Falls back to `https://$VERCEL_URL` (different per preview deploy). |
| `NEXT_PUBLIC_WEB_URL` | recommended | Public web URL for CORS + CSRF. Falls back to `https://$VERCEL_PROJECT_PRODUCTION_URL`. |

Set all of these for both **Production** and **Preview** environments in the Vercel dashboard (Settings → Environment Variables). Preview deploys without `DATABASE_URL` will throw at build time.

## 4. Database: Supabase Postgres

The repo currently runs against an existing Supabase Postgres (the same instance used by the `admin-acid` workspace). Payload's tables are isolated under the `payload` schema so the two apps coexist without interference.

### Connection details

- Connection string format: `postgresql://postgres.<project-ref>:<password>@aws-1-<region>.pooler.supabase.com:6543/postgres`.
- Port `6543` is Supabase's transaction-mode pooler — fine for Payload's read/write traffic. If you observe `prepared statement does not exist` errors at scale, switch to the session-mode pooler (port `5432` on the same hostname) by changing the port in `DATABASE_URL`.
- SSL is required by Supabase; the URL handles it implicitly via the pooler.

### Schema isolation

Set `PAYLOAD_DB_SCHEMA` per environment if you want Production and Preview to share a Postgres but not collide:

```text
Production : PAYLOAD_DB_SCHEMA=payload
Preview    : PAYLOAD_DB_SCHEMA=payload_preview
```

When omitted, both use `payload`. The first request after a deploy creates the schema and tables.

### Bootstrapping the schema (first-time only)

Payload's `push: true` config syncs schema changes via Drizzle's introspect/push mechanism, which runs **only** when the CMS is started in dev mode. On Vercel cold starts the runtime never executes a push, so a brand-new database boots into:

```text
relation "payload.users" does not exist
```

To create the `payload` schema and tables once, point a local `apps/cms` dev server at the remote database:

```bash
# In apps/cms/.env, set DATABASE_URL to the same value Vercel uses.
pnpm --filter cms dev
# Wait for "✓ Pulling schema from database..." then hit any admin URL once:
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3001/admin
```

After the first request the `payload` schema appears in Postgres with all required tables (`users`, `users_sessions`, `pages`, `payload_preferences`, etc.). Subsequent prod deploys read those tables happily.

Repeat this step whenever a schema change ships (new collection, new field) until the project graduates to proper migrations (Phase 4+).

### First admin user

The CMS does not seed an initial admin. After the schema is bootstrapped:

1. Visit `https://logos-co-cms.vercel.app/admin`.
2. Payload's first-run flow prompts for an admin email + password.
3. The user is written to the Postgres `payload` schema and persists across deploys.

If preview deploys share the same `DATABASE_URL` and `PAYLOAD_DB_SCHEMA`, the same admin user works everywhere. Set a different `PAYLOAD_DB_SCHEMA` for preview to isolate users; the bootstrap step needs to run once per schema.

### Alternative: dedicated Postgres / Neon / Vercel Postgres

Any Postgres works — swap `DATABASE_URL` and the rest of this guide stays the same. The adapter (`@payloadcms/db-postgres`) does not change.

## 5. Local Development

```bash
cp apps/cms/.env.example apps/cms/.env
# edit apps/cms/.env: paste real DATABASE_URL + a dev PAYLOAD_SECRET
pnpm install
pnpm --filter cms dev          # → http://localhost:3001/admin
pnpm --filter web dev          # → http://localhost:3000
```

`apps/cms/.env` is gitignored. Do not paste real credentials into `apps/cms/.env.example` — it is committed.

If multiple developers share one Postgres instance, set `PAYLOAD_DB_SCHEMA=payload_yourname` in your local `.env` to keep your sandbox isolated.

## 6. Web App (apps/web) Deployment

`apps/web` is currently static-export friendly and does not need the CMS at request time. Production env on Vercel:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SERVER_URL` | optional | Used to render absolute URLs (sitemap, OG tags). Defaults to localhost in dev. |

Vercel's standard Next.js build works without further configuration. The `content/**` directory is part of the repo, so the build reads fixtures directly.

## 7. Deploy Pipeline Sanity Check

After setting env vars and redeploying:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://logos-co-cms.vercel.app/api/pages
# Expected: 401  (unauthenticated request to a protected collection — Payload is up)
# Failure : 500  ("There was an error initializing Payload")
```

A 401 means Payload booted, talked to Postgres, and answered. A 500 means env vars are still wrong; check the Vercel deploy logs for the explicit error message — the new config prints actionable text instead of a generic stack.

## 8. Troubleshooting Checklist

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `There was an error initializing Payload` (still) | `DATABASE_URL` not set on the right environment (Production vs Preview) | Set on both. Vercel keeps them separate. |
| `DATABASE_URL is required ...` | env var unset entirely | Set `DATABASE_URL` in Vercel (Settings → Environment Variables) for the active environment. |
| `PAYLOAD_SECRET environment variable is required in production` | secret unset | Add `PAYLOAD_SECRET` to Vercel env vars. |
| `password authentication failed for user "postgres"` | wrong / rotated DB password | Update `DATABASE_URL` with the current Supabase password. |
| `connection reset` / `ECONNRESET` mid-request | Supabase pooler timeout under heavy load | Switch port from `6543` (transaction) to `5432` (session) in `DATABASE_URL`. |
| `prepared statement "S_1" does not exist` | transaction pooler dropped a prepared statement | Same fix — use the session pooler at port `5432`. |
| `relation "payload.users" does not exist` | tables not yet created in the target schema (Drizzle push only runs in dev mode) | Bootstrap by running `pnpm --filter cms dev` locally with `DATABASE_URL` set to the same value Vercel uses, hit `/admin` once, then redeploy prod. See "Bootstrapping the schema" above. |
| CORS errors from `apps/web` calling the CMS | `NEXT_PUBLIC_WEB_URL` mismatch | Set the env var to the exact web origin (no trailing slash). |
| Admin login redirects then fails | Cookie domain mismatch or stale session | Ensure `NEXT_PUBLIC_SERVER_URL` matches the URL the browser is using. Clear cookies. |
| Preview deploys mutate production data | Single schema across envs | Set `PAYLOAD_DB_SCHEMA=payload_preview` on the Preview env only. |

## 9. What Is Not Yet Wired

Tracked in plan §11 phases:

- **Phase 4a:** GitHub App authentication for CMS-driven PRs. Not needed for Payload to boot, but needed for editors to actually save changes back to GitHub.
- **Phase 4b/c:** Editor save flow + PR status panel — same plan section.
- **Phase 6:** External media storage. Phase 1 stores media in `apps/web/public/cms/...` inside the repo.

These phases are deployment-relevant when they land; this guide will be updated then.
