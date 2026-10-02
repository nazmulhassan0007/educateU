# educateU Business — homepage

Next.js 16 (App Router) + Tailwind CSS v4 build of the educateU Business site. The homepage at `/` uses the daylight "letters" hero (Figma node 42:2120) and the FAQ reader; the original Figma homepage ("Homepage · Variant B · Desktop 1440") is kept at `/v1`. Inner pages: `/courses`, `/about`, `/contact-us`, `/support-hub`.

Motion stack: **Motion** (framer-motion successor) for component state and entrances, **GSAP** (ScrollTrigger + SplitText)
for scroll-driven and text choreography, **Lenis** for smooth scrolling. The logo preloader hands off into the hero
sequence; every effect respects `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Test (Playwright)

```bash
npx playwright install chromium
npx playwright test
```

To test against a dev server that is already running on another port:

```bash
PW_BASE_URL=http://localhost:PORT npx playwright test
```

The suite covers both a 1440px desktop and a Chromium phone profile: every section renders,
all images load, add-to-cart updates the header badge, the FAQ accordion toggles, the team
calculator recomputes, there is no horizontal overflow, and a full-page screenshot is saved to
`test-results/`.

## Structure

- `src/app/` — layout (self-hosted Stack Sans Notch / Stack Sans Text / Geist Mono), tokens in `globals.css`, page composition.
- `src/components/` — one component per design section, `Preloader`, `SmoothScroll`, plus `motion/` primitives (`Reveal`, `Lines`, `SplitHeading`, `Magnetic`, `ScaledStage`).
- `src/lib/gsap.ts` — single place GSAP plugins are registered.
- `src/lib/data.ts` — all copy and course data from the design. `src/lib/motion.ts` — easing and variant tokens.
- `public/images`, `public/icons` — assets exported from Figma.
