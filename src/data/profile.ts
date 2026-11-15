import type { ProfileData } from "@/types/portfolio";

export const PROFILE: ProfileData = {
  name: "Marky Isulat",
  firstName: "Marky",
  lastName: "Isulat",
  fullName: "Mark Angelo A. Isulat",
  shortRole: "Design Engineer",
  roleHeadline: "Design Engineer & Full-Stack Developer.",
  thesis: "I don't just build systems; I build systems that help actual users.",
  bio: [
    "1st Runner-Up (Top 2 out of 280+ submissions) at AppBuilders PH Hackathon 2026, DOST-SEI S&T Undergraduate Scholar (R.A. 7687), and Product-Minded Full-Stack Developer building enterprise logistics ERPs, automated booking platforms, e-commerce storefronts, and local AI desktop applications.",
    "Started coding at 16 and entered visual design at 18. Today, as a 4th-year BS Computer Engineering student at URS Antipolo, I bridge code-first UI engineering, UX architecture, and real-world digital and physical marketing.",
  ],
  location: "Antipolo City, Philippines",
  email: "markyisulat@gmail.com",
  phone: "0948-679-3481",
  website: "https://markyisulat.dev",
  availabilityLabel: "Available for work",
  assets: {
    heroPortraitCutout: "/assets/personal/hero-portrait-cutout-bw.png",
    heroPortraitRaw: "/assets/personal/hero-portrait-raw.png",
    aboutHeroPhoto: "/assets/personal/about-me-hero.jpg",
    aboutTransitionVideo: "/assets/personal/about-me-transition.mp4",
    avatar: "/assets/personal/avatar.png",
    markSvg: "/assets/personal/main-icon.svg",
    gallery: Array.from(
      { length: 11 },
      (_, idx) => `/assets/personal/gallery/${String(idx + 1).padStart(2, "0")}.jpg`,
    ),
  },
  resume: {
    title: "Mark Angelo A. Isulat — Developer Resume",
    pdfPath: "/resumes/Mark_Isulat_Developer_Resume.pdf",
    markdownPath: "/resumes/Mark_Isulat_Developer_Resume.md",
    updatedYear: "2026",
  },
  kpis: [
    { value: "4yrs+", label: "shipping" },
    { value: "20+", label: "clients" },
  ],
  socials: [
    {
      id: "github",
      code: "GH",
      label: "GitHub",
      url: "https://github.com/markPie29",
    },
    {
      id: "linkedin",
      code: "LI",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mark-angelo-isulat-1954a2335/",
    },
    {
      id: "facebook",
      code: "FB",
      label: "Facebook",
      url: "https://facebook.com/markPie29",
    },
    {
      id: "discord",
      code: "DC",
      label: "Discord",
      url: "https://discordapp.com/users/399221201383325706",
    },
  ],
  navigation: [
    { index: "01", label: "Overview", href: "/" },
    { index: "02", label: "Projects", href: "/projects" },
    { index: "03", label: "Experience", href: "/experience" },
    { index: "04", label: "Stack", href: "/stack" },
    { index: "05", label: "Testimonials", href: "/testimonials" },
    { index: "06", label: "Services", href: "/services" },
  ],
};
