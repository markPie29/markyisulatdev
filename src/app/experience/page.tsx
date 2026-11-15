import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Award, BadgeCheck } from "lucide-react";
import {
  EXPERIENCE_ROLES,
  EDUCATION_RECORD,
  HONORS_LIST,
  CERTIFICATIONS_LIST,
} from "@/data/experience";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { TechIcon } from "@/components/ui/TechIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Experience & Credentials",
  description:
    "Shipping enterprise logistics ERPs, automated booking platforms, Next.js storefronts, and brand/marketing systems from 2023 to present.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <header className="mb-12 border-b border-line pb-8">
        <Reveal immediate>
          <p className="text-mono-label mb-3 text-fg-subtle">
            03 / EXPERIENCE &amp; CREDENTIALS — 2023 TO PRESENT
          </p>
        </Reveal>
        <MaskHeading as="h1" immediate className="text-display text-fg">
          Experience &amp; Credentials
        </MaskHeading>
        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-fg-muted">
            Engineering real-world operations systems, high-converting web
            platforms, and cohesive brand identities across client studio builds,
            enterprise engineering internships, and project-based brand and
            marketing engagements.
          </p>
        </Reveal>
      </header>

      {/* Part 1: Experience Roles 4/8 Split */}
      <section aria-label="Work experience timeline">
        <SectionHeader
          index="01"
          title="CAREER LEDGER"
          actionLabel="View Case Studies"
          actionHref="/projects"
          className="mb-2"
        />

        <div className="divide-y divide-line border-b border-line">
          {EXPERIENCE_ROLES.map((role, idx) => (
            <article
              key={role.slug}
              id={role.slug}
              className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
            >
              {/* Left 4 columns: sticky role spec */}
              <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
                <Reveal delay={idx * 0.03}>
                  <div className="mb-4 flex items-center justify-between gap-4 border-b border-line pb-3">
                    <span className="font-mono text-xs tracking-wider text-fg-subtle">
                      {`${role.index} // ${role.period}`}
                    </span>
                    <span className="border border-line bg-surface px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                      {role.workMode}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-surface p-2">
                      <BrandLogo role={role} className="h-5 w-auto max-w-full" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-h3 text-fg">{role.company}</h2>
                        {role.website && (
                          <a
                            href={role.website}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-subtle transition-colors hover:text-fg"
                            aria-label={`Visit ${role.company} website`}
                          >
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <p className="font-mono text-xs text-fg-subtle">
                        {role.location}
                      </p>
                    </div>
                  </div>

                  <p className="mb-5 text-base font-medium text-fg">
                    {role.role}
                  </p>

                  <div>
                    <p className="text-mono-label mb-2.5 text-fg-subtle">
                      Core Stack
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {role.stack.map((tech) => (
                        <li
                          key={tech}
                          className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted"
                        >
                          <TechIcon name={tech} size={13} />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Right 8 columns: overview, achievements & human impact */}
              <div className="space-y-6 lg:col-span-8">
                <Reveal delay={0.05 + idx * 0.03}>
                  <p className="text-base leading-relaxed text-fg-muted">
                    {role.overview}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-mono-label mb-3 text-fg-subtle">
                      Key Outcomes &amp; Shipped Scope
                    </h3>
                    <ul className="space-y-3 border-t border-line pt-4">
                      {role.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted sm:text-base"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 bg-fg-subtle"
                            aria-hidden="true"
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="mt-6 border border-line border-l-2 border-l-fg bg-surface p-5">
                    <p className="text-mono-label mb-2 text-fg-subtle">
                      THE HUMAN &amp; USER IMPACT (ENGINEER&apos;S LENS)
                    </p>
                    <p className="text-sm leading-relaxed text-fg sm:text-base">
                      {role.humanImpact}
                    </p>
                  </blockquote>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Part 2: Credentials Ledger 6/6 Split */}
      <section className="mt-16" aria-label="Education, honors, and certifications">
        <SectionHeader
          index="02"
          title="EDUCATION, HONORS & VERIFIED CERTIFICATIONS"
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 6 columns: Education & Honors */}
          <div className="space-y-8 lg:col-span-6">
            <Reveal>
              <div className="border border-line bg-surface p-6">
                <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  <GraduationCap size={14} aria-hidden="true" />
                  <span>Education</span>
                </div>
                <h3 className="text-h3 text-fg">{EDUCATION_RECORD.degree}</h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {EDUCATION_RECORD.institution}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 font-mono text-xs text-fg-subtle">
                  <span>{EDUCATION_RECORD.period}</span>
                  <span className="border border-line bg-bg px-2.5 py-1 text-fg-muted">
                    {EDUCATION_RECORD.scholarship}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="border border-line bg-bg">
                <div className="flex items-center gap-2 border-b border-line bg-surface px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  <Award size={14} aria-hidden="true" />
                  <span>Honors &amp; Competitive Recognition</span>
                </div>
                <ul className="divide-y divide-line">
                  {HONORS_LIST.map((honor) => (
                    <li key={`${honor.title}-${honor.period}`} className="px-6 py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-sm font-medium text-fg sm:text-base">
                          {honor.title}
                        </h4>
                        <span className="font-mono text-xs text-fg-subtle">
                          {honor.period}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-fg-muted">
                        {honor.issuer}
                        {honor.note ? ` — ${honor.note}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right 6 columns: Verified Certifications */}
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <div className="border border-line bg-bg">
                <div className="flex items-center justify-between border-b border-line bg-surface px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={14} aria-hidden="true" />
                    <span>Verified Certifications</span>
                  </span>
                  <span>{CERTIFICATIONS_LIST.length} CREDENTIALS</span>
                </div>
                <ul className="divide-y divide-line">
                  {CERTIFICATIONS_LIST.map((cert) => (
                    <li
                      key={`${cert.title}-${cert.issuer}`}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-fg sm:text-base">
                          {cert.title}
                        </h4>
                        <p className="mt-1 font-mono text-xs text-fg-subtle">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:bg-invert-bg hover:text-invert-fg"
                        >
                          <span>Verify</span>
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom Next Action Bar */}
      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
          Ready to translate systems thinking into shipped product
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/stack"
            className="inline-flex items-center gap-1.5 border border-line bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
          >
            <span>Explore Stack</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <Link
            href="/services#consultations"
            className="inline-flex items-center gap-1.5 bg-invert-bg px-4 py-2 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90"
          >
            <span>Book a consultation</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
