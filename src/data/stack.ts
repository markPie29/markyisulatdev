import type {
  HomeStackRow,
  StackCategory,
  UnfairAdvantagePillar,
} from "@/types/portfolio";

export const UNFAIR_ADVANTAGES: UnfairAdvantagePillar[] = [
  {
    index: "01",
    title: "Code-First UI Engineering",
    description:
      "Instead of getting bogged down in static mockups, I compose high-polish, production interfaces directly in React 19, Next.js, and Tailwind CSS v4—tuning typography, spacing, and responsiveness in real browser states.",
  },
  {
    index: "02",
    title: "Frontend-First Architecture",
    description:
      "Comfortable across APIs, databases, and local AI pipelines, my strongest engineering instinct starts with the person at the screen—structuring backend mechanics so complex software feels effortless to operate.",
  },
  {
    index: "03",
    title: "User & Marketing Empathy",
    description:
      "Running digital ad funnels and selling face-to-face at pop-up booths revealed firsthand where people hesitate or drop off. I design database schemas and booking flows that eliminate unnecessary friction.",
  },
];

export const HOME_STACK_ROWS: HomeStackRow[] = [
  {
    index: "01",
    label: "FRONTEND & UI",
    tools: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS v4",
      "Electron 34",
      "TanStack Virtual",
    ],
  },
  {
    index: "02",
    label: "BACKEND & DATA",
    tools: [
      "Supabase (PostgreSQL / RLS)",
      "Node.js & Express",
      "Python 3.12",
      "Laravel & PHP",
      "SQLite & MySQL",
    ],
  },
  {
    index: "03",
    label: "DESIGN & MOTION",
    tools: [
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "CapCut",
      "Framer Motion & GSAP",
    ],
  },
  {
    index: "04",
    label: "AI, AR & WORKFLOW",
    tools: [
      "SigLIP 2 / YOLO11 / Local LLM",
      "Unity 3D & Vuforia AR",
      "Docker",
      "Git & GitHub",
      "Vercel",
    ],
  },
];

export const STACK_CATEGORIES: StackCategory[] = [
  {
    index: "01",
    title: "FRONTEND & UI ENGINEERING",
    subtitle:
      "Core frameworks, styling primitives, state management, and 60fps list virtualization.",
    tools: [
      {
        name: "React 19",
        proof: "Snapsort desktop UI, SK Logistics ERP, Doze Beauty Lounge",
        projectSlug: "snapsort",
      },
      {
        name: "Next.js",
        proof: "Doze Beauty Lounge, Kado Kohi, Off Grid Lifestyle PH, SK Logistics",
        projectSlug: "doze-beauty-lounge",
      },
      {
        name: "TypeScript",
        proof: "Type-safe full-stack apps, IPC schemas, form validation",
        projectSlug: "snapsort",
      },
      {
        name: "Electron 34",
        proof: "Cross-platform local desktop shell & file workflows in Snapsort",
        projectSlug: "snapsort",
      },
      {
        name: "Tailwind CSS v4",
        proof: "Design tokens & responsive layouts across all production builds",
        projectSlug: "doze-beauty-lounge",
      },
      {
        name: "TanStack Virtual",
        proof: "60fps scrolling across 10,000+ local media thumbnails",
        projectSlug: "snapsort",
      },
      {
        name: "Zustand & Motion",
        proof: "Client state orchestration & subtle GPU-composited reveals",
        projectSlug: "snapsort",
      },
      {
        name: "Shadcn UI & Radix",
        proof: "Accessible headless dialogs, tabs & bespoke UI explorations",
        projectSlug: "the-glow-bar",
      },
    ],
  },
  {
    index: "02",
    title: "BACKEND & APPLICATION LOGIC",
    subtitle:
      "APIs, server actions, multi-process desktop bridges, and relational business logic.",
    tools: [
      {
        name: "Node.js & Express",
        proof: "Multi-module REST services & business APIs for SK Logistics ERP",
        projectSlug: "sk-logistics",
      },
      {
        name: "Python 3.12",
        proof: "Local vision inference engine over stdio JSON-RPC IPC in Snapsort",
        projectSlug: "snapsort",
      },
      {
        name: "Laravel & PHP",
        proof: "Campus e-commerce, inventory, roles & feed architecture in URSAC Hub",
        projectSlug: "ursac-hub",
      },
      {
        name: "RESTful & Serverless APIs",
        proof: "Booking workflows, CMS mutations & Next.js server actions",
        projectSlug: "doze-beauty-lounge",
      },
      {
        name: "JavaScript (ES6+) & Java / C#",
        proof: "Interactive web logic, academic systems & Unity AR scripting",
        projectSlug: "ar-duino-m",
      },
      {
        name: "Vite",
        proof: "Fast bundling for React single-page dashboards & Electron renderers",
        projectSlug: "snapsort",
      },
    ],
  },
  {
    index: "03",
    title: "DATABASES, CLOUD & DEVOPS",
    subtitle:
      "Relational modeling, Row-Level Security policies, containerized apps, and deployments.",
    tools: [
      {
        name: "Supabase (PostgreSQL / RLS)",
        proof: "Multi-role ERP permissions, booking CMS, storefront & ordering DBs",
        projectSlug: "sk-logistics",
      },
      {
        name: "SQLite",
        proof: "Portable per-drive local media & embedding storage in Snapsort",
        projectSlug: "snapsort",
      },
      {
        name: "MySQL & SQL Server",
        proof: "Transactional campus store & inventory schemas in URSAC Hub",
        projectSlug: "ursac-hub",
      },
      {
        name: "Firebase",
        proof: "Realtime feed & social interactions for URSAC Hub Social",
        projectSlug: "ursac-hub",
      },
      {
        name: "Vercel, Netlify & Render",
        proof: "Production hosting, DNS setup & continuous preview deployments",
        projectSlug: "doze-beauty-lounge",
      },
      {
        name: "Docker, Git & GitHub",
        proof: "Containerized Laravel environments & team PR/intern mentoring workflows",
        projectSlug: "ursac-hub",
      },
    ],
  },
  {
    index: "04",
    title: "AI, AR & INTERACTIVE MEDIA",
    subtitle:
      "On-device vision models, local LLMs, media transcoding, and spatial hardware education.",
    tools: [
      {
        name: "SigLIP 2 / Meta DINOv2",
        proof: "Offline natural-language & visual similarity media search in Snapsort",
        projectSlug: "snapsort",
      },
      {
        name: "YOLO11 & GhostFaceNet",
        proof: "On-device object detection & CoreML facial clustering in Snapsort",
        projectSlug: "snapsort",
      },
      {
        name: "IBM Granite 4.0 (llama.cpp)",
        proof: "Local conversational assistant querying private media metadata",
        projectSlug: "snapsort",
      },
      {
        name: "FFmpeg",
        proof: "Fast local frame extraction & video thumbnail generation in Snapsort",
        projectSlug: "snapsort",
      },
      {
        name: "Unity 3D & Vuforia AR",
        proof: "AR-DUINO-M mobile hardware simulation UI & component visualization",
        projectSlug: "ar-duino-m",
      },
      {
        name: "Pygame",
        proof: "Interactive 2D simulation & algorithmic UI prototypes in Python",
      },
    ],
  },
  {
    index: "05",
    title: "DESIGN, MOTION & MARKETING",
    subtitle:
      "Identity craft, packaging, retail apparel, video production, and growth analytics.",
    tools: [
      {
        name: "Figma",
        proof: "Interface systems, brand kits & collaborative product wireframes",
        projectSlug: "kado-kohi",
      },
      {
        name: "Adobe Photoshop",
        proof: "Product packaging, retail apparel mockups & ad creative suites",
        projectSlug: "purehubs-nutrition",
      },
      {
        name: "Adobe Illustrator",
        proof: "Vector logos, shelter rebrands, jersey crests & shirt artwork",
        projectSlug: "hope-for-angels",
      },
      {
        name: "Canva",
        proof: "Rapid social pubmats & co-branded campaign templates",
        projectSlug: "access-brand-identity",
      },
      {
        name: "CapCut",
        proof: "Short-form social reels, event recaps & promotional video ads",
        projectSlug: "off-grid-lifestyle-ph",
      },
      {
        name: "Klaviyo & Meta Business Suite",
        proof: "Conversion-focused email campaigns & +10% social growth execution",
        projectSlug: "off-grid-lifestyle-ph",
      },
    ],
  },
];
