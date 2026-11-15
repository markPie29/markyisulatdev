import type { Metadata } from "next";
import { PROJECT_CATEGORIES, PROJECTS } from "@/data/projects";
import { ProjectsTabsView } from "@/components/projects/ProjectsTabsView";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "17 shipped software platforms, local AI desktop builds, campus systems, and multimedia brand identities crafted through a Design Engineer lens.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <header className="mb-10 border-b border-line pb-8">
        <Reveal immediate>
          <p className="text-mono-label mb-3 text-fg-subtle">
            02 / SELECTED WORK — 17 ARCHIVED BUILDS
          </p>
        </Reveal>
        <MaskHeading as="h1" immediate className="text-display text-fg">
          Projects &amp; Case Studies
        </MaskHeading>
        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-fg-muted">
            Production ERPs, client booking platforms, hackathon-winning local AI tools, and brand identity systems engineered around real human workflows.
          </p>
        </Reveal>
      </header>

      <ProjectsTabsView categories={PROJECT_CATEGORIES} projects={PROJECTS} />
    </div>
  );
}
