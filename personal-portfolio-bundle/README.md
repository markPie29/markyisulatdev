# Personal Portfolio 2K26 — Complete Export Bundle

> **Purpose:** 100% self-contained export package for **Mark Angelo A. Isulat's ("Marky") Personal Portfolio**, ready to drop straight into a fresh **Next.js 15/16 (App Router) + TypeScript** repository.

---

## Folder Structure

```text
personal-portfolio-bundle/
├── README.md                                    # Master index & quick-start guide
├── DESIGN_DIRECTION_PLAN.md                     # Complete Design Direction, Per-Page Wireframes & Next.js Tech Stack Blueprint (v6)
├── MASTER_PLAN.md                               # Strategic brand positioning & separation blueprint
├── SOFTWARE_PORTFOLIO_DATA.md                   # Complete all-in-one software dossier (single source of truth)
├── docs/                                        # Modular content & component specs
│   ├── 01-profile-and-narrative.md              # Bio, Product-Oriented Full-Stack Developer positioning, thesis & contact links
│   ├── 02-work-experience.md                    # 5-role timeline (Marked Media Founder, Off Grid, Nexvision, Marketing Hive, AP Global)
│   ├── 03-projects-real-users.md                # Category 1: Real Projects with Actual Users (SK Logistics, Doze, Kado Kohi, Off Grid)
│   ├── 04-projects-passion-explorations.md      # Category 2: Passion Projects & Explorations (Snapsort, URSAC Hub, AR-DUINO-M, Glow Bar, Top Notch)
│   ├── 05-skills-education-credentials.md       # Tech stack taxonomy, education, honors & verified certifications
│   ├── 06-asset-manifest.md                     # Source-to-bundle file mapping log
│   ├── 07-line-sidebar-component.md             # Full TypeScript + Tailwind source for the <LineSidebar /> component
│   └── 08-multimedia-and-master-context.md      # Complete Multimedia/Brand Design projects registry & master context
├── resumes/
│   ├── Mark_Isulat_Developer_Resume.md          # Markdown resume synced with verified scope
│   └── Mark_Isulat_Developer_Resume.pdf         # PDF resume
└── assets/                                      # All fonts, personal photos, logos & project media ready for public/
    ├── fonts/                                   # HelveticaNeue (.otf/.ttf family — Light, Roman, Medium, Bold, etc.)
    ├── personal/                                # hero-portrait-raw.png, about-me-hero.jpg, avatar.png, main-icon.svg, gallery/ (10 active frames on /personal)
    ├── brand-logos/                             # Company & client brand logos (Marked Media, Kado Kohi, Marketing Hive, etc.)
    └── projects/
        ├── real-projects/                       # sk-logistics/, doze-beauty-lounge/, kado-kohi/, off-grid-lifestyle-ph/
        ├── passion-projects/                    # snapsort/ (with demo.mp4), ursac-hub-marketplace/, ursac-hub-social/, ar-duino-m/, the-glow-bar/, top-notch-constructions/
        └── multimedia-design/                   # All graphic design, branding, apparel & pubmat folders (access, bola, coeng, fph, lvme, purehubs, etc.)
```

---

## Quick-Start for Your New Next.js Repo

1. **Create your new Next.js repo** and copy this entire `personal-portfolio-bundle/` folder into it (or copy `assets/` directly into `public/assets/` and `resumes/` into `public/resumes/`).
2. **Point your AI assistant to [`DESIGN_DIRECTION_PLAN.md`](./DESIGN_DIRECTION_PLAN.md)** — it contains the finalized color tokens, typography scale, 7-page + case-study ASCII wireframes, real client testimonials, and exact Next.js App Router directory structure.
3. **Use [`SOFTWARE_PORTFOLIO_DATA.md`](./SOFTWARE_PORTFOLIO_DATA.md) and [`docs/`](./docs/)** to populate the static TypeScript data files in `src/data/`.
