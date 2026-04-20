# @repo/tokens

Single source of design tokens for the Logos monorepo. CSS-only. No JS runtime.

## Usage

In any app's Tailwind entry stylesheet:

```css
@import 'tailwindcss';
@import '@repo/tokens/theme.css';
```

Individual layers are also exported if you need a subset:

- `@repo/tokens/colors.css`
- `@repo/tokens/typography.css`
- `@repo/tokens/spacing.css`
- `@repo/tokens/radius.css`
- `@repo/tokens/motion.css`

## Source of truth

Tokens mirror the Figma file — see [`docs/design-system-plan.md`](../../docs/design-system-plan.md) §4 and [`docs/figma-trace.yaml`](../../docs/figma-trace.yaml).

Do not hard-code HEX or px values in apps or in `@repo/ui`. Add a token here instead.
