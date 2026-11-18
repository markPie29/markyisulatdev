export type ProjectCategoryId = "real-users" | "passion" | "multimedia";

export type ConsultationTierId = "business" | "speaking" | "thesis-capstone";

export type ServiceId =
  | "software-development"
  | "multimedia-design"
  | "digital-marketing";

export interface NavItem {
  index: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: "github" | "linkedin" | "facebook" | "discord";
  code: "GH" | "LI" | "FB" | "DC";
  label: string;
  url: string;
}

export interface KpiMetric {
  value: string;
  label: string;
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  shortRole: string;
  roleHeadline: string;
  thesis: string;
  bio: string[];
  location: string;
  email: string;
  phone: string;
  website: string;
  availabilityLabel: string;
  assets: {
    heroPortraitCutout: string;
    heroPortraitRaw: string;
    aboutHeroPhoto: string;
    aboutTransitionVideo: string;
    avatar: string;
    markSvg: string;
    gallery: string[];
  };
  resume: {
    title: string;
    pdfPath: string;
    markdownPath: string;
    updatedYear: string;
  };
  kpis: KpiMetric[];
  socials: SocialLink[];
  navigation: NavItem[];
}

export interface ProjectMediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectSubSection {
  title: string;
  subtitle: string;
  techStack: string[];
  highlights: string[];
  gallery: ProjectMediaItem[];
  liveUrl?: string;
}

export interface ProjectItem {
  slug: string;
  index: string;
  title: string;
  category: ProjectCategoryId;
  categoryLabel: string;
  classification: string;
  year: string;
  role: string;
  awardBadge?: string;
  summary: string;
  problemContext: string;
  architectureHighlights: string[];
  humanUxTouch: string;
  techStack: string[];
  metrics: string[];
  coverImage: string;
  gallery: ProjectMediaItem[];
  videoUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featuredOnHome?: boolean;
  homeOrder?: number;
  homeTitle?: string;
  homeTagline?: string;
  homeBullets?: [string, string];
  subSections?: ProjectSubSection[];
}

export interface ExperienceRole {
  slug: string;
  index: string;
  period: string;
  role: string;
  company: string;
  workMode: string;
  location: string;
  website?: string;
  logo: string;
  /** Optional alternate bitmap logo for Light Mode when SVG currentColor is not used. */
  logoLight?: string;
  /** True when the monochrome bitmap is light-ink and should invert on Light Mode. */
  invertOnLight?: boolean;
  overview: string;
  achievements: string[];
  humanImpact: string;
  stack: string[];
}

export interface EducationRecord {
  degree: string;
  institution: string;
  period: string;
  scholarship: string;
}

export interface HonorRecord {
  title: string;
  issuer: string;
  period: string;
  note?: string;
}

export interface CertificationRecord {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface UnfairAdvantagePillar {
  index: string;
  title: string;
  description: string;
}

export interface StackToolItem {
  name: string;
  proof: string;
  projectSlug?: string;
}

export interface StackCategory {
  index: string;
  title: string;
  subtitle: string;
  tools: StackToolItem[];
}

export interface HomeStackRow {
  index: string;
  label: string;
  tools: string[];
}

export interface TestimonialItem {
  id: string;
  index: string;
  name: string;
  company: string;
  roleOrContext: string;
  serviceTag: string;
  quote: string;
  projectSlug: string;
  projectTitle: string;
  deliveredScope: string;
  previewImage: string;
  previewAlt: string;
}

export interface ServiceProofLink {
  label: string;
  projectSlug: string;
}

export interface ServiceOffering {
  id: ServiceId;
  index: string;
  title: string;
  headline: string;
  shortTags: string[];
  homeBullets: [string, string, string];
  description: string;
  deliverables: string[];
  proofs: ServiceProofLink[];
}

export interface ConsultationTier {
  id: ConsultationTierId;
  index: string;
  kicker: string;
  title: string;
  priceLabel: string;
  durationLabel: string;
  shortDurationLabel: string;
  description: string;
  highlights: string[];
  homeBullets: [string, string, string];
  requiresCoffeeSupport?: boolean;
}
