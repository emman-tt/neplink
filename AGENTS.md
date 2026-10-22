<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Modularity conventions (learned from rosait)

The structure of this project deliberately follows the philosophy practised in
`~/Documents/rosait` (see that project for reference — `app/home/` is the
canonical example). The core idea: **a page owns its sections, and a section
owns everything it needs**

## Where things live

- **No `src/`.** The `app/` directory sits at the project root.
- Sections are **siblings of their route's `page.tsx`** (`app/home/Hero.tsx`,
  `app/home/Selling.tsx`, …). In a one-page project they sit directly in
  `app/`; when a second page is added, its sections nest under its own folder
  and imports stay relative (`./Hero`).
- **No global/shared component tree.** Pieces used by exactly one section are
  declared *inside that section's file* (see `FlowerMark` in rosait's
  `Hero.tsx`). Only when a piece has real behavior of its own and is shared
  within the folder does it earn its own file (`MenuOverlay.tsx` — owns state,
  imported by `Hero` and `TopBar` alike).
- Shared data becomes a **colocated data module** in the same folder with a
  lower-case hyphenated name and a header comment declaring it the single
  source of truth: `product-data.ts`. Types live in the data module.

## Files and exports

- **PascalCase file name = the component name it contains**:
  `Hero.tsx` → `export default function Hero()`.
- Default export for a section/page. Named exports are reserved for pieces
  consumed by siblings in the same folder (`TopBar`, `Burger`, `MenuOverlay`).
- Imports are **relative, never via a `@/` alias**.
- A section keeps its markup, local state, refs, and animation in **one
  file** even when that file gets long (rosait's `Hero.tsx` ≈ 280 lines).

## Client / server split

- Don't over-engineer composition: sections that animate or hold state carry
  `"use client"`; purely static pieces (`Footer`) stay server components.
- Inside a client section, small presentational sub-pieces (an SVG mark, a
  latch, a canvas) are plain local function components in the same file.

## GSAP discipline

- `gsap.registerPlugin(ScrollTrigger)` once at module top of any animated file.
- **One animation `useEffect` per section**, one `gsap.context(fn, rootRef)`,
  cleanup by `ctx.revert()`.
- **Refs for single elements; scoped class selectors for repeating groups**
  (`.hero-footer-item`, `.sell-row`, `.check-step`) inside the context —
  never a shared/generic `<Reveal>`-style wrapper component.
- Timelines are **bespoke per section** — no library of motion utilities.
  Intro timelines use `gsap.set(...)` for initial states followed by a
  `tl.to(..., absoluteTime)` sequence, documented with a numbered comment
  block (absolute seconds from 0) so timing can be retuned by hand.
  Scroll-triggered timelines attach `scrollTrigger` to the timeline and use
  `.from()` steps.
- `prefers-reduced-motion` bails out of the whole effect.
- Idle loops (scroll cues, marquees, pulses) are separate from intro timelines.

## Styling tokens

- `globals.css` follows rosait's shape: plain `:root` variables for the
  palette, an `@theme inline` block mapping them to `--color-*` (plus the
  next/font variables onto `--font-*`), and a plain `body` block with
  `overflow-x: clip`.
- Everything else is Tailwind utilities inline in the sections; mobile
  variants via responsive prefixes on the same element (no separate mobile
  components).

## What this project deliberately avoids

- `src/`, `components/`, `lib/`, global barrel files.
- Generic animation wrappers (`<Reveal>`, `<Parallax>`, `<Pulse>`): they
  flatten bespoke timelines into props and scatter motion intent across the
  tree. Each section tells you how it moves when you open its file.
