# logos-turborepo-next-tailwind-i18n-template

A pnpm + Turborepo starter with:

- `apps/web`: Next.js frontend with Tailwind CSS v4 and `next-intl`
- `apps/cms`: standalone Payload CMS app with Admin dashboard
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
