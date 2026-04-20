# Logos Design System Plan

> **Status**: Draft · **Scope**: tokens only · **Last updated**: 2026-04-20
> **Source of truth**: Figma frame `Color Palette & Type` — node `40009046:20491` in file `qpsaED5iVKrOXoxwCWXuN3`.
> [Figma — Color Palette & Type](https://www.figma.com/design/qpsaED5iVKrOXoxwCWXuN3/Logos?node-id=40009046-20491)

---

## 1. Goals

1. Mirror the Figma Color Palette & Type frame as a reusable token package.
2. Let every app (`web`, `cms`, future) consume the same tokens by importing one CSS file.
3. Keep the scope disciplined — this plan covers colors and typography only.

## 2. Non-Goals

- Component library. Components are out of scope for this plan. They may be added later under a separate, explicitly scoped plan.
- Runtime theming engine; CSS variables are sufficient.
- Public npm distribution.

---

## 3. Architecture

```text
packages/
├── tokens/          ← single source for design tokens (CSS-only)
│   ├── src/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css      (placeholder)
│   │   ├── radius.css       (placeholder)
│   │   ├── motion.css       (placeholder)
│   │   └── theme.css        ← aggregator
│   └── package.json
├── ui/              ← empty scaffold (no components in scope)
├── config/          ← existing
└── types/           ← existing
```

Apps import tokens in their Tailwind entry stylesheet:

```css
/* apps/web/css/tailwind.css, apps/cms/css/tailwind.css */
@import 'tailwindcss';
@import '@repo/tokens/theme.css';
```

`@repo/tokens` exports CSS only. Zero JS runtime.

---

## 4. Token spec

### 4.1 Colors — [`packages/tokens/src/colors.css`](../packages/tokens/src/colors.css)

| Token | Hex |
|---|---|
| `--color-brand-dark-green` | `#152521` |
| `--color-brand-off-white` | `#F5F5EF` |
| `--color-brand-yellow` | `#FFD328` |
| `--color-accent-steel-teal` | `#5F797C` |
| `--color-accent-light-blue` | `#C6EBF7` |
| `--color-accent-tan` | `#E2E0C9` |
| `--color-accent-brown` | `#A18863` |
| `--color-accent-purple` | `#48373F` |
| `--color-gray-01` | `#DBDDD7` |
| `--color-gray-02` | `#B8BDB8` |
| `--color-gray-03` | `#9EA5A0` |
| `--color-gray-04` | `#848E88` |
| `--color-gray-05` | `#616E69` |
| `--color-gray-06` | `#475651` |
| `--color-black` | `#000000` |
| `--color-white` | `#FFFFFF` |

Alpha variants (Figma: Primary/50% Text, 10%, 5%, etc.) are expressed via Tailwind v4 slash syntax — no separate tokens needed:

- `text-brand-dark-green/50` · `bg-brand-off-white/10` etc.

### 4.2 Typography — [`packages/tokens/src/typography.css`](../packages/tokens/src/typography.css)

#### Families

- `--font-display` — Rhymes Display (commercial, self-hosted; see §6)
- `--font-sans` — Public Sans
- `--font-mono` — Fira Code · Fira Mono

#### Scale (desktop / mobile · utility classes)

| Utility | Family | Size (D / M) | Line-height | Tracking |
|---|---|---|---|---|
| `text-hero` | Display | 140 / 70 | 100% | −4% |
| `text-h1` | Display | 96 / 56 | 98% | −4% |
| `text-h2` | Display | 56 / 40 | 100% | −3% |
| `text-h3-serif` | Display | 36 / 30 | 100% | −3% |
| `text-h3-sans` | Sans | 36 / 30 | 100% | −2% |
| `text-h4-serif` | Display | 24 | 110% | −1% |
| `text-h4-sans` | Sans | 24 | 110% | −1% |
| `text-subhead-serif` | Display | 18 | 110% | −1% |
| `text-subhead-sans` | Sans | 18 | 115% | −1% |
| `text-body-serif` | Display | 14 | 120% | 0 |
| `text-body-sans` | Sans | 14 | 120% | 0 |
| `text-eyebrow` | Fira Code Medium | 10 | 130% | 0 · uppercase |
| `text-mono-s` | Fira Mono | 10 | 130% | 0 |

The mobile value is the default; the desktop value kicks in at `md` (≥ 48rem).

### 4.3 Spacing / Radius / Motion

Not covered by the Color Palette & Type frame. Files exist as placeholders (`spacing.css`, `radius.css`, `motion.css`) for a future scope extension.

---

## 5. Phases — status

| Phase | Description | Status |
|---|---|---|
| 0 | Scaffold `packages/tokens` | ✅ done |
| 1 | Fill `colors.css` and `typography.css` from Figma; wire the app | ✅ done |
| 2 | Fill `spacing.css` / `radius.css` / `motion.css` | ⏸ out of scope until the relevant Figma frame is identified |

---

## 6. Font loading (apps/web)

- **Public Sans** — loaded via `next/font/google`.
- **Fira Code** — loaded via `next/font/google` (covers Regular + Medium for Mono S and Eyebrow / CTA).
- **Rhymes Display** — commercial; must be self-hosted. The loader block in [`apps/web/app/fonts.ts`](../apps/web/app/fonts.ts) is currently commented out so `pnpm dev` / `pnpm build` succeed without the woff2. To enable:
  1. Drop `apps/web/public/fonts/rhymes-display/rhymes-display-regular.woff2` (license verification required — see [`apps/web/public/fonts/README.md`](../apps/web/public/fonts/README.md)).
  2. Uncomment the `rhymesDisplay` block and add `rhymesDisplay.variable` to `fontVariables`.
- Until Rhymes Display is enabled, `--font-display` falls back to `Times New Roman` → `Georgia` → `ui-serif` (chain defined in `@repo/tokens/typography.css`).

---

## 7. Traceability

The current Figma file (`qpsaED5iVKrOXoxwCWXuN3`) is treated as an internal copy. The customer's canonical file is not yet accessible to this environment. [`docs/figma-trace.yaml`](./figma-trace.yaml) is the single authoritative map of path → file ID; code comments and docs use human-readable paths (page name / frame name) rather than node IDs, so the map survives file duplication.

---

## 8. Catalog page

A read-only catalog of the tokens is rendered at [`apps/web/app/[locale]/design-systems/page.tsx`](../apps/web/app/%5Blocale%5D/design-systems/page.tsx). It displays the palette swatches and the full type scale using the utilities declared in `@repo/tokens`. Accessible at:

```text
/<locale>/design-systems
```

---

## 9. Open questions

- [ ] Rhymes Display — confirm license and drop the woff2 into `apps/web/public/fonts/rhymes-display/`.
- [ ] Dark mode behavior — not shown in the current Figma frame; clarify with the designer before adding.
- [ ] Contrast check for Yellow `#FFD328` on Off-White for WCAG AA.
- [ ] Scope expansion — when components are needed, a separate plan document should be added under `docs/` and reference specific Figma nodes.
