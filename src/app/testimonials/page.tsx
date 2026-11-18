import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Verified client feedback from studio founders, streetwear brand owners, and advocacy project collaborators backed by shipped case studies.",
};

export default function TestimonialsPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <header className="mb-12 border-b border-line pb-8">
        <Reveal immediate>
          <p className="text-mono-label mb-3 text-fg-subtle">
            06 / CLIENT TESTIMONIALS &amp; VERIFIED DELIVERY
          </p>
        </Reveal>
        <MaskHeading as="h1" immediate className="text-display text-fg">
          Testimonials
        </MaskHeading>
        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-fg-muted">
            Direct perspectives from business owners and project collaborators on
            shipping automated booking platforms, brand identities, and advocacy
            campaigns.
          </p>
        </Reveal>
      </header>

      <section aria-label="Client testimonials">
        <SectionHeader
          index="01"
          title="CLIENT PERSPECTIVES"
          actionLabel="Start a Project"
          actionHref="/services#booking"
          className="mb-2"
        />

        <div className="divide-y divide-line border-b border-line">
          {TESTIMONIALS.map((item, idx) => (
            <article
              key={item.id}
              className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-14"
            >
              {/* Left 7 columns: quote, attribution, delivered scope & CTA */}
              <div className="lg:col-span-7">
                <Reveal delay={idx * 0.05}>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                    <span className="font-mono text-xs tracking-wider text-fg-subtle">
                      {`${item.index} // VERIFIED CLIENT REVIEW`}
                    </span>
                    <span className="border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                      {item.serviceTag}
                    </span>
                  </div>

                  <Quote
                    size={22}
                    className="mb-4 text-fg-subtle"
                    aria-hidden="true"
                  />

                  <blockquote className="text-xl font-normal leading-relaxed tracking-tight text-fg sm:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="mt-6 border-t border-line pt-5">
                    <p className="text-base font-medium text-fg">{item.name}</p>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                      {item.roleOrContext} · {item.company}
                    </p>
                  </div>

                  <div className="mt-5 border border-line bg-surface p-4">
                    <p className="text-mono-label mb-1.5 text-fg-subtle">
                      Delivered Scope
                    </p>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {item.deliveredScope}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/projects/${item.projectSlug}`}
                      className="inline-flex items-center gap-2 border border-line bg-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:bg-invert-bg hover:text-invert-fg"
                    >
                      <span>View Case Study: {item.projectTitle}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right 5 columns: grayscale-to-color hover preview image */}
              <div className="lg:col-span-5">
                <Reveal delay={0.08 + idx * 0.05}>
                  <Link
                    href={`/projects/${item.projectSlug}`}
                    className="group block border border-line bg-surface transition-colors hover:border-fg"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                      <Image
                        src={item.previewImage}
                        alt={item.previewAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover grayscale transition-all duration-400 ease-out group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                      <span className="truncate font-mono text-xs text-fg-muted">
                        {item.projectTitle}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-wider text-fg">
                        <span>Inspect</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
          Built for real operations, measurable outcomes, and brand clarity
        </p>
        <Link
          href="/services#consultations"
          className="inline-flex items-center gap-1.5 bg-invert-bg px-4 py-2 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90"
        >
          <span>Book a consultation</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
