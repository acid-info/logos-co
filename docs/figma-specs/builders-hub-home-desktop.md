# Builders Hub — Home (Desktop) — Implementation Brief

**Source:** Figma node `40009046:23948` ("Builders Hub")
**Persisted design context:** `/Users/mac/.claude/projects/-Users-mac-Desktop-work-logos-co/f3d98a87-a05b-49aa-a2e6-16d7d6bb710d/tool-results/toolu_0148dKiYtomEB3adMhDuYf85.json`
**Consumer route:** `apps/web/app/[locale]/builders-hub/page.tsx`
**Fixtures:** `content/builders-hub/{settings,rfps,ideas,resources}/`
**Status:** Hero through Ideas table captured from `get_design_context`; **Action Panels, Office Hours, Additional Resources** layouts confirmed via `get_metadata` re-fetch (positions, sizes, copy strings — typography/colors inherit from the same tokens used in 2.1–2.4). All sections specced.

---

## 1. Page-level layout

| Property | Value |
| --- | --- |
| Frame width | `1440px` (desktop only) |
| Page background | `var(--color-brand-off-white)` `#f5f5ef` |
| Top padding | `pt-[40px]` (40 px above first section) |
| Section stack | `flex flex-col gap-[40px] items-start` |
| Inner gutter (sections that respect grid) | `12px` left/right (`px-[12px]` on `LogosAppGiantSwitch`; sections like RFPs / Ideas use `left-[12px]` for body) |
| Top-of-page floats | "Logos App Install" pill CTA at `left:calc(83.33% + 2px)`, eyebrow paragraph at `left:calc(50% + 6px)` — Figma uses a 12-col-style absolute grid where 50% ≈ start of col 7 and 83.33% ≈ start of col 11 |

**Vertical section order (top → bottom)**

1. `Tech stack` block (= **Builders Hub Hero + Overview Links table**) — `h-[687px]`
2. `LogosAppGiantSwitch` (= **App Install pill**) — `h-[590px]`, gap 40 px above
3. `Tech stack` block #2 (= **RFPs section**) — `h-[770px]`, top border `1px solid var(--color-brand-dark-green)/10`
4. `Tech stack` block #3 (= **Ideas section**) — `h-[537px]`, top border `1px solid brand-dark-green/10`
5. (Truncated in Figma context) **Action Panel — Boilerplates**, **Office Hours**, **Additional Resources** — present in fixture `settings.actionPanels`, `settings.officeHours`, `settings.resourcesSection`. Confirm Figma layout via re-fetch.
6. **Footer** (`mobile="No"`) — `h-[708px]`, `bg-[var(--color-brand-dark-green)]` — already lives in `apps/web/components/site-footer.tsx`; do not rebuild.

---

## 2. Section-by-section breakdown

### 2.1 Hero + Overview Links — `Tech stack` block (node `40009046:23949`)

| Element | Spec |
| --- | --- |
| Container | `bg-[#f5f5ef]`, `h-[687px]`, `w-[1440px]`, `overflow-clip`, position relative |
| Logomark `λ` (`image 1295`, node `:24005`) | absolute `left-[12px] top-[24px]`, `w-[107px] h-[75px]`, with darken overlay `bg-black/30`. **Replace with `<LogosMark />` from `@repo/ui`** sized to ~75 px tall, color = `currentColor` on `text-brand-dark-green`. The image overlay is a Figma rendering quirk; do not reproduce. |
| Eyebrow paragraph (node `:23950`) | "Ideas, resources, and everything you need to start building with Logos tech today." Font Fira Mono Regular 10/1.3, color `#000`. Position `left-[calc(50%+6px)] top-[24px] w-[226px]`. Map to `text-eyebrow` utility but body sits in mono; safer: `font-mono text-[10px] leading-[1.3]`. |
| Top-right pill CTA (node `:23951`) | Label "Logos App Install". `text-eyebrow` (Fira Code SemiBold 10 / 1.35 / uppercase). Border-bottom underline `border-b border-[brand-dark-green/50]`, `pb-[2px]`. `backdrop-blur-[5px]`, rounded `var(--grid/borderradiusbutton, 4px)`. Position `left-[calc(83.33%+2px)] top-[11px]`. |
| Hero title (node `:23952`) | Two lines: **"Logos"** then **"Builders Hub"**. Font Rhymes Display 56 / 1 / `tracking-[-1.68px]` / center. Color `brand-dark-green`. Centered: `-translate-x-1/2 left-1/2 top-[140px] w-[464px]`. Map to `text-h2` utility (which is 56 px @ md). |
| Overview Links table (node `:23954`) | Five `Row entry` rows stacked, full-bleed `w-[1440px]`, each `h-[70px]`. Alternating backgrounds: odd rows `bg-[var(--color-gray-01)] (#dbddd7)`, even rows `bg-brand-dark-green/5` (`rgba(21,37,33,0.05)`). Top of table: `top-[337px]`. |
| Row layout | absolute children, gap 12. Three columns: **(1) Index + Title** `w-[714px] pl-[12px] py-[12px] gap-[12px] items-baseline`; **(2) Description** `w-[464px] py-[12px]`, inner `w-[345px]`; **(3) Two CTAs** `gap-[12px] py-[12px]`. |
| Row index | Public Sans Medium 14 / 1.2, `w-[18px]`. Strings: `01`, `02`, `03`, `04`, `05`. |
| Row title | Rhymes Text 14 / 1.2, no italic, whitespace-nowrap. Strings (rows 1→5): **"Ideas"**, **"RFPs"**, **"Resources"**, **"GitHub Issues"**, **"Contribute"**. |
| Row description | Fira Mono Regular 10 / 1.3, `w-[345px]`. **In Figma all 5 rows show identical placeholder** "Advanced privacy for a new era of decentralised applications and social institutions." → real copy comes from `settings.overviewLinks[i].description`. |
| Row CTAs | Two underline-style CTAs per row: "Learn More" + "View the Docs". Same pill spec as top-right CTA. Real labels come from `overviewLinks[i].primaryCta.label` / `secondaryCta.label`. |
| Row hover | not defined in this node — use shared CTA hover from existing button primitive |

### 2.2 App Install (`LogosAppGiantSwitch`, node `40009046:18801`)

Reused component already designed as a "giant switch" (left/right pair with rounded `200px` panels).

| Element | Spec |
| --- | --- |
| Container | `flex gap-[12px] h-[590px] items-center px-[12px] w-[1440px] overflow-clip` |
| Panel | flex-1 child, `bg-[var(--color-gray-01)] #dbddd7`, `rounded-[200px]`, `h-full` |
| Image (`image 1282`, node `:18816`) | inside panel, `left-[12px] top-[12px] size-[566px] rounded-[188px] overflow-clip`. Inside, `image 1282` is `w-[584px] h-[644px]` centered. Asset: `imgImage1282` → maps to fixture `settings.appInstall.image.src` = `/cms/builders-hub/settings/app-install.webp` (566×566). |
| Copy block | absolute `left-[714px] top-[50%] -translate-y-1/2 w-[583px] flex flex-col gap-[40px]` |
| Title | "Install the Logos app." — Rhymes Text 36 (`var(--text/h3, 36px)`) / `leading-none` / `tracking-[-1.08px]`, `w-[573px]`. Map to `text-h3-serif`. |
| Description | "The Logos App is a a complete distribution that bundles the kernel, the default modules, and UI packages into a usable product. It provides the primary user interface, hosting "Simple Apps" that let users interact with the various modules:" — Public Sans Regular 14 / 1.2, `w-[464px]`. **Note typo "is a a" in Figma**; fixture has correct copy → use fixture. |
| Tags row (`:18808`) | `flex gap-[6px] items-center`. Four `Tag` chips: Wallet, Chat Interface, Filesharing Tool, Explorer. Chip spec: `bg-brand-off-white/50`, `px-[10px] py-[8px] rounded-[12px] gap-[8px]`, icon `size-[14.4px]`, label Public Sans Regular 14/1.2, color `brand-dark-green`. Icons: `wallet-cards`, `message-square-code`, `file-input`, `globe` (lucide-style). |
| CTA row | `flex gap-[10px] items-baseline`. Primary "Install" — outlined: `border border-brand-dark-green/50 px-[12px] py-[8px] backdrop-blur-[5px]`, label `text-eyebrow` color `brand-dark-green`, trailing right-arrow icon `size-[15px]`. Secondary "Learn more" — same eyebrow style, no border, with arrow. |
| Hidden state (`:18818`) | "Download started!" overlay `opacity-0`. Skip on first pass. |

### 2.3 RFPs Section (node `40009046:24008`)

| Element | Spec |
| --- | --- |
| Container | `bg-[#f5f5ef]`, `border-t border-brand-dark-green/10`, `h-[770px]`, `w-full`, `overflow-clip` |
| Eyebrow (`:24009`) | "Lorem ipsum dolor si amet." Fira Mono 10/1.3, `left-[calc(50%+6px)] top-[39px] w-[226px]`. **Use fixture** `rfpsSection.description` ("Funded calls for builders to ship Logos-powered applications."). |
| Top-right CTA (`:24010`) | "Explore RFPs" eyebrow pill, `left-[calc(83.33%+2px)] top-[29px]`. **Fixture has 3 CTAs:** `filterCta` ("Filter"), `seeAllCta` ("See all RFPs"), `submitCta` ("Submit an RFP"). Figma shows only one — clarify which slot. |
| Title (`:24012`) | "RFPs" — Rhymes Text 36 / `leading-none` / `tracking-[-1.08px]`, `left-[12px] top-[39px]`. Map to `text-h3-serif`. |
| Card grid (`:24014`) | `flex flex-col gap-[12px]` of two rows, each `flex gap-[12px] w-[1416px]`. **4 cards per row × 2 rows = 8 cards** (matches fixture `displayCount: 8`). |
| Card | `w-[345px] h-[317px] rounded-[12px] border border-brand-dark-green/50 overflow-clip relative`. |
| Card title | absolute `left-[15px] top-[15px] w-[249px]`. Public Sans Regular 24 / 1.1 / `tracking-[-0.24px]`. Color `brand-dark-green` (Figma uses `var(--primary/background, #152521)` here — same color, just labeled oddly). Map to `text-h4-sans` (size matches; check tracking). |
| Card description | absolute `bottom-[15px] left-[15px] w-[186px]` (Figma uses bottom-anchored offsets, e.g. `bottom-[39px] translate-y-full`). Fira Mono 10 / 1.3, color `brand-dark-green`. |
| Card image | absolute `bottom-[10–11px] right-[9–10px] w-[96px]` height variable (77 / 119 / 120 / 127 px depending on asset). |
| Card CTA | absolute `left-[15px] top-[82px]`, "Learn More" eyebrow underline-style pill. **Fixture has `ctaLabel: "Apply"`** — clarify whether card CTA is "Apply" (per-RFP `applyUrl`) or "Learn More" (RFP detail page). |
| Sample card titles in Figma | Attack Resistant Public Registries, Decentralized Archives, Private Financial Networks, Community Governance Processes (these are placeholder strings, **real titles from `rfps/<slug>/en.json`**). |
| Terminator card (last cell, node `:24066`) | Title "See all ideas". Body slot empty. Decorative strip of 4 stacked thumbnails at `top-[177px] left-[-27px] gap-[6px]`, each `w-[96px]`, mixed heights. Maps to fixture `rfpsSection.terminatorCard.thumbnailSlugs` = ideas (`quadratic-voting`, `community-bank`, `permissionless-dns`). Note: only 3 slugs in fixture but Figma shows 4 thumbnails — schema gap. |

### 2.4 Ideas Section (node `40009046:24075`)

| Element | Spec |
| --- | --- |
| Container | `bg-[#f5f5ef]`, `border-t border-brand-dark-green/10`, `h-[537px]` |
| Eyebrow (`:24076`) | "Ideas from our community driving sovereignty forward." — matches fixture `ideasSection.description`. |
| Top-right CTA (`:24077`) | "See all ideas" eyebrow pill at `left-[calc(83.33%+2px)] top-[29px]`. Fixture has `seeAllCta` + `submitCta` ("Submit an idea") — two pills likely needed; Figma only shows one. |
| Title (`:24079`) | "Ideas" — Rhymes Text 36, same as RFPs. |
| Rows table (`:24081`) | `flex flex-col items-start w-[1440px]` of `Row entry` blocks. Each row `h-[50px]` (shorter than overview-links rows which are 70 px). Top at `top-[116px]`. **7 rows visible** (matches fixture `displayCount: 7`). Alternating bg same as 2.1: `gray-01` / `brand-dark-green/5`. |
| Row layout | Three columns at gap 12: **(1) Index + Title** `w-[714px] pl-[12px] py-[12px] items-baseline`. **(2) Submitter line** `w-[464px] py-[12px]`, two-line block (line 1: idea summary, line 2: "Idea by @<handle>"). Both lines Fira Mono 10/1.3. **(3) Reward + CTA** `gap-[12px] py-[12px]`. |
| Reward block | `w-[107px]` two lines: `2500 USDC` then `+ 1000 XP`. Fira Mono 10/1.3. |
| Per-row CTA | "Apply" — eyebrow underline-style pill (matches RFP card CTA). |
| Row title strings (Figma) | row 1 "Secure and Decentralized Frontends" (RFP slug — likely placeholder copy in Ideas, designer reused); rows 2–7: "Build a DEX", "Integrate Logos blockchain into Fileverse", "Lorem Ipsum Dolor Si Amet", "Secure and Decentralized Frontends", "Build a DEX", "Integrate Logos blockchain into Fileverse". All placeholders — **real copy from `ideas/<slug>/en.json` titles**. |

### 2.5 Action Panels — Boilerplate + Office Hours (node `40009046:24159`, confirmed via metadata re-fetch)

**Two side-by-side panels** at y=2784, container `h-[580px] w-[1440px]`. Each panel `w-[702px] h-[500px]` at `top-[40px]`, gap 12 px (left at `x=12`, right at `x=726`).

| Element | Spec |
| --- | --- |
| Left panel (Boilerplate, node `:24160`) | `image 1316` (cover) at `left-[-65px] top-[-532px] w-[892px] h-[1114px]` — image overflows the 702×500 frame, clipped by `rounded-[…]` overlay. Maps to `settings.actionPanels[0]` (variant `image-overlay`). Centered text block at `left-[135px] top-[184.5px] w-[432px]`: line 1 "Get started faster with boiler plate apps" (Public Sans Regular 18 / 1.2 / centered), line 2 "Community boiler plates reference implementations that can save time and effort." (Fira Mono 10 / 1.3 / centered, w-[380px]). CTA "Go" at `left-[309px] top-[275.5px] w-[61px] h-[31px]` — outlined-action-button style. |
| Right panel (Office Hours, node `:24166`) | No background image — flat panel. Maps to `settings.officeHours`. Text block at `left-[16px] top-[191.5px] w-[670px]`: line 1 "Office hours" centered, line 2 "Talk to Logos core contributors" (Fira Mono 10 / 1.3 / w-[380px], offset `left-[145px]` — center-anchored). CTA "Join" at `left-[305.5px] top-[277.5px] w-[91px] h-[31px]`. |

> Office Hours is the **right action panel**, not its own section. Schema does have `settings.officeHours` separate from `actionPanels[]`; reconcile by treating `officeHours` as `actionPanels[1]` at render time, OR keep separate and render together in a `BuildersHubActionPanels` component.

### 2.6 Additional Resources (node `40009046:24171`, confirmed via metadata re-fetch)

Same row-table pattern as 2.1 Overview Links and 2.4 Ideas — but **4 rows** and slightly different right column.

| Element | Spec |
| --- | --- |
| Container | `h-[421px] w-[1440px]` |
| Eyebrow (`:24172`) | "Reference material to help you ship faster." Fira Mono 10/1.3, `left-[calc(50%+6px)] top-[39px] w-[226px]`. |
| Top-right CTA (`:24173`) | "Visit Help Center" — eyebrow pill, `left-[calc(83.33%+2px)] top-[39px]`. From fixture `resourcesSection.helpCenterCta`. |
| Title (`:24175`) | "Additional Resources" — Rhymes Text 36 / `leading-none` / `tracking-[-1.08px]`, two lines (`w-[163px] h-[62px]`). |
| Rows (`:24177`) | 4 rows × `h-[50px]`, top at `top-[157px]`. Alternating bg same as overview links. |
| Row layout | Same 3-column as 2.1 / 2.4. **Right column:** primary CTA "Open" (60w eyebrow pill) + an empty 107×50 slot where reward block sits in Ideas — likely a download/external indicator slot. Confirm with fixture: `resources/en.json` has `cta` only, no reward. |
| Row title strings (Figma) | "Quick Start Your Projects", "Documentation", "Boiler Plates and Examples", "Video Tutorials" — match `resources/en.json` (mod minor capitalization). |

---

## 3. Component candidates

| Component | Wraps Figma node(s) | Driven by fixture path |
| --- | --- | --- |
| `BuildersHubHero` | `:23949` (title + eyebrow + logomark + top-right CTA) | `settings.hero.{title,description}` + `settings.overviewLinks[0].primaryCta` for top-right pill (clarify) |
| `BuildersHubOverviewLinks` | `:23954` (5-row table) | `settings.overviewLinks[]` — keys `ideas`/`rfps`/`resources`/`github-issues`/`contribute` |
| `BuildersHubOverviewRow` | `:23955` etc. | one item from `overviewLinks` |
| `BuildersHubAppInstall` | `:18801` (`LogosAppGiantSwitch`) | `settings.appInstall.*` |
| `BuildersHubRfpsSection` | `:24008` (header + grid) | `settings.rfpsSection.*` + RFP loader |
| `RfpCard` | `:24016` etc. (single card) | `rfps/<slug>/{index,en}.json` |
| `RfpTerminatorCard` ("See all ideas") | `:24066` | `settings.rfpsSection.terminatorCard.*` |
| `BuildersHubIdeasSection` | `:24075` (header + table) | `settings.ideasSection.*` + idea loader |
| `IdeaRow` | `:24082` etc. (single row) | `ideas/<slug>/{index,en}.json` |
| `BuildersHubActionPanel` | (not captured) | `settings.actionPanels[]` |
| `BuildersHubOfficeHours` | (not captured) | `settings.officeHours.*` |
| `BuildersHubResources` | (not captured) | `settings.resourcesSection.*` + `resources/en.json` items |
| `EyebrowPill` (shared) | `Button Content` instances (e.g. `I*:1022:6211`) | n/a — primitive |
| `OutlinedActionButton` (shared) | `:18814` (`Install` style) | n/a — primitive |
| `TagChip` (shared) | `Tag` Figma component | `appInstall.tags[]` |

> Reuse existing `apps/web/components/ui/*` button primitives — confirm they already render the eyebrow underline-pill spec; if not, add a variant.

---

## 4. Cross-reference with fixtures

### Hero / settings.hero

| Figma | Fixture field | Status |
| --- | --- | --- |
| Title "Logos / Builders Hub" (two lines) | `hero.title: "Logos Builders Hub"` | ✅ — split into two lines in component, store one string |
| Eyebrow body "Ideas, resources…" | `hero.description` | ✅ |
| Top-right pill "Logos App Install" | **no fixture field** | ⚠️ schema gap — add `hero.cta: { label, href, anchor? }` (likely scrolls to App Install section) |
| Logomark | n/a (use `<LogosMark />`) | ✅ |

### Overview Links / settings.overviewLinks

| Figma | Fixture field | Status |
| --- | --- | --- |
| Index `01..05` | derived from array order | ✅ |
| Row title (Ideas, RFPs, Resources, GitHub Issues, Contribute) | `overviewLinks[i].title` | ✅ |
| Row description | `overviewLinks[i].description` | ✅ |
| Two CTAs per row | `primaryCta` + `secondaryCta` | ✅ — but the **Resources / GitHub Issues / Contribute** rows in fixture only have `primaryCta`. Figma shows both CTA slots filled on every row → **schema gap**: either populate `secondaryCta` everywhere or render conditionally with proper layout fallback. |

### App Install / settings.appInstall

| Figma | Fixture field | Status |
| --- | --- | --- |
| Title "Install the Logos app." | `title` | ✅ |
| Description | `description` (no typo) | ✅ |
| Tags Wallet/Chat/Files/Explorer | `tags[]` with `icon` enum | ✅ — confirm icon mapping `wallet`→wallet-cards, `chat`→message-square-code, `files`→file-input, `explorer`→globe |
| Install / Learn more CTAs | `installCta` + `learnMoreCta` | ✅ |
| Image | `image.{src,width,height}` 566×566 | ✅ |
| `accent: "grey"` | controls panel `bg-gray-01` | ✅ |
| `imagePosition: "left"` | image is on left in Figma | ✅ |

### RFPs / settings.rfpsSection + rfps/*

| Figma | Fixture field | Status |
| --- | --- | --- |
| Section title "RFPs" | `rfpsSection.title` | ✅ |
| Eyebrow description | `rfpsSection.description` | ✅ |
| Top-right pill (single) | `filterCta` / `seeAllCta` / `submitCta` (3 in fixture) | ⚠️ **Figma shows one CTA — clarify which is canonical**, or extend Figma to show all three |
| 8 cards | `displayCount: 8` + `pinnedSlugs` | ✅ |
| Card title | `rfps/<slug>/en.json#title` | ✅ |
| Card description | (no fixture short-blurb field) | ⚠️ **schema gap**: `en.json` has `summary` and `description` only. Figma description appears to be a 1-sentence pitch ≈10–15 words, separate from the longer `summary`. Add `tagline` or reuse `summary` truncated. |
| Card image | `rfps/<slug>/index.json#image` 96×120 | ✅ |
| Per-card CTA | "Learn More" in Figma vs `ctaLabel: "Apply"` in fixture | ⚠️ mismatch — clarify |
| Reward (USDC + XP) | `reward.{amount,currency,xp}` — NOT shown on RFP cards in Figma, only on Ideas rows | ✅ — fixture has it, Figma card omits |
| Tags | `tags[]` | ⚠️ Figma RFP card does **not** render tags. Fixture has them; either drop from card or add later. |
| `applyUrl`, `closesAt`, `publishedAt`, `owner`, `featured`, `order`, `relatedIdeas` | fixture only | ⚠️ **fields not visible in Figma home card** — used elsewhere (detail page); fine to keep |
| Terminator card | `terminatorCard.thumbnailSlugs` (3 slugs) | ⚠️ Figma shows **4 thumbnails**; fixture has 3. Either add a 4th slug or render with 3. |

### Ideas / settings.ideasSection + ideas/*

| Figma | Fixture field | Status |
| --- | --- | --- |
| Section title "Ideas" | `ideasSection.title` | ✅ |
| Eyebrow description | `ideasSection.description` | ✅ |
| Top-right pill (single, "See all ideas") | `seeAllCta` + `submitCta` (2 in fixture) | ⚠️ Figma shows 1; fixture has 2 |
| 7 rows | `displayCount: 7` | ✅ — but fixture has only **3 ideas** — need 4 more idea fixtures or accept under-fill |
| Row title | `ideas/<slug>/en.json#title` | ✅ |
| Row "summary line" e.g. "Quadratic voting platform for DAO members" | `ideas/<slug>/en.json#summary` (truncate?) | ⚠️ Figma short summary is one line ≈ 6 words; current `summary` is one full sentence. Add `tagline` or render `summary` clipped. |
| Row "Idea by @handle" | `ideas/<slug>/index.json#submitter.handle` | ✅ — prefix "Idea by @" hardcoded in component |
| Reward "2500 USDC + 1000 XP" | `reward.{amount,currency,xp}` | ✅ — but **`permissionless-dns` has no `xp`** and **`community-bank` has no `reward` at all** — schema/data gap. Either make reward optional rendering or backfill fixtures. |
| Row CTA "Apply" | `ctaLabel: "Discuss"` in idea `en.json` | ⚠️ mismatch — fixture says Discuss (idea forum link), Figma row says Apply. Clarify intent; ideas usually link to `discussionUrl`. |
| `image`, `tags`, `featured`, `order`, `submittedAt` | fixture-only | ✅ — image used on terminator card thumbnails, tags not rendered on rows |

### Action Panels / Office Hours / Resources

Figma context truncated. Fixtures complete; component layout needs Figma re-fetch before coding.

---

## 5. Asset inventory

All assets in Figma are bound to MCP URLs (`https://www.figma.com/api/mcp/asset/<uuid>`) and must be re-exported as static files into `apps/web/public/cms/builders-hub/`.

| Figma constant | Used in | Fixture path / proposed file | Type | Action |
| --- | --- | --- | --- | --- |
| `imgImage1295` | Hero logomark frame (with overlay) | n/a | Decorative — replace with `<LogosMark />` | **Stub / use SVG component** |
| `imgVector` + `imgGroup4` | Footer logomark | already in `<LogosMark />` | SVG | Reuse |
| `imgImage1282` | App Install (`566×566 → 584×644 inner`) | `/cms/builders-hub/settings/app-install.webp` | Custom illustration (Logos app screenshot/mock) | **Needs export from designer** |
| `imgWalletCards`, `imgMessageSquareCode`, `imgFileInput`, `imgGlobe` | App Install tag chips | `@repo/ui/icons` | Lucide-style icons | **Needs React-SVG components in `@repo/ui/icons`** if missing — flag for export. Per repo memory, no `<img src=".svg">`. |
| `imgImage104`, `imgImage118`, `imgImage102`, `imgImage1277`, `imgImage1316` | RFP cards + terminator card thumbnails | `/cms/builders-hub/{rfps,ideas}/<slug>/cover.webp` | Custom illustrations (4 distinct images, repeated across cards in placeholder grid) | **Needs export per slug** — fixture already references `cover.webp` per slug |
| `imgImage1315` | Footer brand mark (existing) | already in `site-footer` | reused | ✅ |
| `imgVectorStroke`, `imgVectorStroke1` | Right-arrow icon, download icon | should be `<RightArrowIcon />` / `<DownloadIcon />` in `@repo/ui/icons` | Icons | Verify component exists; otherwise flag for export |

---

## 5b. Mobile deltas (Figma node `40009046:23764`, frame 393 × 5279)

| Section | Desktop | Mobile |
| --- | --- | --- |
| Frame width | 1440 | 393 |
| Hero title | centered, 2-line (`w-464 h-97`) | left-aligned 1-line wrap (`w-464 h-69`, glyph overflow allowed by Figma; render with `text-h2` mobile size 40 / leading-none / `tracking-tight`) |
| Top-right hero pill | `left-[calc(83.33%+2px)] top-[11px]` | `left-[417px] top-[11px]` (off-screen — rendered inline-right of the eyebrow at `top-[24px]`) |
| Hero eyebrow | `left-[calc(50%+6px)] top-[24px] w-[226px]` | `left-[203px] top-[24px] w-[178px]` |
| Overview row | 70 h, 3-col (title 714 / desc 464 / 2 CTAs 150) | **104 h, stacked**: row 1 = "0X Title" + 2 CTAs at `left-[203px]`; row 2 = description full-width below at `top-[53px]` |
| Overview row index+title | separate "01" + "Ideas" nodes | merged single node "01 Ideas" |
| RFP grid | 4 × 2 = 8 cards | **horizontal scroll carousel** — 4 cards in a 1416 × 317 strip clipped by a 369 × 317 viewport at `top-[175px]`. Card geometry unchanged (345 × 317). |
| RFP section title | `text-h3-serif` (36 px) | `text-h3-serif` (30 px mobile) |
| RFP eyebrow + top-right CTA | side-by-side at top-right | eyebrow at `(203, 40) w-178`; CTA at `(203, 90) w-91 h-15` (stacked below eyebrow) |
| Ideas table row | 50 h, 3-col | **116 h, mixed**: title row at top (`0X Title`, w-191), description+submitter on row 2 below at `top-[75px]` (single line "<tagline> / Idea by @<handle>"), reward + CTA stacked on the right column at `left-[298px]` (CTA `w-73 h-31` at top, reward "2500 USDC + 1000 XP" at `top-[75px]`) |
| Ideas row CTA | 30 × 17 link-style | 73 × 31 outlined-action-button (filled bg) |
| Action panels | side-by-side 702 × 500 | **stacked** 369 × 270 each: boilerplate at `top-[40]`, office hours at `top-[322]`. Both centered text. |
| Boilerplate cover (image 1316) | overflows 702 × 500 frame | overflows 369 × 270 frame; same image |
| Resources rows | 4 × 50 h | 4 × 58 h, single line each: "0X Title" at left + CTA "Get help" at right `left-[298]` |

**Frame total height:** 5279 (mobile) vs 4573 (desktop). Most of the delta is in the Ideas table (7 × 116 = 812 vs 7 × 50 = 350).

**Implementation rule:** all sections render mobile-first; desktop overrides at `md:` breakpoint (768 px in Tailwind, ≈ Figma's 800 px boundary).

---

## 6. Open questions

1. ~~Truncated Figma context~~ — resolved via `get_metadata` re-fetch. Sections 2.5–2.7 fully specced.
2. **Top-right Hero pill** ("Logos App Install") — is this a scroll-to-section anchor, a separate route, or the same target as `appInstall.installCta`? Fixture has no `hero.cta` field today.
3. **Section CTAs (RFPs/Ideas)** — fixture defines 2–3 CTAs per section header (filter/see-all/submit). Figma shows only one pill in the top-right. Are the others rendered elsewhere (e.g. inside the section but lower) or dropped on the home view?
4. **Card / row CTA labels** — Figma RFP cards say "Learn More", Ideas rows say "Apply". Fixtures store `ctaLabel: "Apply"` (RFPs) and `ctaLabel: "Discuss"` (ideas). Should the home view ignore per-item `ctaLabel` and always say "Learn More" on RFPs / "Apply" on ideas? Or trust the per-item value?
5. **RFP card description** — current schema has `summary` + `description`. Figma card uses a tight one-line blurb. Add `tagline` (or use truncated `summary`)?
6. **Idea row reward** — should rows render reward only when present? `community-bank` has no reward; `permissionless-dns` has no `xp`. Confirm graceful empty-state.
7. **Terminator card thumbnails** — Figma shows 4, fixture supplies 3. Add a 4th slug or accept 3?
8. **Idea fixture count** — fixture has 3 ideas, Figma shows 7 rows. Author 4 more ideas, or repeat / pad with placeholders?
9. **Overview links secondary CTA** — Resources/GitHub Issues/Contribute rows have only `primaryCta`. Figma shows both CTA columns filled. Add `secondaryCta` everywhere or render single-CTA layout for those rows?
10. **`accent: "grey"` for App Install** — fixture supports `accent` enum. Are other variants (`yellow`, `green`?) used elsewhere on the page (e.g. action panels)? Confirm before extending the type.
11. **Eyebrow positioning** — Figma uses `left-[calc(50%+6px)]` and `left-[calc(83.33%+2px)]` everywhere. This implies a 12-col grid. Should we standardise on Tailwind `grid-cols-12` + `col-start-7` / `col-start-11` for these absolute placements?
