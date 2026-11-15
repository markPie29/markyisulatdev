import type {
  CertificationRecord,
  EducationRecord,
  ExperienceRole,
  HonorRecord,
} from "@/types/portfolio";

export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    slug: "marked-media",
    index: "01",
    period: "2024 — PRESENT",
    role: "Founder",
    company: "Marked Media",
    workMode: "Remote · Client-Facing",
    location: "Antipolo City, Philippines",
    logo: "/assets/brand-logos/marked-media.svg",
    overview:
      "Partnered directly with local businesses, startups, and brand founders to design, engineer, market, and deploy custom web applications, automated booking platforms, and cohesive visual identity systems.",
    achievements: [
      "Engineered and deployed full-stack client platforms including Doze Beauty Lounge (automated appointment booking + dynamic package CMS) and co-developed the Kado Kohi full-stack ordering & admin site.",
      "Composed responsive, accessible web interfaces directly in React 19, Next.js, TypeScript, and Tailwind CSS v4 from discovery through DNS & cloud deployment.",
      "Delivered brand identity packages, product packaging, publication materials, retail apparel, and digital marketing campaigns across social and email channels.",
      "Managed relational database schemas, Supabase integrations, Vercel CI/CD pipelines, and direct client onboarding.",
    ],
    humanImpact:
      "Bridged business strategy and software engineering by replacing slow manual chat inquiries with automated self-service booking—while giving non-technical business owners clean CMS dashboards to manage services independently.",
    stack: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase",
      "Node.js",
      "Vercel",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "CapCut",
    ],
  },
  {
    slug: "off-grid-lifestyle-ph",
    index: "02",
    period: "AUG 2026 — PRESENT",
    role: "Digital Marketing & Graphic Designer",
    company: "Off Grid Lifestyle PH",
    workMode: "Project-Based · Remote & On-Site",
    location: "Remote · Pop-Up Booths & Live Events",
    website: "https://oglifestyleph.com",
    logo: "/assets/brand-logos/off-grid-lifestyle-ph-white.png",
    logoLight: "/assets/brand-logos/off-grid-lifestyle-ph-black.png",
    overview:
      "Drives social media strategy, retail apparel design, and on-ground pop-up booth conversions for an outdoor lifestyle brand, alongside collaborative full-stack UI/UX and feature contributions on oglifestyleph.com.",
    achievements: [
      "Managed end-to-end social channels and targeted campaign planning, growing overall brand engagement 10% above initial baseline.",
      "Executed on-ground event documentation and live pop-up booth selling, generating 12% higher sales than the brand's usual pop-up booth average.",
      "Designed 5+ retail shirt pieces for the apparel line that directly converted into customer purchases.",
      "Collaborated with a partner developer on oglifestyleph.com to refine UI/UX hierarchy, responsiveness, new storefront features, and frontend/backend bug fixes.",
    ],
    humanImpact:
      "Talking directly to shoppers face-to-face at pop-up booths and observing how audiences react online anchors every storefront improvement in what real customers actually ask for and act on.",
    stack: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "CapCut",
      "Meta Business Suite",
    ],
  },
  {
    slug: "nexvision-innovations",
    index: "03",
    period: "2026",
    role: "Full Stack Web Developer (Intern)",
    company: "Nexvision Innovations",
    workMode: "Internship · Enterprise Engineering",
    location: "Marikina City, Philippines",
    logo: "/assets/brand-logos/nexvision-innovations.svg",
    overview:
      "Contributed across core modules of an enterprise Fleet Management ERP (SK Logistics) serving 100+ active users across operational departments. Final deployment and client turnover were led by Nexvision's senior developers.",
    achievements: [
      "Engineered full-stack features and workflows spanning Accounting, Admin, Dispatch, Fleet Owners, and Executive departments.",
      "Worked within relational Supabase / PostgreSQL schemas and Row-Level Security (RLS) policies supporting strict multi-role permissions.",
      "Implemented 10+ production features and diagnosed and resolved 50+ functional bugs and edge cases to maintain daily system reliability.",
      "Voluntarily mentored incoming developer interns on codebase conventions, Git workflows, and debugging practices as an unofficial peer guide.",
    ],
    humanImpact:
      "Commercial logistics software is notoriously intimidating and cluttered. Turning dense multi-department data tables into clean, error-tolerant forms with unified filtering allowed dispatchers, accounting staff, and drivers to operate smoothly without formal training.",
    stack: [
      "React",
      "Next.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Node.js",
      "Git",
      "GitHub",
    ],
  },
  {
    slug: "marketing-hive",
    index: "04",
    period: "2024 — 2026",
    role: "Digital Marketing & Content Specialist",
    company: "Marketing Hive",
    workMode: "Remote Contract · International Clients",
    location: "Remote",
    logo: "/assets/brand-logos/marketing-hive-mono.png",
    invertOnLight: true,
    overview:
      "Executed digital advertising creative, Klaviyo email design, short-form promotional video editing, and audience growth workflows for international e-commerce and service brands.",
    achievements: [
      "Designed promotional digital ad graphics, Klaviyo email campaigns, and edited short-form promotional reels under tight international agency timelines.",
      "Managed social publishing pipelines, editorial calendars, community engagement, and trend research for organic growth.",
      "Analyzed audience engagement metrics and conversion funnels to sharpen campaign messaging and visual hierarchy across multiple brands.",
    ],
    humanImpact:
      "Frontline exposure to user drop-offs, unclear value propositions, and ad fatigue directly shapes my software engineering work today—designing UI flows that strip away guesswork and minimize cognitive load.",
    stack: [
      "Adobe Photoshop",
      "Canva",
      "CapCut",
      "Klaviyo",
      "Meta Business Suite",
    ],
  },
  {
    slug: "ap-global-it-solutions",
    index: "05",
    period: "2023",
    role: "Designer & Developer Trainee",
    company: "AP Global IT Solutions",
    workMode: "Trainee Internship",
    location: "Antipolo City, Philippines",
    logo: "/assets/brand-logos/ap-global.svg",
    overview:
      "Hands-on design trainee creating corporate branding and marketing visuals while observing full-stack engineering teams ship production web interfaces.",
    achievements: [
      "Produced corporate branding collateral, digital marketing visuals, and client-facing publication materials using Figma and Canva.",
      "Worked alongside the software engineering team and gained foundational learning exposure to React component workflows and frontend delivery.",
    ],
    humanImpact:
      "Seeing designers and software engineers collaborate side by side sparked my shift toward full-stack engineering grounded in the principle that code works best when it serves human usability and visual clarity.",
    stack: ["Figma", "Canva", "CapCut", "React (Exposure)"],
  },
];

export const EDUCATION_RECORD: EducationRecord = {
  degree: "Bachelor of Science in Computer Engineering (BSCpE)",
  institution: "University of Rizal System – Antipolo Campus (URSAC)",
  period: "2023 – Present",
  scholarship: "DOST-SEI Undergraduate S&T Scholar (R.A. 7687)",
};

export const HONORS_LIST: HonorRecord[] = [
  {
    title: "1st Runner-Up (Top 2 out of 280+ Submissions)",
    issuer: "AppBuilders PH Hackathon 2026 · Snapsort",
    period: "2026",
  },
  {
    title: "DOST-SEI S&T Undergraduate Scholar (R.A. 7687)",
    issuer: "Department of Science and Technology",
    period: "2023 – Present",
  },
  {
    title: "Vice President — College of Engineering Student Council",
    issuer: "University of Rizal System – Antipolo Campus",
    period: "AY 2025–2026",
  },
  {
    title: "Delegate (Representing Marked Media)",
    issuer: "Echelon Philippines 2026",
    period: "2026",
  },
  {
    title: "Consistent Honor Student",
    issuer: "Junior High & Senior High School",
    period: "Academic Record",
  },
];

export const CERTIFICATIONS_LIST: CertificationRecord[] = [
  {
    title: "AppBuilders PH Hackathon 2026 — 1st Runner-Up",
    issuer: "AppBuilders PH (Top 2 / 280+ Teams)",
    year: "2026",
    credentialUrl: "https://snapsort-ph.vercel.app/",
  },
  {
    title: "Developer Internship Certification",
    issuer: "Nexvision Innovations Inc.",
    year: "2026",
  },
  {
    title: "Trainee Internship Certification",
    issuer: "AP Global IT Solutions Inc.",
    year: "2023",
  },
  {
    title: "Microsoft Digital Literacy Completer",
    issuer: "TESDA Online Program",
    year: "Verified",
  },
  {
    title: "Legacy Responsive Web Design V8",
    issuer: "freeCodeCamp",
    year: "Verified",
  },
  {
    title: "Graphic Design Basics Completer",
    issuer: "Canva",
    year: "Verified",
  },
];
