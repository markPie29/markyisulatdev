import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { getFeaturedHomeProjects } from "@/data/projects";
import { EXPERIENCE_ROLES } from "@/data/experience";
import { HOME_STACK_ROWS } from "@/data/stack";
import { TESTIMONIALS } from "@/data/testimonials";
import { CONSULTATION_TIERS, CORE_SERVICES } from "@/data/services";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { TechIcon } from "@/components/ui/TechIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResumeTriggerButton } from "@/components/ui/ResumeTriggerButton";
import { FeaturedProjectsCarousel } from "@/components/home/FeaturedProjectsCarousel";
import { HomeServicesGrid } from "@/components/home/HomeServicesGrid";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HairlineRule } from "@/components/motion/HairlineRule";

export default function HomePage() {
  const featuredProjects = getFeaturedHomeProjects();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      {/* 01 / HERO SECTION — 7 / 5 Asymmetric Split */}
      <section aria-label="Introduction" className="pb-16 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 border-b border-line pb-12 lg:grid-cols-12 lg:gap-10">
          {/* Left 7 Columns: Name, Positioning, Thesis & Actions */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="space-y-6">
              <Reveal immediate>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  <span>01 / OVERVIEW</span>
                  <span>·</span>
                  <span>{PROFILE.location}</span>
                </div>
              </Reveal>

              <div className="space-y-2">
                <MaskHeading
                  as="h1"
                  immediate
                  className="text-display-xl text-fg"
                >
                  {PROFILE.firstName}
                </MaskHeading>
                <MaskHeading
                  as="div"
                  immediate
                  delay={0.08}
                  className="text-display-xl text-fg"
                >
                  {PROFILE.lastName}
                </MaskHeading>
              </div>

              <Reveal immediate delay={0.14} className="space-y-4 pt-2">
                <p className="text-h3 font-medium text-fg">
                  {PROFILE.roleHeadline}
                </p>
                <blockquote className="max-w-[54ch] border-l border-line pl-4 text-base leading-relaxed text-fg-muted">
                  “{PROFILE.thesis}”
                </blockquote>
              </Reveal>
            </div>

            <Reveal immediate delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/services#consultations"
                className="inline-flex items-center gap-2 bg-invert-bg px-6 py-3 text-sm font-medium tracking-tight text-invert-fg transition-opacity hover:opacity-90"
              >
                <span>Book a consultation</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <ResumeTriggerButton label="Resume" />
            </Reveal>
          </div>

          {/* Right 5 Columns: Monochrome Portrait Cutout + 2-Column KPI Bar */}
          <Reveal immediate delay={0.12} className="lg:col-span-5">
            <div className="flex h-full flex-col border border-line bg-surface">
              <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-surface px-4 pt-6">
                <Image
                  src={PROFILE.assets.heroPortraitCutout}
                  alt="Marky Isulat monochrome portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-bottom grayscale contrast-105"
                />
              </div>

              <div className="grid grid-cols-2 divide-x divide-line border-t border-line bg-bg">
                {PROFILE.kpis.map((kpi) => (
                  <div key={kpi.label} className="p-4 sm:p-5">
                    <p className="text-h2 font-medium tracking-tight text-fg tabular-nums">
                      {kpi.value}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-fg-muted">
                      {kpi.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 / FEATURED PROJECTS (5 Flagship Software Builds Carousel) */}
      <section aria-label="Featured projects" className="pb-16 lg:pb-24">
        <SectionHeader
          index="02"
          title="FEATURED PROJECTS"
          actionLabel="View all projects"
          actionHref="/projects"
        />

        <FeaturedProjectsCarousel projects={featuredProjects} />
      </section>

      {/* 03 / EXPERIENCE (5-Row Hairline Ledger) */}
      <section aria-label="Experience ledger" className="pb-16 lg:pb-24">
        <SectionHeader
          index="03"
          title="EXPERIENCE"
          actionLabel="Full experience & credentials"
          actionHref="/experience"
        />

        <div className="divide-y divide-line border-b border-line">
          {EXPERIENCE_ROLES.map((role, idx) => (
            <Reveal key={role.slug} delay={idx * 0.05}>
              <Link
                href={`/experience#${role.slug}`}
                className="grid grid-cols-1 items-center gap-3 py-5 transition-colors hover:bg-surface/60 md:grid-cols-12 md:gap-6 md:px-3"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle md:col-span-3">
                  {role.period}
                </span>
                <span className="text-base font-medium tracking-tight text-fg md:col-span-5">
                  {role.role}
                </span>
                <span className="flex items-center gap-3 text-sm text-fg-muted md:col-span-4 md:justify-end">
                  <span>{role.company}</span>
                  <BrandLogo role={role} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 / STACK (4-Row Categorized Spec Table) */}
      <section aria-label="Core technology stack" className="pb-16 lg:pb-24">
        <SectionHeader
          index="04"
          title="STACK"
          actionLabel="Complete stack & capabilities"
          actionHref="/stack"
        />

        <div className="divide-y divide-line border-b border-line">
          {HOME_STACK_ROWS.map((row, idx) => (
            <Reveal key={row.index} delay={idx * 0.05}>
              <div className="grid grid-cols-1 items-start gap-4 py-5 md:grid-cols-12 md:gap-6 md:px-3">
                <div className="font-mono text-xs uppercase tracking-wider text-fg-subtle md:col-span-3">
                  {row.index} / {row.label}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 md:col-span-9">
                  {row.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 text-sm text-fg"
                    >
                      <TechIcon name={tool} />
                      <span>{tool}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 / SERVICES & CONSULTATIONS (3x2 Card Matrix) */}
      <section aria-label="Services and consultations" className="pb-16 lg:pb-24">
        <SectionHeader
          index="05"
          title="SERVICES & CONSULTATIONS"
          actionLabel="Explore services & book"
          actionHref="/services"
          className="mb-6"
        />

        <HomeServicesGrid
          services={CORE_SERVICES}
          consultations={CONSULTATION_TIERS}
        />
      </section>

      {/* 06 / TESTIMONIALS (3 Real Client Pull-Quotes) */}
      <section aria-label="Client testimonials" className="pb-16 lg:pb-20">
        <SectionHeader
          index="06"
          title="TESTIMONIALS"
          actionLabel="All client reviews"
          actionHref="/testimonials"
        />

        <div className="divide-y divide-line border-b border-line">
          {TESTIMONIALS.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.06}>
              <div className="grid grid-cols-1 gap-6 py-7 lg:grid-cols-12 lg:gap-10 lg:px-3">
                <blockquote className="text-base leading-relaxed text-fg lg:col-span-8">
                  “{item.quote}”
                </blockquote>
                <div className="flex flex-col justify-center space-y-1 lg:col-span-4 lg:border-l lg:border-line lg:pl-6">
                  <p className="text-sm font-medium text-fg">{item.name}</p>
                  <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                    {item.company} · {item.serviceTag}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CLOSING CTA FOOTER */}
      <footer aria-label="Closing call to action" className="pt-4">
        <HairlineRule className="mb-10" />
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border border-line bg-surface p-6 sm:p-10">
            <div className="space-y-3">
              <MaskHeading as="h2" className="text-display text-fg">
                Let’s work together.
              </MaskHeading>
              <p className="max-w-[58ch] text-base text-fg-muted">
                Have a software build, brand campaign, speaking invite, or capstone system to review?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services#consultations"
                className="inline-flex items-center gap-2 bg-invert-bg px-6 py-3 text-sm font-medium tracking-tight text-invert-fg transition-opacity hover:opacity-90"
              >
                <span>Book a consultation</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${PROFILE.email}`}
                className="border border-line bg-bg px-5 py-3 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
              >
                {PROFILE.email}
              </a>
              <ResumeTriggerButton label="Resume" />
            </div>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
