# WatchNXT — Design System & Build Blueprint

> A sports-only OTT streaming platform. UI language inherited from **JioHotstar** (dark, cinematic, gradient-glass, motion-first). Content/IA inherited from the provided Figma screens (`Login`, `Enter OTP`, `Home` ×4 variants, `Live Listing`). This document is the single source of truth to start the React build — colors, components, motion, structure, and stack are all defined here so screen-building can start immediately without re-deriving decisions.

Reference screens analyzed (from `C:\Users\stann\Downloads\WatchNXT ( Sports Streaming Platform )`):
- `Login.png`, `Enter OTP.png`
- `Home Black Bg Closed SB.png` / `Home Black BG Opened SB.png`
- `Home Purple BG Closed SB.png` / `Home Purple BG Opened SB.png`
- `Live Listing.png`

Downscaled/split working copies used for review are in `design-reference/` (see bottom of this doc for regenerating them).

---

## 1. Product Definition

**WatchNXT** — *"Stream the Future of Sports."* A single-vertical (sports-only) streaming platform: live matches, match highlights, shorts, player stories/documentaries, shows, and pass/subscription tiers. No movies/series-general content — every module is sport-flavored (Cricket, Football, F1, Tennis, Kabaddi, Basketball confirmed in the reference screens).

Core jobs-to-be-done, in priority order:
1. Get a user into a **live match** in the fewest clicks (hero banner + Live rail are above the fold on Home).
2. Surface **what's live right now** and **what's coming up** without navigation.
3. Give sports fans a binge layer once the live game ends — highlights, shorts, docs, shows.
4. Convert casual viewers into payers via low-friction, sport-scoped passes (per-match, per-tournament, monthly) — not just one generic subscription.

---

## 2. Design Principles (inherited from JioHotstar, adapted)

1. **Black is the canvas, light is the content.** The chrome (nav, background) stays near-black so thumbnails, jersey colors, and live footage carry all the visual energy. UI never competes with content.
2. **One warm accent, one cool accent.** Orange drives every primary action (Watch Live, Subscribe, Buy Pass). Cyan/teal is reserved for informational/trust signals (secure, multi-language, live links) and quiet highlights. Never mix their roles.
3. **Violet is atmosphere, not UI.** Purple only shows up as gradients/glows behind hero art and card overlays — evokes stadium floodlights at night. It is never a solid button or text color.
4. **Live is red, urgent, and pulses.** Red is exclusively the "LIVE" signal (badge + dot). It must never be reused for errors or generic destructive UI — introduce a separate error color for that so LIVE stays unambiguous.
5. **Everything scrollable is a rail, everything ranked is a poster.** Content discovery is horizontal-scrolling card rails (Netflix/Hotstar pattern), and countdown/trending content favors tall poster art over 16:9 thumbnails.
6. **Motion confirms, it doesn't decorate.** Hover = "this is interactive," a stagger-in = "this just loaded," a pulse = "this is happening right now." Every animation maps to one of those three meanings — see §6.
7. **Glassy depth over flat cards.** Panels (auth card, hero CTA row, pricing cards) use translucent dark surfaces with soft violet-glow borders, not hard 1px strokes — this is the single biggest visual signature to nail from the reference screens.
8. **Collapsible rail navigation.** Sidebar is a persistent icon rail (72px) that expands to a labeled drawer (240px) — never a hamburger-triggered overlay on desktop. Confirmed directly by the "Closed SB" vs "Opened SB" screen pairs.

---

## 3. Color System

Derived by visual reading of the reference screens (hero art, buttons, badges, sidebar, cards). Treat these as the working palette; nudge ±5% against the real Figma inspector/dev-mode values once available, but do not restructure the token *names* — code will bind to the names below.

### 3.1 Base surfaces

| Token | Hex (approx.) | Usage |
|---|---|---|
| `--bg-canvas` | `#07040D` | App background, "Black BG" variant — near-black with a whisper of violet |
| `--bg-canvas-alt` | `#150B24` | App background, "Purple BG" variant (used on Live Listing / secondary routes) |
| `--bg-surface` | `#120B1E` | Cards, rails, filter pills, footer background |
| `--bg-surface-raised` | `#1B1128` | Modals, dropdowns, pricing cards, hovered card state |
| `--bg-sidebar` | `#0C0714` | Sidebar rail background (both closed & opened) |
| `--border-subtle` | `#2A1F3D` | Default card/input borders |
| `--border-glow` | `rgba(168, 85, 247, 0.45)` | Auth card / featured card glowing border (violet, blurred) |

### 3.2 Brand gradient (logo + hero atmosphere)

| Token | Value | Usage |
|---|---|---|
| `--gradient-brand` | `linear-gradient(135deg, #FF3D81 0%, #FF7A1A 35%, #7C3AED 70%, #22D3EE 100%)` | Logo mark only |
| `--gradient-hero-overlay` | `linear-gradient(90deg, rgba(7,4,13,0.95) 0%, rgba(21,11,36,0.55) 45%, rgba(21,11,36,0.1) 100%)` | Left-to-right scrim over hero stadium photography so text stays readable |
| `--glow-violet` | `radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)` | Ambient background glow behind hero/auth panels |

### 3.3 Action colors

| Token | Hex | Usage |
|---|---|---|
| `--accent-primary` | `#FF7A1A` | Primary CTA solid fallback (Watch Live, Send OTP, Subscribe, Buy Pass) |
| `--accent-primary-light` | `#FFA53D` | Gradient top-stop for CTA buttons |
| `--gradient-cta` | `linear-gradient(180deg, #FFA53D 0%, #FF7A1A 100%)` with `box-shadow: 0 0 24px rgba(255,122,26,0.45)` | All primary buttons |
| `--accent-secondary` | `#22D3EE` | Links ("View All"), info icons, OTP focus ring, documentary/category labels |
| `--accent-secondary-muted` | `#0E7490` | Secondary icon backgrounds, subtle teal chips |

### 3.4 Status & badges

| Token | Hex | Usage |
|---|---|---|
| `--live-red` | `#EF3B4D` | LIVE badge + pulsing dot ONLY |
| `--live-red-dim` | `rgba(239,59,77,0.25)` | Live badge glow / pulse ring |
| `--premium-gold` | `#F5B93D` | PREMIUM badge |
| `--free-grey` | `#7D7688` | FREE / neutral badge |
| `--success` | `#22C55E` | Payment success, confirmations (new — not in reference screens, needed for real app) |
| `--error` | `#F04438` | Form errors, failed states (kept distinct from `--live-red` deliberately) |
| `--warning` | `#FBBF24` | Non-critical alerts |

### 3.5 Text

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F8F7FB` | Headings, primary labels |
| `--text-secondary` | `#B8B2C7` | Descriptions, subtext |
| `--text-tertiary` | `#7A7390` | Timestamps, metadata, disabled |
| `--text-on-accent` | `#0B0710` | Text on orange/gold buttons (near-black for contrast, not pure white) |

### 3.6 Sport identity tags (new, needed for multi-sport filtering)

Small color-coded dots/underlines per sport used in filter pills and card corner tags — keep desaturated so they don't fight the orange/teal system:

| Sport | Hex |
|---|---|
| Cricket | `#4ADE80` |
| Football | `#60A5FA` |
| Formula 1 | `#F87171` |
| Tennis | `#FACC15` |
| Kabaddi | `#FB923C` |
| Basketball | `#F97316` |

---

## 4. Typography

Reference screens use a geometric grotesque (Hotstar uses "Denton"/"Inter"-adjacent for UI). Use a free equivalent:

- **Primary UI font:** `Inter` (variable) — body, buttons, nav, cards.
- **Display/headline font:** `Manrope` or `Sora` for hero headlines and section titles (`Continue Watching`, `Live Now`, `INDIA vs AUSTRALIA`) — slightly more geometric/condensed weight to match the bold match-title treatment seen in the hero.
- Load both via `next/font`-style local hosting or `@fontsource` — never a render-blocking Google Fonts `<link>`.

| Style | Font | Weight | Size (desktop) | Tracking |
|---|---|---|---|---|
| Hero title (`INDIA vs AUSTRALIA`) | Sora | 800 | 56px / 1.05 | -0.02em |
| Section heading (`Live Now`, `Shorts`) | Sora | 700 | 28px | -0.01em |
| Card title | Inter | 600 | 16–18px | 0 |
| Body / description | Inter | 400 | 14–15px | 0 |
| Eyebrow / label (`ICC CHAMPIONS TROPHY`, `LIVE NOW`) | Inter | 700 | 12px, uppercase | 0.12em |
| Micro / metadata (viewer count, timestamps) | Inter | 500 | 12px | 0 |

---

## 5. Spacing, Radius, Elevation

- **Grid:** 8px base unit. Page gutters: 64px desktop / 24px tablet / 16px mobile.
- **Sidebar widths:** collapsed `72px`, expanded `240px`, transition `280ms cubic-bezier(0.4,0,0.2,1)`.
- **Radius scale:** `--radius-sm: 8px` (pills, badges), `--radius-md: 14px` (cards), `--radius-lg: 24px` (hero panel, auth card, pricing card).
- **Elevation:** no hard drop-shadows on dark UI — use **glow shadows** instead:
  - Card hover: `box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.25)`
  - CTA button: `box-shadow: 0 0 24px rgba(255,122,26,0.4)`
  - Featured/"Best Value" pricing card: `box-shadow: 0 0 40px rgba(124,58,237,0.35)`

---

## 6. Motion & Animation Spec

Framer Motion is the animation engine (already in the portfolio stack — reuse it here for consistency, and it's what HeroUI itself is built on). **HeroUI components already animate their own open/close/hover states** (Modal, Dropdown, Tabs, Accordion, Tooltip all ship Framer Motion transitions internally) — don't re-wrap those in a second motion layer. The custom motion work below is scoped to the bespoke pieces HeroUI doesn't cover: rails, cards, hero, sidebar, live signals. Every interaction maps to one of the three meanings from Principle 6.

### 6.1 Page / section load
- **Rail stagger-in:** cards within a rail fade + slide up (`y: 16 → 0`, `opacity: 0 → 1`), `staggerChildren: 0.06s`, each card `duration: 0.35s ease-out`. Triggered on scroll-into-view (`whileInView`, `viewport={{ once: true, margin: "-80px" }}`).
- **Hero entrance:** background Ken Burns (slow `scale: 1.05 → 1` over 8s, `ease: linear`, infinite alternate on the live hero image) + text block fades/slides in from left with 100ms stagger between eyebrow → title → description → CTA.
- **Route transition:** 200ms crossfade + 8px vertical slide between pages (`AnimatePresence mode="wait"`).

### 6.2 Hover / interaction (confirms interactivity)
- **Card hover:** `scale: 1.03`, `y: -4px`, glow border fades in, thumbnail slight `brightness(1.1)`, 180ms ease-out. Poster (Trending Now) cards additionally reveal a play icon overlay.
- **Button hover:** brightness +8%, glow shadow intensifies, `scale: 1.02`, 150ms.
- **Button press:** `scale: 0.97`, 100ms — always pair hover-in with a press-down state or the CTA feels dead.
- **Sidebar item hover/active:** background pill fades in (`opacity + scaleX from left`), icon color shifts from `--text-tertiary` to `--text-primary`, active item gets a 3px left accent bar in `--accent-primary`.
- **Sidebar expand/collapse:** width transitions via `layout` animation (Framer's shared layout), labels fade in with a 60ms delay *after* width settles so text doesn't reflow-wrap mid-animation.

### 6.3 Live/real-time signals (happening now)
- **LIVE dot:** infinite pulse — `scale: 1 → 1.6`, `opacity: 1 → 0` on a duplicated ping element behind a solid static dot (same technique as a Tailwind `animate-ping`), 1.5s loop.
- **Score ticker:** when a score digit changes, that digit does a quick vertical flip/slide (`y: -12 → 0` with opacity), 250ms — never re-render the whole card.
- **"Watching now" counter:** number ticks with a rolling-digit animation when it updates via polling, not a hard swap.

### 6.4 Carousels & rails
- Use **Embla Carousel** (lightweight, headless, plays well with Tailwind + Framer) for all horizontal rails (`Continue Watching`, `Live Now`, `Trending`, `Shorts`, `Highlights`).
- Drag-to-scroll + momentum on desktop trackpad/mouse, snap-to-card on arrow-button click, arrows fade in only on row hover.
- Trending Now rail: large background rank numerals (`1 2 3 4…`) sit *behind* the poster art at reduced opacity (~15%), confirmed in the reference screen — implement as an absolutely positioned text layer, not baked into the image.

### 6.5 Loading states
- Skeleton shimmer (diagonal gradient sweep, 1.2s loop) for cards/rails while data fetches — never a spinner for rail content, only for full-page/video-boot loading.
- Video player boot: pulsing stadium-silhouette placeholder, not a blank black box.

---

## 7. Component Inventory (build these as the shared library first)

**Base primitives come from HeroUI (§9) — do not hand-roll Radix/CVA versions of things HeroUI already ships.** HeroUI is themed via `tailwind.config.ts` (`heroui()` plugin) bound directly to the §3 CSS-variable palette, so its defaults already render in the WatchNXT dark/glass look rather than HeroUI's own default theme. Everything below is either "HeroUI component, re-themed" or "bespoke, built on top of a HeroUI primitive" — bespoke ones are the ones actually worth custom engineering time.

**Navigation**
- `SidebarRail` (bespoke, built on HeroUI `Listbox`/`Button` — collapsed/expanded, grouped sections: *Universe* — Home/Live/Upcoming/Popular Leagues; *Discover* — Shorts/Highlights/Shows/Player Stories; *Personal* — Premium/Search/My List; pinned *Settings + Profile* footer)
- `TopBar` (bespoke layout wrapping HeroUI `Input` (search), `Button`, `Badge`, `Avatar`, `Dropdown` (language switch)) — appears on secondary routes like Live Listing
- `MobileTabBar` (bespoke — needed for responsive; Hotstar collapses sidebar to a bottom tab bar under ~768px)

**Buttons & inputs — HeroUI, re-themed (no custom build)**
- `Button` → HeroUI `Button`, custom `variant="gradient"` extension (orange CTA gradient), plus HeroUI's own `solid`/`bordered`/`light` for secondary/ghost
- `IconButton` → HeroUI `Button isIconOnly` (heart/save, bell/remind, share — circular glass background via theme)
- `SegmentedToggle` → HeroUI `Tabs` (`variant="solid"`) for the Mobile/Email toggle on Login
- `TextField` → HeroUI `Input` (left icon slot via `startContent`)
- `FilterPill` → HeroUI `Chip` in selectable/toggle mode (sport category chips: All/Cricket/Football/F1/…, active = solid orange, inactive = outline)
- `SortDropdown` → HeroUI `Select`/`Dropdown` (Live Listing "Sort By")
- `Toast` → HeroUI `addToast` (subscribe confirmations, reminder set)
- `Modal` / `Sheet` → HeroUI `Modal` / `Drawer` (video preview on hover-hold, share sheet)
- `Tooltip` → HeroUI `Tooltip`
- `Skeleton` → HeroUI `Skeleton` (rail skeleton, card skeleton — wrap in the shimmer treatment from §6.5)
- `Avatar` → HeroUI `Avatar` (profile menu)

**Bespoke inputs (no HeroUI equivalent)**
- `OtpInput` (6-digit boxed input, auto-advance, focus glow ring in `--accent-secondary`) — build on bare HeroUI `Input` cells, HeroUI has no OTP primitive

**Cards** (this is the bulk of the system — build one `CardBase` wrapping HeroUI `Card`, then variant wrappers)
- `HeroBannerCard` — full-bleed live match hero w/ badges, title, tags (4K/Multilingual/Dolby), CTA
- `ContinueWatchingCard` — 16:9 thumbnail + progress bar footer
- `LiveMatchCard` — thumbnail + LIVE badge + live score line (varies per sport: run-rate for cricket, score-clock for football, lap counter for F1, set-score for tennis) + viewer count + Watch Live button
- `UpcomingMatchCard` — poster art + countdown chip (`Starts in 2d 14h`) + team badges + Remind Me / bell icons
- `LeagueCard` — league logo, name, live/match-count status
- `TrendingPosterCard` — tall poster + oversized background rank numeral
- `ShortsCard` — vertical 9:16 thumbnail, duration chip, category chip (Highlight/Trending/Training/Exclusive/Behind-the-Scenes/Viral), like/share/view counts
- `HighlightCard` — 16:9 thumbnail, duration, result line in accent color, sport filter pill row above the rail
- `ShowCard` — poster, PREMIUM/HD tags, season/episode meta
- `PlayerStoryCard` — portrait card, category label (Documentary/Biography/Interview/Locker Room), FREE/PREMIUM tag, duration
- `PricingCard` — 3-tier layout (Match Pass / Tournament Pass "Best Value" / Monthly Premium), feature checklist, elevated glow on the featured tier

**Feedback & overlays**
- `Badge` → HeroUI `Chip`/`Badge`, re-themed (`LIVE` pulsing, `PREMIUM`, `FREE`, `HD`, `4K`, `MULTI-LANG`)

**Layout**
- `Rail` (horizontal scroll section: heading + description + "View All" + Embla carousel)
- `Footer` (brand block, link columns, newsletter input, app-store badges, social icons)
- `SectionHeading` (title + subtitle + View All, reused by every rail)

---

## 8. Screens / Routes

From the provided Figma set + the screens implied by the flows (must exist for the product to function end-to-end):

**Confirmed by Figma**
1. `/login` — Mobile/Email tabs, social auth
2. `/otp` — 6-digit verify
3. `/` (Home) — Hero, Continue Watching, Live Now, Upcoming Matches, Popular Leagues, Trending Now, Shorts, Match Highlights, Shows, Player Stories, Pricing/Premium section, Footer
4. `/live` (Live Listing) — full hero of the top live match, sport filter pills + sort, grid of all live cards, Today's Live Schedule strip

**Inferred — needed to make routes/components in §7 land somewhere**
5. `/match/:id` — match detail / video player page (player, live stats tab, related highlights rail)
6. `/upcoming` — full upcoming matches grid (mirrors the Home rail, filterable by sport/league)
7. `/leagues` and `/leagues/:id` — Popular Leagues grid → league hub page
8. `/shorts` — vertical short-form feed (swipeable, TikTok-style)
9. `/highlights` — full Match Highlights grid with sport tabs
10. `/shows` and `/shows/:id` — Shows grid → show detail (season/episode list)
11. `/player-stories` and `/player-stories/:id` — Player Stories grid → story detail/player
12. `/premium` — full pricing page (the Home section, expanded, plus FAQ)
13. `/search` — search results (matches/teams/sports)
14. `/profile`, `/settings`, `/my-list` — account routes off the sidebar
15. `/404` — not found

---

## 9. Technology Stack

Chosen to match the existing portfolio repo's conventions (same monorepo habits: Vite + React 18 + Tailwind + Radix + Framer Motion) so tooling stays familiar, plus additions specific to a streaming product:

| Concern | Choice | Why |
|---|---|---|
| Framework | **React 18** + **Vite** | Matches `portfolionew`; fast dev server, no SSR needed for a v1 client-rendered app |
| Language | **TypeScript** | This project is bigger/longer-lived than a portfolio; typed props pay off fast across ~15 card variants, Redux slices, and socket event payloads |
| Styling | **Tailwind CSS 3** + CSS variables for the palette in §3 | Matches existing repo; CSS vars let dark/alt-bg theme swap (Black vs Purple background, both confirmed in Figma) without duplicating Tailwind config |
| Component library | **HeroUI** (`@heroui/react`) | Full component set (Button, Card, Modal, Drawer, Tabs, Dropdown, Select, Chip, Avatar, Skeleton, Tooltip, Toast, Listbox) built natively on **Tailwind CSS + Framer Motion** — no second styling system to reconcile, and its dark/glass defaults are already close to the JioHotstar look. Themed via the `heroui()` Tailwind plugin bound to the §3 tokens. `class-variance-authority` + `tailwind-merge` are kept, but only for the *bespoke* card/rail variants HeroUI doesn't provide |
| Icons | **lucide-react** | Already used in the portfolio; covers bell/heart/search/settings etc. Sport-specific glyphs (cricket bat, F1 helmet) sourced separately as SVG since lucide doesn't cover them |
| Animation | **Framer Motion** | Powers HeroUI internally and drives every bespoke animation in §6 — one motion engine for the whole app instead of two |
| Carousels | **Embla Carousel React** | Headless, unstyled, small bundle, plays natively with Tailwind + Framer for the rail pattern used across the whole Home page — HeroUI has no carousel primitive |
| Routing | **React Router v6** | Matches existing repo |
| State & data — unified | **Redux Toolkit + RTK Query** | One store for everything: RTK Query slices (`matchesApi`, `contentApi`, `authApi`) own server data — caching, polling via `pollingInterval`, tag-based invalidation — while plain RTK slices (`ui`, `auth`, `myList`) own client state (sidebar collapsed/expanded, active filter pills, session, saved items). Replaces both TanStack Query *and* Zustand with one architecture, and its normalized cache + DevTools time-travel is the "advanced" upgrade over a lighter fetch library |
| Real-time score/viewer updates | **Socket.IO client**, wired into RTK Query via the `onCacheEntryAdded` streaming-update pattern (RTK Query's official websocket recipe) | Live scores and "watching now" counts are *pushed* into the existing RTK Query cache entry instead of polled — matches how a real live-sports product behaves, and avoids running two competing data pipelines |
| Forms | **react-hook-form** + **zod** | Login/OTP/search forms need validation; zod schemas double as the TypeScript source of truth, and RTK Query endpoints reuse the same schemas for response typing |
| i18n | **react-i18next** + `i18next-browser-languagedetector` | The screens themselves show a `MULTI-LANG` tag and a language switcher in the TopBar — start with `en` + `hi` locale bundles under `src/i18n/locales/`, namespace per feature (`home`, `auth`, `live`, `premium`) so translators/other contributors can touch one file at a time |
| Video playback | **hls.js** wrapped in a custom `<VideoPlayer>` (defer until player-page milestone) | Needed once `/match/:id` actually plays a live stream; mock with a static video/poster until then |
| Testing — unit/component | **Vitest** + **React Testing Library** | Vite-native, zero extra config |
| Testing — E2E | **Playwright** | Automates the critical paths end-to-end: login → OTP → Home, Watch Live click-through, filter-pill sport switching, Subscribe/Buy Pass flow. Runs against the real HeroUI-rendered DOM, not mocks |
| Linting/formatting | **ESLint** (existing config) + **Prettier** | Consistency with `portfolionew` |

---

## 10. Suggested Folder Structure

```
WatchNXT/
├── design-reference/          # exported/split Figma screens for visual diffing during build
├── docs/                      # this file + any future ADRs
├── e2e/                        # Playwright specs (auth.spec.ts, live-watch.spec.ts, premium.spec.ts...)
├── public/
├── src/
│   ├── app/                   # routes (React Router route elements), layouts
│   ├── components/
│   │   ├── ui/                 # OtpInput + any HeroUI wrapper/overrides (gradient Button variant, themed Chip)
│   │   ├── cards/               # CardBase (wraps HeroUI Card) + all bespoke card variants from §7
│   │   ├── nav/                 # SidebarRail, TopBar, MobileTabBar
│   │   └── rails/                # Rail, SectionHeading, Embla wrapper
│   ├── features/
│   │   ├── auth/                # login, otp screens
│   │   ├── home/
│   │   ├── live/
│   │   ├── shorts/
│   │   ├── highlights/
│   │   ├── shows/
│   │   ├── player-stories/
│   │   └── premium/
│   ├── store/                   # Redux Toolkit — replaces both zustand stores and TanStack Query
│   │   ├── index.ts              # configureStore, root reducer, RTK Query middleware
│   │   ├── slices/                # ui.slice.ts, auth.slice.ts, myList.slice.ts (client state)
│   │   └── api/                   # matchesApi.ts, contentApi.ts, authApi.ts (RTK Query) + socketMiddleware.ts
│   ├── i18n/                    # i18next config + locales/{en,hi}/{home,auth,live,premium}.json
│   ├── lib/                     # api client, socket client, utils (cn/tailwind-merge helper)
│   ├── styles/                  # tailwind.css, tokens.css (the §3 variables), heroui theme config
│   ├── mocks/                   # sport-only mock content (matches, leagues, shorts, shows...) + mock socket server
│   └── types/                   # zod schemas + inferred types
├── tailwind.config.ts           # wraps heroui() plugin around the §3 token set
└── vite.config.ts
```

---

## 11. Content Model (mocked until a real backend exists)

All content is sports-only — no film/series categories anywhere, per the requirement. Core entities to mock in `src/mocks/`:

- **Sport** — id, name, color tag (§3.6), icon
- **League/Tournament** — id, sport, name, logo, status (`live` | `upcoming` | `scheduled`)
- **Match** — id, league, teams[2] (name, logo, score-shape varies by sport), status, viewerCount, startsAt, venue, tags (`4K`, `Multilingual`, `Dolby Atmos`), isPremium
- **Short** — id, sport, title, duration, category (`Highlight`/`Trending`/`Training`/`Exclusive`/`Behind-the-Scenes`/`Viral`), likes, views
- **Highlight** — id, sport, matchRef, title, resultLine, duration, postedAt
- **Show** — id, title, seasonCount/episodeCount, tags, description
- **PlayerStory** — id, athlete, sport, category (`Documentary`/`Biography`/`Interview`/`Locker Room`), duration, accessTier (`FREE`/`PREMIUM`)
- **PricingPlan** — id, name, price, period, features[], highlight (bool, for "Best Value")

Keep every mock entity's shape 1:1 with what a real sports-data API (e.g. a future SportRadar/custom backend) would return, so swapping mocks for live fetches later is a data-layer change only, not a component rewrite.

---

## 12. Responsive Behavior

- **Desktop (≥1280px):** sidebar rail visible (collapsed by default per the "Closed SB" reference), rails show 4–5 cards.
- **Tablet (768–1279px):** sidebar auto-collapses to icon-only, rails show 2–3 cards, hero copy shrinks.
- **Mobile (<768px):** sidebar becomes a bottom `MobileTabBar` (Home/Live/Search/My List/Profile), hero becomes a stacked (image-top, content-below) card, rails scroll with visible peek of the next card to hint scrollability.

---

## 13. Real-Time, i18n & Testing Architecture

### 13.1 Real-time data flow (Redux Toolkit + RTK Query + Socket.IO)

```
Socket.IO server (mocked initially in src/mocks/socketServer.ts)
        │  emits: "match:score" { matchId, score }
        │         "match:viewers" { matchId, count }
        ▼
socketMiddleware (src/store/api/socketMiddleware.ts)
        │  on connect: subscribes to rooms for currently-visible matches
        ▼
RTK Query cache patch — matchesApi.util.updateQueryData(...)
        │  (the official RTK Query "streaming updates" pattern via onCacheEntryAdded)
        ▼
Any component reading useGetLiveMatchesQuery() / useGetMatchQuery(id)
   re-renders with the pushed value — no polling, no manual subscription per component
```

- Initial page load still does one RTK Query `GET` (REST) to hydrate the cache; the socket only pushes *deltas* after that — never the sole data source, so a refresh always works even if the socket hasn't connected yet.
- Score-digit and viewer-count flip animations (§6.3) key off the RTK Query cache value changing, not off the socket event directly — keeps the animation layer decoupled from the transport.
- Room subscription is scoped to matches currently rendered on screen (Home's Live Now rail, the Live Listing grid, the open match player) — unsubscribe on unmount so an idle tab doesn't hold open rooms for matches nobody's looking at.

### 13.2 i18n structure

- `src/i18n/locales/en/*.json` and `src/i18n/locales/hi/*.json`, namespaced to match `features/` (`home.json`, `auth.json`, `live.json`, `premium.json`, `common.json` for shared strings like button labels/badges).
- Language switch in `TopBar` persists choice to `localStorage` and to the `ui` slice; detected on first load via `i18next-browser-languagedetector`.
- Team/league names and score data are **not** translated (they're data, not UI copy) — only chrome, labels, and marketing copy route through i18n keys.
- Numbers/dates (viewer counts, "Starts in 2d 14h", match dates) formatted with `Intl.NumberFormat`/`Intl.RelativeTimeFormat` per active locale rather than hardcoded English pluralization.

### 13.3 Testing strategy

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | Redux slices/reducers, RTK Query endpoint transforms, zod schemas, pure utils (countdown formatting, score-diff detection) |
| Component | Vitest + React Testing Library | Bespoke components from §7 (cards, rails, OtpInput) rendered with the HeroUI provider + Redux `Provider` wrapper |
| E2E | Playwright | Critical user journeys, run against a dev build with `src/mocks` standing in for the backend: **(1)** Login → OTP → Home lands with hero visible, **(2)** clicking "Watch Live" on a Live Now card navigates to `/match/:id`, **(3)** switching a `FilterPill` (e.g. All → Cricket) filters the visible cards, **(4)** Buy Match Pass / Buy Tournament Pass / Go Premium each open the expected confirmation state |

---

## 14. Build Order (recommended)

1. **Foundations:** Tailwind config with the `heroui()` plugin bound to the CSS-variable tokens (§3), `HeroUIProvider` + Redux `Provider` app shell, fonts (§4), `cn()` util.
2. **Store setup:** `configureStore` with the `ui`/`auth`/`myList` slices and empty `matchesApi`/`contentApi`/`authApi` RTK Query slices (no sockets yet) — get the data architecture in place before wiring real screens to it.
3. **Auth flow:** Login → OTP using themed HeroUI `Input`/`Tabs`/`Button` + bespoke `OtpInput` (small surface area, validates the whole design language — gradient card, glow border, CTA — before tackling the big Home page). Wire to `authApi` + `auth` slice.
4. **Shared nav:** `SidebarRail` (collapsed/expanded + the width/label motion from §6.2) and `TopBar`, sidebar-collapsed state living in the `ui` slice.
5. **Rail system:** `Rail` + `SectionHeading` + Embla wiring, backed by `mocks/` via RTK Query endpoints (so swapping mocks for a real API later is a one-line `baseQuery` change).
6. **Card variants**, one rail at a time, in the order they appear on Home: Continue Watching → Live Now → Upcoming → Popular Leagues → Trending → Shorts → Highlights → Shows → Player Stories → Pricing.
7. **Live Listing page** (reuses `LiveMatchCard` + `Rail` patterns, adds the big hero + sort/filter toolbar).
8. **Real-time layer:** mock Socket.IO server (§13.1) + `socketMiddleware`, patch scores/viewer-counts into the RTK Query cache, layer in the score-flip and live-pulse animations from §6.3.
9. **Motion pass:** layer in the remaining §6 animations once static layout is correct — never animate before the layout is right, or you'll rebuild the animation twice.
10. **i18n pass:** extract hardcoded copy into `en`/`hi` locale files (§13.2) once strings stop churning.
11. **Responsive pass** (§12).
12. **E2E coverage:** Playwright specs for the journeys in §13.3, alongside the remaining inferred routes (§8, items 5–15) as time allows, reusing the by-then-mature card/rail library.

---

## 15. Regenerating the design-reference images

The raw Figma PNG exports in the Downloads folder are huge (up to 5760×29200, 60MB+) — too large to view directly. They were downscaled to 1440px width and split into ≤2200px-tall chunks for review. To redo this (e.g. if new screens are added):

```bash
python -c "
from PIL import Image
import os
src = r'C:\Users\stann\Downloads\WatchNXT ( Sports Streaming Platform )'
out = r'C:\Projects\MyCodesBackup\WatchNXT\design-reference'
for f in os.listdir(src):
    if not f.lower().endswith('.png'): continue
    im = Image.open(os.path.join(src, f))
    w, h = im.size
    scale = 1440 / w
    im2 = im.resize((1440, int(h*scale)), Image.LANCZOS)
    im2.save(os.path.join(out, f))
"
```

---

## Open questions to confirm before/while building

- Exact hex values: pull directly from Figma's Inspect panel (right-click → Copy as → CSS) once available — the palette in §3 is a close visual read, not a pixel-sampled extraction.
- Real backend/data source for live scores: §13.1 assumes a Socket.IO-compatible server; if the eventual backend only offers REST, the `socketMiddleware` swaps for an RTK Query `pollingInterval` with no change to components (affects §11's mock-to-real swap).
- Whether login truly needs both Mobile+OTP and Email flows for v1, or OTP-only is enough to start.
- Video CDN/DRM requirements for the eventual `/match/:id` player (affects hls.js vs a hosted player SDK).