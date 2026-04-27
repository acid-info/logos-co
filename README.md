# logos-turborepo-next-tailwind-i18n-template

A pnpm + Turborepo starter with:

- `apps/web`: Next.js frontend with Tailwind CSS v4 and `next-intl`
- `apps/cms`: standalone Payload CMS app with Admin dashboard
- `packages/content`: shared content schemas + loaders for `content/**` (consumed by both apps)
- `packages/ui`: shared React UI primitives
- `packages/config`: shared ESLint / TypeScript / Prettier config
- `packages/types`: shared application types, including Payload-generated types

## Why this shape

- Apps stay as entrypoints only.
- Shared code lives in purpose-specific packages.
- The CMS is isolated from the frontend deployment boundary.
- Payload-generated types can be shared without coupling the frontend to Payload runtime packages.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm check-types
pnpm generate-types
```

## Local URLs

- Web: `http://localhost:3000`
- CMS: `http://localhost:3001`
- Payload Admin: `http://localhost:3001/admin`

## Documentation

- [docs/cms-github-content-plan.md](./docs/cms-github-content-plan.md) — Schema, loader, and CMS-via-GitHub workflow plan (canonical)
- [docs/deployment.md](./docs/deployment.md) — Vercel deployment, required env vars, Turso DB setup, troubleshooting
- [docs/web-pages.md](./docs/web-pages.md) — Per-page web requirements
- [docs/components.md](./docs/components.md) — Component-level Figma references
