import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  PROJECTS,
  getAdjacentProjects,
  getProjectBySlug,
} from "@/data/projects";
import { TechIcon } from "@/components/ui/TechIcon";
import { CaseStudyGallerySection } from "@/components/projects/CaseStudyGallerySection";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      {/* Top Back Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <Link
          href={`/projects#${project.category}`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Projects</span>
        </Link>

        <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
          {project.index} / {project.categoryLabel} · {project.year}
        </span>
      </div>

      {/* Case Study Title Header */}
      <header className="mb-10 border-b border-line pb-8">
        {project.awardBadge && (
          <Reveal immediate>
            <p className="mb-4 inline-block border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fg">
              {project.awardBadge}
            </p>
          </Reveal>
        )}

        <MaskHeading as="h1" immediate className="text-display text-fg">
          {project.title}
        </MaskHeading>

        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-fg-muted">
            {project.summary}
          </p>
        </Reveal>
      </header>

      {/* Sticky 4 / 8 Editorial Split */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left 4 Columns: Sticky Spec Sheet */}
        <aside className="lg:sticky lg:top-8 lg:col-span-4 lg:self-start">
          <div className="divide-y divide-line border border-line bg-bg">
            <div className="bg-surface px-5 py-3">
              <p className="text-mono-label text-fg-subtle">
                SPECIFICATION SHEET
              </p>
            </div>

            <div className="p-5">
              <p className="text-mono-label mb-1.5 text-fg-subtle">ROLE</p>
              <p className="text-sm font-medium text-fg">{project.role}</p>
            </div>

            <div className="p-5">
              <p className="text-mono-label mb-1.5 text-fg-subtle">CATEGORY</p>
              <p className="text-sm text-fg-muted">{project.classification}</p>
            </div>

            <div className="p-5">
              <p className="text-mono-label mb-3 text-fg-subtle">STACK</p>
              <ul className="space-y-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 text-sm text-fg"
                  >
                    <TechIcon name={tech} />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5">
              <p className="text-mono-label mb-3 text-fg-subtle">
                IMPACT / METRICS
              </p>
              <ul className="space-y-2 text-sm text-fg-muted">
                {project.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1 w-1 shrink-0 bg-fg"
                    />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-col gap-2.5 p-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-invert-bg px-4 py-3 text-xs font-medium tracking-tight text-invert-fg transition-opacity hover:opacity-90"
                  >
                    <span>Live Site</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-line bg-bg px-4 py-3 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
                  >
                    <span>Source Repository</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Right 8 Columns: Narrative, Architecture, UX Touch, Video & Full-Color Gallery */}
        <div className="space-y-10 lg:col-span-8">
          <Reveal>
            <section aria-label="Problem and user context" className="space-y-3">
              <h2 className="text-mono-label text-fg-subtle">
                01 — PROBLEM &amp; USER CONTEXT
              </h2>
              <p className="max-w-[65ch] text-base leading-relaxed text-fg-muted">
                {project.problemContext}
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section
              aria-label="Architecture and key capabilities"
              className="space-y-4 border-t border-line pt-8"
            >
              <h2 className="text-mono-label text-fg-subtle">
                02 — ARCHITECTURE &amp; KEY CAPABILITIES
              </h2>
              <ul className="space-y-3">
                {project.architectureHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-relaxed text-fg-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block h-1 w-1 shrink-0 bg-fg"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section
              aria-label="The human and UX touch"
              className="border-t border-line pt-8"
            >
              <h2 className="text-mono-label mb-4 text-fg-subtle">
                03 — THE HUMAN &amp; UX TOUCH
              </h2>
              <div className="border border-line bg-surface p-6">
                <p className="max-w-[65ch] text-base leading-relaxed text-fg">
                  {project.humanUxTouch}
                </p>
              </div>
            </section>
          </Reveal>

          {/* Optional Full-Color Video Walkthrough (e.g. Snapsort demo.mp4) */}
          {project.videoUrl && (
            <Reveal>
              <section
                aria-label="Video walkthrough"
                className="border-t border-line pt-8"
              >
                <h2 className="text-mono-label mb-4 text-fg-subtle">
                  INTERACTIVE DEMO WALKTHROUGH (FULL COLOR)
                </h2>
                <div className="border border-line bg-surface p-2">
                  <video
                    src={project.videoUrl}
                    poster={project.coverImage}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full bg-bg"
                  >
                    Your browser does not support embedded video playback.
                  </video>
                </div>
              </section>
            </Reveal>
          )}

          {/* Optional Sub-Sections & Full-Color System Gallery + Radix Lightbox */}
          <CaseStudyGallerySection
            projectTitle={project.title}
            gallery={project.gallery}
            subSections={project.subSections}
          />
        </div>
      </div>

      {/* Bottom Previous / Next Navigation Bar */}
      <nav
        aria-label="Adjacent case studies"
        className="mt-16 grid grid-cols-1 border border-line bg-bg sm:grid-cols-2 sm:divide-x sm:divide-line"
      >
        <Link
          href={`/projects/${previous.slug}`}
          className="group flex flex-col justify-between gap-2 border-b border-line p-6 transition-colors hover:bg-surface sm:border-b-0"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-subtle group-hover:text-fg">
            <ArrowLeft size={13} aria-hidden="true" />
            <span>Previous Case Study</span>
          </span>
          <span className="text-h3 font-medium tracking-tight text-fg">
            {previous.title}
          </span>
        </Link>

        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col items-end justify-between gap-2 p-6 text-right transition-colors hover:bg-surface"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-subtle group-hover:text-fg">
            <span>Next Case Study</span>
            <ArrowRight size={13} aria-hidden="true" />
          </span>
          <span className="text-h3 font-medium tracking-tight text-fg">
            {next.title}
          </span>
        </Link>
      </nav>
    </div>
  );
}
