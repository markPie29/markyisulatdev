import type { ProjectCategoryId, ProjectItem } from "@/types/portfolio";

export const PROJECT_CATEGORIES: {
  id: ProjectCategoryId;
  index: string;
  label: string;
  description: string;
}[] = [
  {
    id: "real-users",
    index: "01",
    label: "Real Users (Software)",
    description:
      "Production enterprise ERPs, client booking platforms, and commercial storefronts operated daily by customers and internal staff.",
  },
  {
    id: "passion",
    index: "02",
    label: "Passion & Explorations",
    description:
      "Hackathon-winning desktop AI pipelines, campus platforms, mobile AR interfaces, and bespoke code-first UI systems.",
  },
  {
    id: "multimedia",
    index: "03",
    label: "Multimedia & Brand Design",
    description:
      "Brand identity systems, product packaging, retail apparel collections, and high-converting digital campaign visuals.",
  },
];

export const PROJECTS: ProjectItem[] = [
  /* =========================================================================
     01 / REAL USERS (SOFTWARE) — 4 Projects
     ========================================================================= */
  {
    slug: "sk-logistics",
    index: "01",
    title: "SK Logistics Fleet Management System",
    category: "real-users",
    categoryLabel: "REAL USERS / ENTERPRISE ERP",
    classification: "ENTERPRISE LOGISTICS ERP · 100+ ACTIVE USERS",
    year: "2026",
    role: "Full-Stack Developer Intern (Nexvision Innovations Inc.)",
    summary:
      "Unified fragmented dispatch, garage maintenance, accounting, and executive tracking into a single multi-role enterprise platform serving 100+ active users.",
    problemContext:
      "SK Logistics ran on disconnected manual spreadsheets and siloed workflows where dispatchers, drivers, garage mechanics, accounting staff, and executives lacked a shared operational view—causing delayed trip dispatches and slow expense reconciliation. Contributing as a Full-Stack Developer Intern at Nexvision Innovations Inc. (deployment led by Nexvision senior engineers), I helped build workflows across core operational tiers and voluntarily guided incoming interns.",
    architectureHighlights: [
      "Accounting Module: Trip revenue reconciliation, operational expense tracking, and driver/operator payout records.",
      "Admin & Executive Tiers: Company-wide telemetry dashboards, multi-role permissions, and audit trails.",
      "Dispatch & Fleet Owners: Vehicle readiness status, trip assignments, and garage maintenance logs.",
      "Supabase PostgreSQL + Row-Level Security (RLS) backed by Next.js, React, and Express.js services.",
    ],
    humanUxTouch:
      "Enterprise logistics tools often fail because intimidating, over-dense interfaces slow down frontline operators. Translating multi-department tables into clean, error-tolerant forms with clear status badges and unified filters let dispatchers and accounting staff operate confidently without formal software training.",
    techStack: [
      "React",
      "Next.js",
      "Express.js",
      "Supabase",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    metrics: [
      "100+ active operational users",
      "10+ production features delivered",
      "50+ functional bugs & edge cases fixed",
      "Accounting, Admin, Dispatch & Executive modules",
    ],
    coverImage: "/assets/projects/real-projects/sk-logistics/cover.png",
    gallery: [
      {
        src: "/assets/projects/real-projects/sk-logistics/cover.png",
        alt: "SK Logistics ERP dashboard overview",
      },
      {
        src: "/assets/projects/real-projects/sk-logistics/01.png",
        alt: "SK Logistics fleet monitoring table",
      },
      {
        src: "/assets/projects/real-projects/sk-logistics/02.png",
        alt: "SK Logistics dispatch and trip workflows",
      },
      {
        src: "/assets/projects/real-projects/sk-logistics/03.png",
        alt: "SK Logistics accounting and financial tracking",
      },
      {
        src: "/assets/projects/real-projects/sk-logistics/04.png",
        alt: "SK Logistics multi-role management interface",
      },
      {
        src: "/assets/projects/real-projects/sk-logistics/05.png",
        alt: "SK Logistics detailed operational controls",
      },
    ],
    featuredOnHome: true,
    homeOrder: 2,
    homeTitle: "SK Logistics",
    homeTagline: "ENTERPRISE LOGISTICS ERP · 100+ ACTIVE USERS",
    homeBullets: [
      "ENTERPRISE LOGISTICS ERP",
      "100+ ACTIVE USERS",
    ],
  },
  {
    slug: "doze-beauty-lounge",
    index: "02",
    title: "Doze Beauty Lounge",
    category: "real-users",
    categoryLabel: "REAL USERS / CLIENT PRODUCTION",
    classification: "AUTOMATED BOOKING & PACKAGE CMS",
    year: "2026",
    role: "Full Stack Developer & UI/UX Designer",
    summary:
      "Production web application eliminating slow chat booking friction through self-service appointment scheduling, a dynamic services/package CMS, and an operations dashboard.",
    problemContext:
      "Doze Beauty Lounge—an all-in-one beauty sanctuary and cozy café in Antipolo City—was losing bookings to slow manual back-and-forth messaging across social DMs. Staff also needed autonomy to update seasonal treatment packages and café offerings without calling a developer.",
    architectureHighlights: [
      "Zero-Intervention Client Booking: Interactive flow to choose treatments, packages, dates, and time slots end-to-end.",
      "Dynamic Services & Package CMS: Admin interface for adding, editing, pricing, or toggling treatments and café menu items live.",
      "Operations Scheduling Dashboard: Unified appointment calendar and status management backed by Supabase.",
    ],
    humanUxTouch:
      "Composed a serene, editorial layout directly in Next.js and TypeScript with transparent package breakdowns and thumb-friendly mobile booking steps—removing hesitation for first-time clients and repetitive manual replies for salon staff.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
    metrics: [
      "Self-service online appointment scheduling",
      "Live staff-managed service & package CMS",
      "Full café menu & salon integration",
      "Production traffic on dozebeautylounge.com",
    ],
    coverImage: "/assets/projects/real-projects/doze-beauty-lounge/cover.png",
    gallery: [
      {
        src: "/assets/projects/real-projects/doze-beauty-lounge/cover.png",
        alt: "Doze Beauty Lounge hero and editorial landing view",
      },
      {
        src: "/assets/projects/real-projects/doze-beauty-lounge/01.png",
        alt: "Doze Beauty Lounge treatment catalog section",
      },
      {
        src: "/assets/projects/real-projects/doze-beauty-lounge/02.png",
        alt: "Doze Beauty Lounge automated booking workflow",
      },
      {
        src: "/assets/projects/real-projects/doze-beauty-lounge/03.png",
        alt: "Doze Beauty Lounge services and café showcase",
      },
      {
        src: "/assets/projects/real-projects/doze-beauty-lounge/04.png",
        alt: "Doze Beauty Lounge dynamic package and admin views",
      },
    ],
    liveUrl: "https://www.dozebeautylounge.com",
    featuredOnHome: true,
    homeOrder: 3,
    homeTagline: "AUTOMATED BOOKING & PACKAGE CMS",
    homeBullets: [
      "AUTOMATED BOOKING SYSTEM",
      "DYNAMIC PACKAGE CMS",
    ],
  },
  {
    slug: "kado-kohi",
    index: "03",
    title: "Kado Kohi",
    category: "real-users",
    categoryLabel: "REAL USERS / COLLABORATIVE BUILD",
    classification: "ONLINE ORDERING, FULFILLMENT & ADMIN PLATFORM",
    year: "2026",
    role: "Co-Developer & UI/UX Designer (Collaborative Build)",
    summary:
      "Collaborative full-stack café storefront across Marikina and Greenhills featuring online drink ordering, pick-up/delivery fulfillment, coffee cart reservations, and an admin portal.",
    problemContext:
      "Operating across Marikina and Greenhills, Kado Kohi needed more than a brochure site—they needed a real ordering platform where customers could customize drinks, pick between store pickup or delivery, or reserve a private coffee cart while baristas managed orders smoothly.",
    architectureHighlights: [
      "Online Drink Ordering & Cart: Full digital menu browsing with configurable beverage options and checkout.",
      "Flexible Fulfillment Logic: Built-in pick-up branch selection and delivery order workflows.",
      "Coffee Cart Event Booking Portal: Dedicated reservation flow for private events and pop-ups.",
      "Admin & Staff Management Dashboard: Back-office visibility into live orders and team permissions via Supabase.",
    ],
    humanUxTouch:
      "Co-developed alongside a partner engineer with a focus on a fast, mobile-first ordering journey so thirsty customers finish checkout in seconds while staff manage rush-hour queues cleanly.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Figma"],
    metrics: [
      "Dual-branch café storefront (Marikina & Greenhills)",
      "Pick-up & delivery fulfillment support",
      "Coffee cart event reservation system",
      "Integrated admin & staff portal",
    ],
    coverImage: "/assets/projects/real-projects/kado-kohi/cover.png",
    gallery: [
      {
        src: "/assets/projects/real-projects/kado-kohi/cover.png",
        alt: "Kado Kohi storefront and coffee cart booking view",
      },
      {
        src: "/assets/projects/real-projects/kado-kohi/01.png",
        alt: "Kado Kohi beverage ordering experience",
      },
      {
        src: "/assets/projects/real-projects/kado-kohi/02.png",
        alt: "Kado Kohi fulfillment and checkout options",
      },
      {
        src: "/assets/projects/real-projects/kado-kohi/03.png",
        alt: "Kado Kohi event reservation workflow",
      },
      {
        src: "/assets/projects/real-projects/kado-kohi/04.png",
        alt: "Kado Kohi admin and management interface",
      },
    ],
    liveUrl: "https://www.kadokohi.com/book/coffee-cart",
    featuredOnHome: true,
    homeOrder: 4,
    homeBullets: [
      "ONLINE ORDERING & FULFILLMENT",
      "DUAL-BRANCH ADMIN PLATFORM",
    ],
  },
  {
    slug: "off-grid-lifestyle-ph",
    index: "04",
    title: "Off Grid Lifestyle PH",
    category: "real-users",
    categoryLabel: "REAL USERS / COLLABORATIVE BUILD",
    classification: "E-COMMERCE & OUTDOOR BRAND STOREFRONT",
    year: "2026",
    role: "Contributing Full-Stack Developer & Brand Designer",
    summary:
      "Ongoing collaborative Next.js and Supabase e-commerce improvements paired with social campaigns (+10% engagement) and pop-up retail strategy (+12% booth sales).",
    problemContext:
      "As an active outdoor lifestyle apparel brand running both digital ad campaigns and physical weekend pop-up booths, Off Grid Lifestyle PH needed rapid storefront UI/UX refinements, new shopping features, and bug fixes to turn online discovery into completed checkouts.",
    architectureHighlights: [
      "UI/UX Hierarchy Overhaul: Improved product collection discovery and navigation clarity across viewports.",
      "Full-Stack Feature & Bug Contributions: Collaborated with a partner developer on frontend components and Supabase-backed storefront behaviors.",
      "Physical-to-Digital Conversion Loop: Aligned retail drop releases and apparel campaigns directly with site merchandising.",
    ],
    humanUxTouch:
      "Working the brand's pop-up booths and listening directly to shoppers reveal their sizing questions and browsing habits shaped every layout fix on oglifestyleph.com—anchoring engineering decisions in live buyer feedback.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS", "Adobe Photoshop"],
    metrics: [
      "+10% social presence & engagement lift",
      "+12% higher pop-up booth conversion",
      "5+ retail shirt designs converted into sales",
      "Live collaborative commits on oglifestyleph.com",
    ],
    coverImage:
      "/assets/projects/real-projects/off-grid-lifestyle-ph/cover.png",
    gallery: [
      {
        src: "/assets/projects/real-projects/off-grid-lifestyle-ph/cover.png",
        alt: "Off Grid Lifestyle PH live website hero and outdoor collection showcase",
      },
      {
        src: "/assets/projects/real-projects/off-grid-lifestyle-ph/01.png",
        alt: "Off Grid Lifestyle PH featured collections and editorial layout",
      },
      {
        src: "/assets/projects/real-projects/off-grid-lifestyle-ph/02.png",
        alt: "Off Grid Lifestyle PH brand storytelling and product highlights",
      },
      {
        src: "/assets/projects/real-projects/off-grid-lifestyle-ph/03.png",
        alt: "Off Grid Lifestyle PH shop catalog and responsive product grid",
      },
    ],
    liveUrl: "https://oglifestyleph.com",
    featuredOnHome: true,
    homeOrder: 5,
    homeBullets: [
      "E-COMMERCE BRAND STOREFRONT",
      "UI/UX & STOREFRONT OVERHAUL",
    ],
  },

  /* =========================================================================
     02 / PASSION & EXPLORATIONS — 5 Projects
     ========================================================================= */
  {
    slug: "snapsort",
    index: "01",
    title: "Snapsort",
    category: "passion",
    categoryLabel: "PASSION & EXPLORATIONS / HACKATHON WINNER",
    classification: "LOCAL AI MEDIA PIPELINE · TOP 2 HACKATHON",
    year: "2026",
    role: "Frontend & UI/UX Engineer · Product Pitch Lead (Co-Creator)",
    awardBadge: "🏆 1st Runner-Up (Top 2 / 280+ Teams) — AppBuilders PH 2026",
    summary:
      "100% local, zero-cloud desktop media intelligence application for macOS indexing, clustering, and searching 10,000+ photos and videos at 60fps.",
    problemContext:
      "Photographers, video editors, and creative teams accumulate tens of thousands of raw photos and clips across internal storage and external hard drives. Searching folders takes hours, yet uploading private client archives to cloud AI violates trust and privacy.",
    architectureHighlights: [
      "Desktop Architecture: Electron 34 shell + React 19, TypeScript, Tailwind CSS v4, Zustand, and TanStack Virtual.",
      "Stdio JSON-RPC IPC Bridge: Real-time streaming between the Chromium UI and a local Python 3.12 inference engine.",
      "On-Device Vision Stack: Google SigLIP 2 natural-language semantic search, Meta DINOv2 similarity, YOLO11 object detection, Apple Vision + GhostFaceNet CoreML face clustering, and IBM Granite 4.0 (llama.cpp) local chat.",
      "Portable Per-Drive Indexing: SQLite vector/metadata indices and FFmpeg frame thumbnails stored safely without cloud uploads.",
    ],
    humanUxTouch:
      "Engineered both Light Mode and Dark Mode interfaces tailored for long sorting sessions, a 60fps virtualized grid scrolling 10,000+ thumbnails without stutter, seamless external-drive switching, and delivered the opening pitch hook that helped win Top 2 out of 280+ submissions.",
    techStack: [
      "Electron 34",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Zustand",
      "TanStack Virtual",
      "Python 3.12",
      "SQLite",
      "FFmpeg",
      "SigLIP 2",
      "YOLO11",
    ],
    metrics: [
      "1st Runner-Up (Top 2 / 280+ Submissions)",
      "60fps virtualized grid for 10,000+ assets",
      "100% offline execution (zero cloud uploads)",
      "Dual Light & Dark creative workspace modes",
    ],
    coverImage: "/assets/projects/passion-projects/snapsort/cover.png",
    gallery: [
      {
        src: "/assets/projects/passion-projects/snapsort/cover.png",
        alt: "Snapsort application overview and semantic search workspace",
      },
      {
        src: "/assets/projects/passion-projects/snapsort/preview-01.png",
        alt: "Snapsort virtualized dark mode media library view",
      },
      {
        src: "/assets/projects/passion-projects/snapsort/preview-02.png",
        alt: "Snapsort natural language query and filtering controls",
      },
      {
        src: "/assets/projects/passion-projects/snapsort/preview-03.png",
        alt: "Snapsort facial recognition and identity clustering workspace",
      },
      {
        src: "/assets/projects/passion-projects/snapsort/preview-04.png",
        alt: "Snapsort light mode workspace for studio sorting",
      },
      {
        src: "/assets/projects/passion-projects/snapsort/preview-05.png",
        alt: "Snapsort local Ask AI conversational media assistant",
      },
      {
        src: "/assets/projects/passion-projects/snapsort/landing-full.png",
        alt: "Snapsort product launch landing page showcase",
      },
    ],
    videoUrl: "/assets/projects/passion-projects/snapsort/demo.mp4",
    liveUrl: "https://snapsort-ph.vercel.app/",
    featuredOnHome: true,
    homeOrder: 1,
    homeTagline: "LOCAL AI MEDIA PIPELINE · 🏆 TOP 2 HACKATHON",
    homeBullets: [
      "TOP 2 HACKATHON",
      "LOCAL AI MEDIA PIPELINE",
    ],
  },
  {
    slug: "ursac-hub",
    index: "02",
    title: "URSAC Hub (Marketplace & Social)",
    category: "passion",
    categoryLabel: "PASSION & EXPLORATIONS / CAMPUS ECOSYSTEM",
    classification: "CAMPUS E-COMMERCE & STUDENT SOCIAL NETWORK",
    year: "2025",
    role: "Full Stack Developer & UI/UX Designer",
    summary:
      "Centralized university ecosystem uniting an organization announcement & campus merchandise marketplace (Laravel + MySQL) with a verified campus social network (Laravel + Firebase).",
    problemContext:
      "Student organizations at URS Antipolo relied on scattered group chats and unofficial social pages to broadcast announcements and sell course merchandise, leaving students without a trusted, unified campus hub.",
    architectureHighlights: [
      "URSAC Hub Marketplace: Built on Laravel, PHP, MySQL, Tailwind CSS, and Docker with role-based auth, event announcements, and merch inventory control.",
      "URSAC Hub Social: Interactive feed built with Laravel, Firebase, and Tailwind CSS featuring posts, likes, comments, campus forums, and direct messaging.",
      "Unified Organization Directory: Verified student organization profiles connecting announcements directly to event merchandise.",
    ],
    humanUxTouch:
      "Combined familiar social-feed interaction patterns with structured e-commerce catalog browsing so students could discover campus news and purchase official org apparel inside one cohesive experience.",
    techStack: [
      "Laravel",
      "PHP",
      "MySQL",
      "Firebase",
      "Tailwind CSS",
      "Docker",
      "JavaScript",
    ],
    metrics: [
      "Dual-app campus platform (Marketplace + Social)",
      "Role-based organization & admin permissions",
      "Real-time feed, forums & messaging UI",
      "Containerized Docker local & Render deployment",
    ],
    coverImage:
      "/assets/projects/passion-projects/ursac-hub-marketplace/cover.png",
    gallery: [
      {
        src: "/assets/projects/passion-projects/ursac-hub-marketplace/cover.png",
        alt: "URSAC Hub Marketplace dashboard and campus storefront",
      },
      {
        src: "/assets/projects/passion-projects/ursac-hub-marketplace/01.png",
        alt: "URSAC Hub Marketplace organization announcements",
      },
      {
        src: "/assets/projects/passion-projects/ursac-hub-marketplace/02.png",
        alt: "URSAC Hub Marketplace merchandise catalog",
      },
      {
        src: "/assets/projects/passion-projects/ursac-hub-social/cover.png",
        alt: "URSAC Hub Social campus community feed",
      },
      {
        src: "/assets/projects/passion-projects/ursac-hub-social/02-forums.png",
        alt: "URSAC Hub Social campus discussion forums",
      },
      {
        src: "/assets/projects/passion-projects/ursac-hub-social/04-messages-1.png",
        alt: "URSAC Hub Social direct messaging view",
      },
    ],
    subSections: [
      {
        title: "Part A — URSAC Hub Marketplace",
        subtitle:
          "Official organization announcements, event promotions, role-based store management, and campus merch ordering.",
        techStack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Docker"],
        highlights: [
          "Organization-scoped roles and merchandise inventory control",
          "Event discovery paired directly with official org product listings",
          "Containerized with Docker and deployed to Render",
        ],
        liveUrl: "https://ursachub.onrender.com/",
        gallery: [
          {
            src: "/assets/projects/passion-projects/ursac-hub-marketplace/cover.png",
            alt: "URSAC Hub Marketplace landing screen",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-marketplace/01.png",
            alt: "Marketplace catalog and search filter",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-marketplace/02.png",
            alt: "Campus merchandise detail page",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-marketplace/03.png",
            alt: "Organization management dashboard",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-marketplace/04.png",
            alt: "Order summary and tracking screen",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-marketplace/05.png",
            alt: "Inventory and announcement publisher",
          },
        ],
      },
      {
        title: "Part B — URSAC Hub Social",
        subtitle:
          "Campus-exclusive social feed, student forums, post composer modal, and real-time messaging interface.",
        techStack: ["Laravel", "Firebase", "Tailwind CSS", "JavaScript"],
        highlights: [
          "Campus authentication & verified organization pages",
          "Interactive feed with posts, likes, comments & forum threads",
          "Dedicated 1-to-1 and group messaging screens",
        ],
        gallery: [
          {
            src: "/assets/projects/passion-projects/ursac-hub-social/cover.png",
            alt: "URSAC Hub Social full home feed layout",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-social/01-login.png",
            alt: "URSAC Hub Social campus sign-in page",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-social/02-forums.png",
            alt: "URSAC Hub Social discussion forums interface",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-social/03-post-modal.png",
            alt: "URSAC Hub Social create post dialog",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-social/04-messages-1.png",
            alt: "URSAC Hub Social messages view 1",
          },
          {
            src: "/assets/projects/passion-projects/ursac-hub-social/05-messages-2.png",
            alt: "URSAC Hub Social messages view 2",
          },
        ],
      },
    ],
    liveUrl: "https://ursachub.onrender.com/",
  },
  {
    slug: "ar-duino-m",
    index: "03",
    title: "AR-DUINO-M",
    category: "passion",
    categoryLabel: "PASSION & EXPLORATIONS / AR & WEB",
    classification: "GAME DEV & AUGMENTED REALITY INTEGRATION",
    year: "2024",
    role: "UI/UX Designer & Product Designer",
    summary:
      "Augmented reality Arduino circuit simulation mobile app paired with a dedicated Next.js & Tailwind CSS product showcase website.",
    problemContext:
      "Beginner computer engineering students learning Arduino wiring often run into microcontroller component shortages and risk damaging real boards during early breadboard experiments.",
    architectureHighlights: [
      "Mobile AR App UI: Designed home screens, navigation menus, overlay controls, and interactive HUD states for Unity 3D + Vuforia AR.",
      "Web Showcase Platform: Independently built the responsive showcase website with Next.js and Tailwind CSS.",
      "Collaborative Scope: 3D hardware modeling and workspace mechanics were developed by engineering teammates.",
    ],
    humanUxTouch:
      "Structured mobile touch controls and uncluttered on-screen circuit prompts so first-year hardware students can inspect 3D pins and test AR simulations without getting lost in game-engine menus.",
    techStack: ["Unity 3D", "Vuforia AR", "C#", "Next.js", "Tailwind CSS"],
    metrics: [
      "Augmented Reality breadboard & component preview",
      "Approachable mobile HUD for student labs",
      "Dedicated Next.js + Tailwind product landing site",
    ],
    coverImage: "/assets/projects/passion-projects/ar-duino-m/cover.png",
    gallery: [
      {
        src: "/assets/projects/passion-projects/ar-duino-m/cover.png",
        alt: "AR-DUINO-M showcase website overview",
      },
      {
        src: "/assets/projects/passion-projects/ar-duino-m/01.png",
        alt: "AR-DUINO-M mobile home screen UI",
      },
      {
        src: "/assets/projects/passion-projects/ar-duino-m/02.png",
        alt: "AR-DUINO-M component selection and menus",
      },
      {
        src: "/assets/projects/passion-projects/ar-duino-m/03.png",
        alt: "AR-DUINO-M augmented reality workspace view",
      },
      {
        src: "/assets/projects/passion-projects/ar-duino-m/04.png",
        alt: "AR-DUINO-M interactive controls and pins",
      },
      {
        src: "/assets/projects/passion-projects/ar-duino-m/05.png",
        alt: "AR-DUINO-M circuit simulation screen",
      },
      {
        src: "/assets/projects/passion-projects/ar-duino-m/06.png",
        alt: "AR-DUINO-M mobile navigation flow",
      },
    ],
    liveUrl: "https://ar-duino-website.vercel.app/",
  },
  {
    slug: "the-glow-bar",
    index: "04",
    title: "The Glow Bar",
    category: "passion",
    categoryLabel: "PASSION & EXPLORATIONS / UI CONCEPT",
    classification: "CONCEPT & UI EXPLORATION · WELLNESS STUDIO",
    year: "2026",
    role: "UI/UX Designer & Frontend Developer",
    summary:
      "Serene, code-first wellness studio web exploration pairing editorial typography with structured treatment packages and accessible shadcn/ui inquiry controls.",
    problemContext:
      "A design-engineering exploration into how a high-touch skin and body studio can communicate calm luxury, transparent treatment menus, and fast mobile booking without visual clutter.",
    architectureHighlights: [
      "Code-First System: Built directly in Next.js, React, TypeScript, Tailwind CSS, and Shadcn UI.",
      "Interactive Treatment Catalog: Clean hierarchy separating signature facials, body treatments, and package pricing.",
      "Responsive Mobile Flow: Deliberate whitespace and scannable CTAs optimized across phone and desktop viewports.",
    ],
    humanUxTouch:
      "Replaced heavy spa stock clutter with measured editorial typography and clear service descriptions so first-time guests immediately understand treatment benefits and next steps.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    metrics: [
      "100% code-first UI exploration",
      "Accessible Shadcn UI component architecture",
      "6 responsive showcase sections",
    ],
    coverImage: "/assets/projects/passion-projects/the-glow-bar/cover.png",
    gallery: [
      {
        src: "/assets/projects/passion-projects/the-glow-bar/cover.png",
        alt: "The Glow Bar hero section",
      },
      {
        src: "/assets/projects/passion-projects/the-glow-bar/01.png",
        alt: "The Glow Bar treatment menu grid",
      },
      {
        src: "/assets/projects/passion-projects/the-glow-bar/02.png",
        alt: "The Glow Bar studio philosophy section",
      },
      {
        src: "/assets/projects/passion-projects/the-glow-bar/03.png",
        alt: "The Glow Bar featured wellness packages",
      },
      {
        src: "/assets/projects/passion-projects/the-glow-bar/04.png",
        alt: "The Glow Bar booking and consultation touchpoints",
      },
      {
        src: "/assets/projects/passion-projects/the-glow-bar/05.png",
        alt: "The Glow Bar footer and location overview",
      },
    ],
    liveUrl: "https://the-glow-bar.vercel.app/",
  },
  {
    slug: "top-notch-constructions",
    index: "05",
    title: "Top Notch Constructions",
    category: "passion",
    categoryLabel: "PASSION & EXPLORATIONS / UI CONCEPT",
    classification: "CONCEPT & UI EXPLORATION · ARCHITECTURE & BUILD",
    year: "2026",
    role: "UI/UX Designer & Frontend Developer",
    summary:
      "Bold industrial-modern construction and architectural showcase built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI with structured quotation channels.",
    problemContext:
      "Explored how commercial and residential contractors can replace dated static brochures with a trustworthy digital portfolio showcasing structural scale, completed builds, and friction-free project quotation requests.",
    architectureHighlights: [
      "Industrial Grid Architecture: Strong modular proportions built in Next.js, TypeScript, Tailwind CSS, and Shadcn UI.",
      "Structural Project Showcase: Categorized commercial and residential builds paired with clear capability scopes.",
      "Conversion Touchpoints: Direct quotation request pathways integrated naturally throughout key scroll milestones.",
    ],
    humanUxTouch:
      "Grounded the visual rhythm in sturdy structural proportions and high-contrast trust markers so prospective property owners can verify past workmanship before requesting a quote.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    metrics: [
      "Industrial-modern responsive grid system",
      "Structured capability & build showcase",
      "Streamlined quotation flow",
    ],
    coverImage:
      "/assets/projects/passion-projects/top-notch-constructions/cover.png",
    gallery: [
      {
        src: "/assets/projects/passion-projects/top-notch-constructions/cover.png",
        alt: "Top Notch Constructions hero showcase",
      },
      {
        src: "/assets/projects/passion-projects/top-notch-constructions/01.png",
        alt: "Top Notch Constructions project gallery",
      },
      {
        src: "/assets/projects/passion-projects/top-notch-constructions/02.png",
        alt: "Top Notch Constructions engineering services",
      },
      {
        src: "/assets/projects/passion-projects/top-notch-constructions/03.png",
        alt: "Top Notch Constructions trust markers and process",
      },
      {
        src: "/assets/projects/passion-projects/top-notch-constructions/04.png",
        alt: "Top Notch Constructions quotation CTA and footer",
      },
    ],
    liveUrl: "https://top-notch-construction-iota.vercel.app/",
  },

  /* =========================================================================
     03 / MULTIMEDIA & BRAND DESIGN — 8 Projects
     ========================================================================= */
  {
    slug: "hope-for-angels",
    index: "01",
    title: "Hope for Angels",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / BRAND IDENTITY & REBRANDING",
    classification: "ANIMAL SHELTER REBRAND & MERCHANDISE",
    year: "2024",
    role: "Graphic Designer",
    summary:
      "Full brand refresh for Leah Borbon's Hope for Angels animal rescue shelter, delivering a warm logo system, visual brandbook, and three fundraising merchandise shirt concepts.",
    problemContext:
      "Hope for Angels, an animal rescue and shelter organization led by Leah Borbon, needed a heartfelt, recognizable identity refresh and retail merchandise line to power their Income Generating Project for shelter operations.",
    architectureHighlights: [
      "Logo & Symbol Redesign: Crafted an approachable emblem translating shelter care into scalable social and print marks.",
      "Cohesive Brandbook: Defined color palette, typographic pairings, and social cover templates.",
      "Fundraising Shirt Collection: Designed 3 print-ready apparel concepts tailored for community supporters.",
    ],
    humanUxTouch:
      "Translated collaborator Novy Marquez's shelter mission under a fast turnaround into friendly, wearable apparel and warm digital visuals that immediately spark empathy from animal welfare supporters.",
    techStack: ["Adobe Photoshop", "Adobe Illustrator"],
    metrics: [
      "Complete brandbook & social identity system",
      "3 fundraising shirt concepts delivered",
      "Highlighted by collaborator Novy Marquez",
    ],
    coverImage: "/assets/projects/multimedia-design/hope-for-angels/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/hope-for-angels/cover.png",
        alt: "Hope for Angels Facebook cover identity",
      },
      {
        src: "/assets/projects/multimedia-design/hope-for-angels/01-branding.png",
        alt: "Hope for Angels complete brandbook board",
      },
      {
        src: "/assets/projects/multimedia-design/hope-for-angels/02-shirt-1.png",
        alt: "Hope for Angels shirt concept 01",
      },
      {
        src: "/assets/projects/multimedia-design/hope-for-angels/03-shirt-2.png",
        alt: "Hope for Angels shirt concept 02",
      },
      {
        src: "/assets/projects/multimedia-design/hope-for-angels/04-shirt-3.png",
        alt: "Hope for Angels shirt concept 03",
      },
    ],
  },
  {
    slug: "access-brand-identity",
    index: "02",
    title: "ACCESS Brand Identity",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / BRANDING & APPAREL",
    classification: "ORGANIZATION IDENTITY, PUBMATS & COURSE SHIRT",
    year: "2024",
    role: "Lead Graphic Designer",
    summary:
      "Complete organization identity, social publication materials, and signature Computer Engineering course shirt worn across URS Antipolo campus.",
    problemContext:
      "ACCESS (the official Computer Engineering student organization at URS Antipolo where my visual design journey began) needed unified event pubmats, recognizable logo variations, and official merchandise students genuinely wanted to wear.",
    architectureHighlights: [
      "Logo System & Lockups: Standardized primary emblem and layout variations for digital and print collateral.",
      "Event & Holiday Pubmats: Built recognizable publication series across academic weeks, seminars, and campus drives.",
      "Campus Favorite Apparel: Designed the Computer Engineering course shirt and organization tees.",
    ],
    humanUxTouch:
      "Elevated student publication materials beyond template posters—sparking peer requests from surrounding campus orgs and creating a course shirt still proudly worn on campus.",
    techStack: ["Adobe Illustrator", "Adobe Photoshop", "Canva"],
    metrics: [
      "Signature campus course shirt worn across cohorts",
      "Adopted as template across multiple campus orgs",
      "8-piece identity, apparel & pubmat archive",
    ],
    coverImage:
      "/assets/projects/multimedia-design/access-brand-identity/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/cover.png",
        alt: "ACCESS Brand Identity mockup overview",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/01-logo.png",
        alt: "ACCESS primary logo mark",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/02-variations.png",
        alt: "ACCESS logo variations sheet",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/03-shirt-1.png",
        alt: "ACCESS official course shirt design front and back",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/04-shirt-2.png",
        alt: "ACCESS apparel mockup 2",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/05-pubmat-1.png",
        alt: "ACCESS campus event publication material 1",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/06-pubmat-2.png",
        alt: "ACCESS campus event publication material 2",
      },
      {
        src: "/assets/projects/multimedia-design/access-brand-identity/07-pubmat-3.png",
        alt: "ACCESS campus event publication material 3",
      },
    ],
  },
  {
    slug: "purehubs-nutrition",
    index: "03",
    title: "PureHubs Nutrition",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / PACKAGING & AD CREATIVE",
    classification: "SUPPLEMENT PACKAGING & FACEBOOK ADS",
    year: "2024",
    role: "Graphic Designer",
    summary:
      "Product label architecture and social advertising suite establishing a clean, modern nutrition and wellness shelf presence across print and Facebook ads.",
    problemContext:
      "PureHubs Nutrition needed modern, credible supplement label designs across multiple SKUs alongside matching digital ad creatives that stood out in crowded social feeds.",
    architectureHighlights: [
      "Multi-SKU Packaging Suite: Created 5 coordinated product label concepts balancing legible nutrition callouts with strong shelf presence.",
      "Performance Ad Graphics: Designed high-contrast Facebook ad creatives aligned seamlessly with physical product labels.",
    ],
    humanUxTouch:
      "Structured clear information hierarchy on supplement labels so shoppers can scan active ingredients, benefits, and dosage at a glance without visual noise.",
    techStack: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    metrics: [
      "5 print-ready packaging labels produced",
      "Coordinated social ad creative suite",
      "Consistent physical-to-digital shelf identity",
    ],
    coverImage:
      "/assets/projects/multimedia-design/purehubs-nutrition/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/cover.png",
        alt: "PureHubs Nutrition primary packaging and brand display",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/01-pack-1.png",
        alt: "PureHubs Nutrition packaging label 01",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/02-pack-2.png",
        alt: "PureHubs Nutrition packaging label 02",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/03-pack-3.png",
        alt: "PureHubs Nutrition packaging label 03",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/04-pack-4.png",
        alt: "PureHubs Nutrition packaging label 04",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/05-pack-5.png",
        alt: "PureHubs Nutrition packaging label 05",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/06-pubmat-1.png",
        alt: "PureHubs Nutrition promotional pubmat 01",
      },
      {
        src: "/assets/projects/multimedia-design/purehubs-nutrition/07-pubmat-2.png",
        alt: "PureHubs Nutrition promotional pubmat 02",
      },
    ],
  },
  {
    slug: "higher-than-limits",
    index: "04",
    title: "Higher than Limits",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / APPAREL ILLUSTRATION",
    classification: "CULTURAL STREETWEAR & APPAREL DESIGN",
    year: "2024",
    role: "Graphic Designer",
    summary:
      "Bespoke apparel illustrations celebrating Tuguegarao culture, translating founder Humphrey Lacambra's rough sketches directly into print-ready streetwear drops.",
    problemContext:
      "Clothing founder Humphrey Lacambra needed a designer who could interpret raw concept sketches honoring Tuguegarao heritage and render them into bold, screen-print-ready streetwear compositions quickly.",
    architectureHighlights: [
      "Sketch-to-Vector Execution: Refined initial hand concepts into crisp layered illustrations and distressed streetwear compositions.",
      "Print-Ready Artwork Delivery: Prepared multi-variant back and front graphic layouts ready for apparel production.",
    ],
    humanUxTouch:
      "Close back-and-forth iteration transformed rough founder sketches into faithful regional storytelling pieces, earning strong commendation for communication speed and creative fidelity.",
    techStack: ["Adobe Photoshop", "Adobe Illustrator"],
    metrics: [
      "4 cultural apparel artwork drops",
      "Direct rough-sketch-to-production pipeline",
      "Endorsed by brand founder Humphrey Lacambra",
    ],
    coverImage:
      "/assets/projects/multimedia-design/higher-than-limits/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/higher-than-limits/cover.png",
        alt: "Higher than Limits primary cultural shirt artwork",
      },
      {
        src: "/assets/projects/multimedia-design/higher-than-limits/01.png",
        alt: "Higher than Limits shirt design variant 01",
      },
      {
        src: "/assets/projects/multimedia-design/higher-than-limits/02.png",
        alt: "Higher than Limits shirt design variant 02",
      },
      {
        src: "/assets/projects/multimedia-design/higher-than-limits/03.png",
        alt: "Higher than Limits shirt design variant 03",
      },
    ],
  },
  {
    slug: "college-of-engineering",
    index: "05",
    title: "College of Engineering",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / ESPORTS, SPORTS & COUNCIL",
    classification: "STUDENT COUNCIL APPAREL & ESPORTS PUBMATS",
    year: "2025",
    role: "Graphic Designer",
    summary:
      "Official varsity and libero jerseys, pageant collateral, and collegiate esports tournament graphics produced for the URSAC College of Engineering Student Council.",
    problemContext:
      "Across Engineering Week, Intramurals, and Campus Fairs, the College of Engineering Student Council needed bold, high-energy visual assets uniting physical athletic jerseys with digital tournament announcements.",
    architectureHighlights: [
      "Official Jersey Designs: Produced both the main College of Engineering varsity jersey and alternate Libero presentation kit.",
      "Esports & Sports Series: Created high-impact tournament pubmats for Basketball, Mobile Legends, CODM, Volleyball, and Ms. COENG.",
    ],
    humanUxTouch:
      "Unified disparate college tournaments under one unmistakably engineering-led aesthetic—making student athletes and competitors proud to represent their department across courts and feeds.",
    techStack: ["Adobe Photoshop", "Canva"],
    metrics: [
      "Official College of Engineering main & libero jerseys",
      "Campus Fair, Sports & Esports tournament suite",
      "Produced during Student Council leadership term",
    ],
    coverImage:
      "/assets/projects/multimedia-design/college-of-engineering/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/cover.png",
        alt: "College of Engineering Student Council visual showcase",
      },
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/01-jersey-main.png",
        alt: "College of Engineering official jersey design",
      },
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/02-jersey-libero.png",
        alt: "College of Engineering official libero jersey design",
      },
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/03-ms-coeng.png",
        alt: "Ms. COENG pageant pubmat",
      },
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/04-bball.png",
        alt: "Basketball tournament publication material",
      },
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/05-codm.png",
        alt: "CODM collegiate tournament pubmat",
      },
      {
        src: "/assets/projects/multimedia-design/college-of-engineering/06-ml.png",
        alt: "Mobile Legends collegiate tournament pubmat",
      },
    ],
  },
  {
    slug: "lvme-cafe",
    index: "06",
    title: "LVME Cafe",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / BRANDING & PACKAGING",
    classification: "CAFE IDENTITY SYSTEM & PACKAGING",
    year: "2024",
    role: "Graphic Designer",
    summary:
      "Minimalist logo system, typographic visual identity, and beverage cup/packaging collateral designed in collaboration with a co-designer for a specialty café.",
    problemContext:
      "LVME Cafe wanted a clean, modern visual identity that felt distinctive on physical takeaway cups, menus, and counter signage without overcomplicating production printing.",
    architectureHighlights: [
      "Primary Logo & Mark: Engineered a balanced minimalist logotype scalable across stickers, embossing, and cup sleeves.",
      "Co-Designed Packaging Direction: Collaborated closely with another designer to keep takeaway cups, bags, and menus consistent.",
    ],
    humanUxTouch:
      "Focused on restraint and breathing room so every physical cup and touchpoint communicates calm specialty hospitality.",
    techStack: ["Adobe Photoshop", "Canva"],
    metrics: [
      "Official minimalist logo & mark system",
      "Takeaway cup & packaging collateral suite",
      "Cross-designer collaborative execution",
    ],
    coverImage: "/assets/projects/multimedia-design/lvme-cafe/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/cover.png",
        alt: "LVME Cafe brand identity showcase",
      },
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/01.png",
        alt: "LVME Cafe logo application 01",
      },
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/02.png",
        alt: "LVME Cafe packaging mockup 02",
      },
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/03.png",
        alt: "LVME Cafe cup and brand application 03",
      },
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/04.png",
        alt: "LVME Cafe typographic identity 04",
      },
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/05.png",
        alt: "LVME Cafe brand guidelines panel 05",
      },
      {
        src: "/assets/projects/multimedia-design/lvme-cafe/06.png",
        alt: "LVME Cafe collateral presentation 06",
      },
    ],
  },
  {
    slug: "bola-pickleball-ph",
    index: "07",
    title: "Bola Pickleball PH",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / SOCIAL & CAMPAIGN DESIGN",
    classification: "SPORTS BRAND PUBMATS & SOCIAL COLLATERAL",
    year: "2024",
    role: "Graphic Designer (Marketing Hive)",
    summary:
      "Energetic sports-driven publication materials and social campaign graphics created under Marketing Hive for a premier Philippine pickleball community and court brand.",
    problemContext:
      "As pickleball surged across the Philippines, BOLA Pickleball PH needed vibrant, high-tempo campaign visuals to promote clinics, open-play sessions, and gear online.",
    architectureHighlights: [
      "Dynamic Court Grid Layouts: Combined bold athletic typography with action framing tailored for Instagram & Facebook feeds.",
      "Repeatable Campaign System: Built adaptable templates under strict Marketing Hive agency turnarounds.",
    ],
    humanUxTouch:
      "Prioritized immediate scannability of court dates, registration hooks, and venue details so scrolling players never had to hunt through captions.",
    techStack: ["Adobe Photoshop", "Canva"],
    metrics: [
      "Multi-campaign social pubmat system",
      "Delivered under Marketing Hive agency retainers",
      "Unified sporty visual language",
    ],
    coverImage:
      "/assets/projects/multimedia-design/bola-pickleball-ph/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/bola-pickleball-ph/cover.png",
        alt: "Bola Pickleball PH campaign hero visual",
      },
      {
        src: "/assets/projects/multimedia-design/bola-pickleball-ph/01-cover-2.png",
        alt: "Bola Pickleball PH alternate hero graphic",
      },
      {
        src: "/assets/projects/multimedia-design/bola-pickleball-ph/02-pubmat-1.png",
        alt: "Bola Pickleball PH social pubmat 01",
      },
      {
        src: "/assets/projects/multimedia-design/bola-pickleball-ph/03-pubmat-2.png",
        alt: "Bola Pickleball PH social pubmat 02",
      },
      {
        src: "/assets/projects/multimedia-design/bola-pickleball-ph/04-pubmat-3.png",
        alt: "Bola Pickleball PH social pubmat 03",
      },
      {
        src: "/assets/projects/multimedia-design/bola-pickleball-ph/05-pubmat-4.png",
        alt: "Bola Pickleball PH social pubmat 04",
      },
    ],
  },
  {
    slug: "franchising-ph",
    index: "08",
    title: "Franchising PH",
    category: "multimedia",
    categoryLabel: "MULTIMEDIA / CORPORATE CAMPAIGN DESIGN",
    classification: "CORPORATE SOCIAL ASSETS & PUBMATS",
    year: "2024",
    role: "Graphic Designer (Marketing Hive)",
    summary:
      "Clean, authoritative corporate social media assets and informational carousel pubmats built under Marketing Hive for Philippine franchise consultancy campaigns.",
    problemContext:
      "Franchise investors evaluate credibility quickly. Franchising PH required crisp, trustworthy B2B social visuals that communicated business opportunity metrics clearly across mobile feeds.",
    architectureHighlights: [
      "Corporate Information Architecture: Broke down franchise investment insights and events into clean multi-slide carousels.",
      "Brand Consistency: Enforced strict color and typographic discipline across campaign rollouts.",
    ],
    humanUxTouch:
      "Organized dense business-opportunity data into bite-sized visual headlines so prospective entrepreneurs absorbed value propositions quickly without fatigue.",
    techStack: ["Adobe Photoshop", "Canva"],
    metrics: [
      "Corporate social & carousel visual suite",
      "Delivered under Marketing Hive agency operations",
      "B2B brand authority & legibility focus",
    ],
    coverImage: "/assets/projects/multimedia-design/franchising-ph/cover.png",
    gallery: [
      {
        src: "/assets/projects/multimedia-design/franchising-ph/cover.png",
        alt: "Franchising PH primary corporate campaign visual",
      },
      {
        src: "/assets/projects/multimedia-design/franchising-ph/01.png",
        alt: "Franchising PH social pubmat 01",
      },
      {
        src: "/assets/projects/multimedia-design/franchising-ph/02.png",
        alt: "Franchising PH social pubmat 02",
      },
      {
        src: "/assets/projects/multimedia-design/franchising-ph/03.png",
        alt: "Franchising PH social pubmat 03",
      },
    ],
  },
];

export function getFeaturedHomeProjects(): ProjectItem[] {
  return PROJECTS.filter((project) => project.featuredOnHome).sort(
    (a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99),
  );
}

export function getProjectsByCategory(
  category: ProjectCategoryId,
): ProjectItem[] {
  return PROJECTS.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: ProjectItem;
  next: ProjectItem;
} {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  const safeIndex = index >= 0 ? index : 0;
  const previousIndex = (safeIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (safeIndex + 1) % PROJECTS.length;
  return {
    previous: PROJECTS[previousIndex],
    next: PROJECTS[nextIndex],
  };
}
