# Asset Manifest & Deduplication Log

All **73 binary assets** from the source portfolio have been organized into `assets/` and `resumes/`, deduplicated via SHA-256 verification, and renamed into clean project-scoped filenames.

---

## Deduplication Summary

Three byte-identical duplicate cover uploads present in `public/projects/` were consolidated into single `cover.png` files:
1. **SK Logistics:** `project-1786009090477-e2kafo-Screenshot_2026-08-06_173004.png` == `project-1786009779228-3sf41-Screenshot_2026-08-06_173004.png` → `sk-logistics/cover.png`
2. **Kado Kohi:** `project-1786009451429-gig28m-Screenshot_2026-08-06_173932.png` == `project-1786009448093-1r1wr-Screenshot_2026-08-06_173932.png` → `kado-kohi/cover.png`
3. **URSAC Hub Marketplace:** `project-1785000788371-mhp1mv-Screenshot_2026-07-26_012730.png` == `project-1785000785475-zrj59m-Screenshot_2026-07-26_012730.png` → `ursac-hub-marketplace/cover.png`

*(Also corrected a historical filename reference typo: `Screenshot_2026-07-26_012806.png` rather than `08-06`.)*

---

## Personal & Brand Assets

| Clean Bundle Path | Original Source Path | Purpose |
| :--- | :--- | :--- |
| `assets/personal/avatar.png` | `public/avatar.png` | Profile avatar |
| `assets/personal/about-me-hero.jpg` | `public/about-me-hero.jpg` | Workspace setup archive photo |
| `assets/personal/about-me-transition.mp4` | `public/about-me-transition.mp4` | Interactive portrait video |
| `assets/personal/main-icon.svg` | `public/main-icon.svg` | SVG site mark / favicon |
| `assets/personal/gallery/01.jpg` – `13.jpg` | `public/personals/` + uploaded DJ photos (`12.jpg`, `13.jpg`) | 10 active frames rendered on `/personal` (`01.jpg`–`05.jpg`, `07.jpg`–`10.jpg`, `13.jpg`; `06.jpg`, `11.jpg`, `12.jpg` omitted from live UI) |
| `assets/brand-logos/kado-kohi.png` | `public/brand-logos/Kado Kohi.png` | Client logo |
| `assets/brand-logos/marked-media.png` | `public/brand-logos/Marked Media.png` | Agency / freelance logo |
| `assets/brand-logos/marketing-hive.png` | `public/brand-logos/Marketing Hive.png` | Employer logo |

*(Graphic-design-only client logos such as Hope for Angels, Purehub Nutrition, ACCESS, Bola PH, etc. remain in `react-portfolio-2k26` for the Marked Media agency site.)*

---

## Category 1: Real Projects with Actual Users (16 Files + 1 Placeholder)

### SK Logistics (`assets/projects/real-projects/sk-logistics/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `project-1786009090477-e2kafo-Screenshot_2026-08-06_173004.png` |
| `01.png` | `project-1786009778419-z24heu-Screenshot_2026-08-06_172954.png` |
| `02.png` | `project-1786009779597-wfqj7o-Screenshot_2026-08-06_173042.png` |
| `03.png` | `project-1786009779881-zk808q-Screenshot_2026-08-06_173105.png` |
| `04.png` | `project-1786009780575-l0wopd-Screenshot_2026-08-06_173349.png` |
| `05.png` | `project-1786009780881-onovnb-Screenshot_2026-08-06_173415.png` |

### Doze Beauty Lounge (`assets/projects/real-projects/doze-beauty-lounge/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `fullpage_snapshot_doze-beauty-lounge_vercel_app_2026-08-16-09-06-53.png` |
| `01.png` | `fullpage_snapshot_doze-beauty-lounge_vercel_app_2026-08-16-09-07-36.png` |
| `02.png` | `fullpage_snapshot_doze-beauty-lounge_vercel_app_2026-08-16-09-07-58.png` |
| `03.png` | `fullpage_snapshot_doze-beauty-lounge_vercel_app_2026-08-16-09-08-16.png` |
| `04.png` | `fullpage_snapshot_doze-beauty-lounge_vercel_app_2026-08-16-09-08-32.png` |

### Kado Kohi (`assets/projects/real-projects/kado-kohi/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `project-1786009451429-gig28m-Screenshot_2026-08-06_173932.png` |
| `01.png` | `project-1786009449739-wwe0y-Screenshot_2026-08-06_173944.png` |
| `02.png` | `project-1786009450083-dqt10a-Screenshot_2026-08-06_173957.png` |
| `03.png` | `project-1786009450554-j5gl3g-Screenshot_2026-08-06_174006.png` |
| `04.png` | `project-1786009451049-wuz3g-Screenshot_2026-08-06_174018.png` |

### Off Grid Lifestyle PH (`assets/projects/real-projects/off-grid-lifestyle-ph/`)
* Pending capture — no existing screenshots in `react-portfolio-2k26`. See `README.md` inside that folder.

---

## Category 2: Passion Projects & Technical Explorations (38 Files)

### Snapsort (`assets/projects/passion-projects/snapsort/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `snapsort-cover.png` |
| `demo.mp4` | `snapsort-demo.mp4` |
| `landing-full.png` | `snapsort-landing-full.png` |
| `preview-01.png` – `preview-05.png` | `snapsort-preview-1.png` – `snapsort-preview-5.png` |

### URSAC Hub Marketplace (`assets/projects/passion-projects/ursac-hub-marketplace/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `project-1785000788371-mhp1mv-Screenshot_2026-07-26_012730.png` |
| `01.png` | `project-1785000786572-uy289h-Screenshot_2026-07-26_012745.png` |
| `02.png` | `project-1785000787003-hp5s5j-Screenshot_2026-07-26_012757.png` |
| `03.png` | `project-1785000787382-v33k28-Screenshot_2026-07-26_012806.png` |
| `04.png` | `project-1785000787728-q4sts9-Screenshot_2026-07-26_012814.png` |
| `05.png` | `project-1785000788029-mfssby-Screenshot_2026-07-26_012826.png` |

### URSAC Hub Social (`assets/projects/passion-projects/ursac-hub-social/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `project-1784998064424-iwvzb-Home_Resize_Full_Gradient.png` |
| `01-login.png` | `project-1784998061317-rlwr4n-Log_In_Page.png` |
| `02-forums.png` | `project-1784998063091-m0gsgd-Forums_-_Plus_Button.png` |
| `03-post-modal.png` | `project-1784998063431-81q00a-Home_Resize_-_Post_Modal.png` |
| `04-messages-1.png` | `project-1784998063755-e7gfii-Message_View.png` |
| `05-messages-2.png` | `project-1784998064102-nncu0u-Message_View-1.png` |

### AR-DUINO-M (`assets/projects/passion-projects/ar-duino-m/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `project-1786008477632-ux1rth-Screenshot_2026-08-06_172554.png` |
| `01.png` – `06.png` | `project-1786008299870-2ons-...` through `project-1786008302847-c5mrjt-...` |

### The Glow Bar (`assets/projects/passion-projects/the-glow-bar/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `fullpage_snapshot_the-glow-bar_vercel_app_2026-09-02-12-51-02.png` |
| `01.png` – `05.png` | `...-12-51-29.png` through `...-12-53-01.png` |

### Top Notch Constructions (`assets/projects/passion-projects/top-notch-constructions/`)
| Bundled File | Original Filename in `public/projects/` |
| :--- | :--- |
| `cover.png` | `fullpage_snapshot_top-notch-construction-iota_vercel_app_2026-09-02-12-45-51.png` |
| `01.png` – `04.png` | `...-12-46-48.png` through `...-12-47-37.png` |

---

## Resume Files (2 Files)
* `resumes/Mark_Isulat_Developer_Resume.md` — Newly synced Markdown resume
* `resumes/Mark_Isulat_Developer_Resume.pdf` — Copied from `public/Mark_Isulat_Developer_Resume.pdf` (needs re-export from the updated `.md`)
