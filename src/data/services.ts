import type {
  ConsultationTier,
  ServiceOffering,
} from "@/types/portfolio";

/**
 * External Buy Me a Coffee link for Thesis & Capstone 3-hour review support.
 * Set NEXT_PUBLIC_BUYMEACOFFEE_URL in .env.local when ready; falls back gracefully in UI when unset.
 */
export const BUY_ME_A_COFFEE_CONFIG = {
  url: process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL?.trim() || null,
  label: "Buy Me a Coffee",
  recipientEmail: "markyisulat@gmail.com",
} as const;

export const CORE_SERVICES: ServiceOffering[] = [
  {
    id: "software-development",
    index: "01",
    title: "Software Development",
    headline: "Custom Web, Desktop & AI-Integrated Systems",
    shortTags: [
      "Custom Web & Desktop Systems",
      "AI Integration",
      "Booking & ERP Platforms",
    ],
    description:
      "End-to-end engineering from relational Supabase/PostgreSQL schemas and multi-role security policies to responsive, code-first interfaces built directly in React 19, Next.js, TypeScript, and Electron.",
    deliverables: [
      "Custom Web & Desktop Applications",
      "Local & Cloud AI Pipeline Integration",
      "Automated Booking, Dynamic CMS & ERP Systems",
      "Relational Data Modeling & Role-Based Security",
    ],
    proofs: [
      { label: "Snapsort", projectSlug: "snapsort" },
      { label: "SK Logistics", projectSlug: "sk-logistics" },
      { label: "Doze Beauty Lounge", projectSlug: "doze-beauty-lounge" },
    ],
  },
  {
    id: "multimedia-design",
    index: "02",
    title: "Multimedia Design",
    headline: "Brand Identity Systems, Publication Assets & Retail Apparel",
    shortTags: [
      "Brand Identity Systems",
      "Graphic Design & Pubmats",
      "Video Editing & Motion",
    ],
    description:
      "Visual systems shaped for real-world printing, social conversion, and brand cohesion—spanning logos, packaging, event pubmats, retail streetwear, and short-form promotional video.",
    deliverables: [
      "Logo & Complete Brand Identity Guidelines",
      "Retail Apparel & Merchandise Illustrations",
      "Product Packaging, Posters & Social Pubmats",
      "Short-Form Video Editing & Motion Graphics",
    ],
    proofs: [
      { label: "Hope for Angels", projectSlug: "hope-for-angels" },
      { label: "PureHubs Nutrition", projectSlug: "purehubs-nutrition" },
      { label: "ACCESS", projectSlug: "access-brand-identity" },
    ],
  },
  {
    id: "digital-marketing",
    index: "03",
    title: "Digital Marketing",
    headline: "Content Strategy, Email Creative & On-Ground Conversion",
    shortTags: [
      "Social Media Management",
      "Marketing Strategy",
      "Conversion & Ad Campaigns",
    ],
    description:
      "Practical campaign execution grounded in both digital conversion funnels and live face-to-face pop-up booth selling—removing messaging ambiguity so prospects understand the offer immediately.",
    deliverables: [
      "Social Media Management & Editorial Calendars",
      "Klaviyo Email Ads & Promotional Campaign Creative",
      "Conversion Funnel Audits & Messaging Hierarchy",
      "Event Coverage & Physical Pop-Up Campaign Support",
    ],
    proofs: [
      { label: "Off Grid Lifestyle PH", projectSlug: "off-grid-lifestyle-ph" },
      { label: "Bola Pickleball PH", projectSlug: "bola-pickleball-ph" },
      { label: "Franchising PH", projectSlug: "franchising-ph" },
    ],
  },
];

export const CONSULTATION_TIERS: ConsultationTier[] = [
  {
    id: "business",
    index: "01 / BUSINESS",
    kicker: "DISCOVERY & SCOPING",
    title: "Free Business Consultation",
    priceLabel: "FREE",
    durationLabel: "30 MIN DISCOVERY CALL",
    description:
      "Evaluate whether one of my software engineering, multimedia design, or digital marketing services fits your business goals, workflow bottlenecks, and delivery timeline.",
    highlights: [
      "Audit current manual bottlenecks or conversion friction",
      "Scope practical build vs. buy options and timeline estimates",
      "Leave with a clear technical or creative action plan",
    ],
  },
  {
    id: "speaking",
    index: "02 / SPEAKING",
    kicker: "TALKS & WORKSHOPS",
    title: "Free Speaking Events",
    priceLabel: "FREE",
    durationLabel: "KEYNOTE / PANEL / WORKSHOP",
    description:
      "Available pro-bono for university student orgs, charity initiatives, and community tech events covering full-stack software engineering, product-oriented development, UI/UX, and real-world marketing.",
    highlights: [
      "Practical talks on shipping full-stack & AI software as a student",
      "Code-first UI/UX engineering and hackathon pitching insights",
      "Bridging design, digital marketing, and modern web development",
    ],
  },
  {
    id: "thesis-capstone",
    index: "03 / THESIS & CAPSTONE",
    kicker: "DEEP-DIVE SYSTEM REVIEW",
    title: "Thesis & Capstone System Review",
    priceLabel: "BUY ME A COFFEE",
    durationLabel: "3-HOUR WORKING SESSION",
    description:
      "Focused 3-hour technical and UX review of your capstone or thesis project—helping student teams tighten architecture, database schemas, UI clarity, and defense readiness.",
    highlights: [
      "System architecture, ERD / database & API flow review",
      "Hands-on UI/UX polish to make complex features easy to demo",
      "Panel defense Q&A prep and critical bug-triage guidance",
    ],
    requiresCoffeeSupport: true,
  },
];
