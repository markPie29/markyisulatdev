import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { UNFAIR_ADVANTAGES, STACK_CATEGORIES } from "@/data/stack";
import { TechIcon } from "@/components/ui/TechIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Stack & Capabilities",
  description:
    "Full-stack architecture, local AI desktop systems, production databases, cloud deployment, and visual brand engineering tools backed by shipped builds.",
};

export default function StackPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <header className="mb-12 border-b border-line pb-8">
        <Reveal immediate>
          <p className="text-mono-label mb-3 text-fg-subtle">
            04 / CAPABILITIES &amp; TECHNICAL STACK — PROOF-BACKED MATRIX
          </p>
        </Reveal>
        <MaskHeading as="h1" immediate className="text-display text-fg">
          Stack &amp; Capabilities
        </MaskHeading>
        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-fg-muted">
            Every tool below is tied to a shipped production system, verified
            client deployment, or competitive hackathon build—bridging brand
            craft, interface precision, and backend data integrity.
          </p>
        </Reveal>
      </header>

      {/* Part 1: Unfair Advantage 3-column grid */}
      <section className="mb-16" aria-label="Core engineering differentiation">
        <SectionHeader
          index="01"
          title="THE DESIGN ENGINEER EDGE"
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {UNFAIR_ADVANTAGES.map((pillar, idx) => (
            <Reveal key={pillar.index} delay={idx * 0.05} className="bg-bg p-6 sm:p-8">
              <p className="font-mono text-xs tracking-wider text-fg-subtle">
                {pillar.index}
              </p>
              <h3 className="text-h3 mt-3 text-fg">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Part 2: 5 Contextual 4/8 Tool Matrices */}
      <section aria-label="Technical stack categories">
        <SectionHeader
          index="02"
          title="CONTEXTUAL TOOL MATRIX"
          actionLabel="Explore 17 Projects"
          actionHref="/projects"
          className="mb-2"
        />

        <div className="divide-y divide-line border-b border-line">
          {STACK_CATEGORIES.map((category, idx) => (
            <div
              key={category.index}
              className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
            >
              {/* Left 4 cols: sticky category label & thesis */}
              <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
                <Reveal delay={idx * 0.03}>
                  <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                    CATEGORY {category.index}
                  </p>
                  <h3 className="text-h2 mt-2 text-fg">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                    {category.subtitle}
                  </p>
                </Reveal>
              </div>

              {/* Right 8 cols: tool rows with TechIcon + proof + Case Study link */}
              <div className="lg:col-span-8">
                <Reveal delay={0.04 + idx * 0.03}>
                  <ul className="divide-y divide-line border border-line bg-bg">
                    {category.tools.map((tool) => (
                      <li
                        key={`${category.index}-${tool.name}`}
                        className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2.5">
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-surface text-fg">
                              <TechIcon name={tool.name} size={14} />
                            </span>
                            <span className="text-sm font-medium text-fg sm:text-base">
                              {tool.name}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:pl-9">
                            {tool.proof}
                          </p>
                        </div>

                        {tool.projectSlug && (
                          <Link
                            href={`/projects/${tool.projectSlug}`}
                            className="inline-flex shrink-0 items-center gap-1 self-start border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:bg-invert-bg hover:text-invert-fg sm:self-center"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
          Need an architecture partner or system audit?
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 border border-line bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
          >
            <span>Client Reviews</span>
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
