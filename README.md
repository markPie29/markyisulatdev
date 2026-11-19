# Marky Isulat — Personal Portfolio 2K26

Personal portfolio website for **Mark Angelo A. Isulat ("Marky")** — **Product-Oriented Full-Stack Developer** (*"I don't just build systems; I build systems that help actual users."*).

## Architecture & Visual System

* **Archetype:** Swiss / International Editorial — strict 12-column grid, `0px` border radius, hairline borders, numbered indices, and dark-first monochrome theming (`next-themes` with light mode toggle).
* **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + `motion/react` + Radix UI (`Tabs`, `Dialog`) + React Hook Form & Zod.
* **Typography & Font Metrics:** Local `HelveticaNeue` (`.otf`/`.ttf`) via `next/font/local` with `@font-face` metric overrides (`ascent-override: 90%`, `descent-override: 25%`, `line-gap-override: 0%`) paired with `JetBrains Mono` (`next/font/google`). Fluid display scale in `src/app/globals.css` and masked heading wrappers (`MaskHeading.tsx`, `LoadingScreen.tsx`) provide descender clearance so glyphs (`y`, `g`, `p`, `q`, `j`) are never clipped.
* **Persistent Navigation:** Fixed `260px` desktop sidebar (`SidebarShell.tsx` + `LineSidebar.tsx`) with `Full-Stack Developer` subtitle, cursor-proximity numbered routes (`01`–`07`), icon-only borderless social links (`NavUtilities.tsx`), consultation CTA, resume modal trigger, theme switcher, and Manila (`PHT`) clock; collapses to `MobileTopBar.tsx` under `1024px`.

## Routes

* `/` — `01 Overview`: Vertically centered Hero split (`Product-Oriented Full-Stack Developer.`) + portrait/KPIs, 5-project `FeaturedProjectsCarousel.tsx` with radial gray card sheen, Experience ledger (company name first, monochrome brand logo on right), Stack summary, `3×2` hover-invert `HomeServicesGrid.tsx` (`Services & Consultations`), Testimonials, and Closing CTA.
* `/projects` & `/projects/[slug]` — `02 Projects`: Tabbed showcase across Real Users, Passion & Explorations, and Multimedia & Brand Design using scannable `6/6` horizontal cards (title, role subtitle, concise `shortDescription`, icon-only `<TechIcon />` logos with `+N` overflow, top-left `Trophy` award overlay, and uniform `View Case Study →` button), plus sticky `4/8` case studies (`Problem & Context`, `The Human & UX Touch`, galleries, and live links).
* `/experience` — `03 Experience`: 5-role career ledger framed through The Engineer's Lens with theme-adaptive monochrome logos (`BrandLogo.tsx`), plus Education, Honors & Verified Certifications.
* `/stack` — `04 Stack`: `01 — THE PRODUCT-ORIENTED EDGE` pillars and 5-category proof-backed technical tool matrix.
* `/services` — `05 Services`: Core services, 3-tier consultation selector (`#business`, `#speaking`, `#thesis-capstone` hash anchors), and Zod-validated booking inquiry form.
* `/testimonials` — `06 Testimonials`: Verified client perspectives paired with case-study previews.
* `/personal` — `07 Personal`: `Personal Life` standalone page featuring a 10-frame full-color infinite filmstrip photo reel (`PersonalArchiveSection.tsx`) with lightbox inspection, Services-style radial-gradient origin card, 10 title-only off-duty interests (`01 // OFF-DUTY INTERESTS`), and 4 hover-invert creator channel cards (`02 // CHANNELS`).

## Source-of-Truth Documentation

* [`personal-portfolio-bundle/DESIGN_DIRECTION_PLAN.md`](./personal-portfolio-bundle/DESIGN_DIRECTION_PLAN.md) — Complete UI, layout, typography, and architecture blueprint.
* [`personal-portfolio-bundle/MASTER_PLAN.md`](./personal-portfolio-bundle/MASTER_PLAN.md) — Brand positioning and portfolio separation strategy.
* [`personal-portfolio-bundle/SOFTWARE_PORTFOLIO_DATA.md`](./personal-portfolio-bundle/SOFTWARE_PORTFOLIO_DATA.md) — Canonical profile, experience, projects, and credentials dossier.

## Environment Variables (Resend Booking Integration)

Booking inquiries on `/services` (`src/app/actions/booking.ts` + `src/lib/email/resend.ts`) use the `resend` SDK and fall back gracefully to a structured receipt + `mailto:` link when no API key is configured.

1. Copy `.env.example` to `.env.local` (or fill in the generated `.env.local`).
2. Add `RESEND_API_KEY` from [Resend API Keys](https://resend.com/api-keys).
3. Set `RESEND_FROM_EMAIL`:
   * **Local sandbox:** `"Marky Isulat Portfolio <onboarding@resend.dev>"` (delivers only to your Resend account email; visitor auto-confirmations stay disabled automatically).
   * **Production:** `"Marky Isulat <bookings@markyisulat.dev>"` after verifying `markyisulat.dev` DNS records in Resend (visitor confirmation receipts enable automatically).

## Development Commands

```bash
npm run dev     # Start local Next.js dev server
npm run build   # Production build & static route generation
npm run start   # Serve production build
npm run lint    # Run ESLint
```
