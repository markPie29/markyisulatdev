"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, Trophy } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { ProjectCategoryId, ProjectItem } from "@/types/portfolio";

interface CategoryMeta {
  id: ProjectCategoryId;
  index: string;
  label: string;
  description?: string;
}

export interface ProjectsTabsViewProps {
  categories: CategoryMeta[];
  projects: ProjectItem[];
}

const VALID_TABS: readonly ProjectCategoryId[] = [
  "real-users",
  "passion",
  "multimedia",
];

const MAX_VISIBLE_STACK_ICONS = 6;

function parseHashTab(hash: string): ProjectCategoryId | null {
  const cleaned = hash.replace(/^#/, "") as ProjectCategoryId;
  return VALID_TABS.includes(cleaned) ? cleaned : null;
}

function formatAwardLabel(badge: string): string {
  return badge
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D\s]+/gu, "")
    .trim();
}

interface ProjectCardProps {
  project: ProjectItem;
  priority?: boolean;
}

function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const caseStudyHref = `/projects/${project.slug}`;
  const awardLabel = project.awardBadge
    ? formatAwardLabel(project.awardBadge)
    : null;
  const visibleStack = project.techStack.slice(0, MAX_VISIBLE_STACK_ICONS);
  const hiddenStack = project.techStack.slice(MAX_VISIBLE_STACK_ICONS);

  return (
    <article className="group border border-line bg-bg">
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5 sm:px-6">
        <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
          {project.index} / {project.categoryLabel}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-fg-muted">
          {project.classification} · {project.year}
        </span>
      </div>

      {/* 6 / 6 Horizontal Showcase Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 6 Columns: 16:9 Cover Image + Optional Top-Left Award Pill */}
        <div className="relative border-b border-line bg-surface lg:col-span-6 lg:border-r lg:border-b-0">
          <Link
            href={caseStudyHref}
            className="relative block aspect-video w-full overflow-hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg lg:h-full"
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} cover preview`}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top transition-all duration-400 ease-out max-md:grayscale-0 md:grayscale md:group-hover:scale-[1.02] md:group-hover:grayscale-0"
            />
          </Link>
          {awardLabel && (
            <div className="pointer-events-none absolute top-3 left-3 z-10 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 border border-line bg-bg/95 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-fg backdrop-blur-xs">
              <Trophy size={12} aria-hidden="true" className="shrink-0 text-fg" />
              <span className="truncate">{awardLabel}</span>
            </div>
          )}
        </div>

        {/* Right 6 Columns: Title, Role Subtitle, Short Description, Stack Logos & Action Button */}
        <div className="flex flex-col justify-between p-5 lg:col-span-6 lg:p-6">
          <div>
            <h2 className="text-[clamp(1.375rem,2vw,1.875rem)] font-medium leading-[1.15] tracking-tight text-fg">
              <Link
                href={caseStudyHref}
                className="hover:underline hover:underline-offset-4"
              >
                {project.title}
              </Link>
            </h2>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-fg-subtle">
              {project.role}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm leading-relaxed text-fg-muted">
              {project.shortDescription}
            </p>

            {/* Single-Row Bare Stack Logos (Icons Only + Hover Tooltips) */}
            <ul
              aria-label="Technology stack"
              className="flex flex-wrap items-center gap-4 border-t border-line pt-3"
            >
              {visibleStack.map((tech) => (
                <li
                  key={tech}
                  title={tech}
                  aria-label={tech}
                  className="inline-flex items-center text-fg-muted transition-colors hover:text-fg"
                >
                  <TechIcon name={tech} size={18} className="text-current" />
                </li>
              ))}
              {hiddenStack.length > 0 && (
                <li
                  title={hiddenStack.join(", ")}
                  aria-label={`Plus ${hiddenStack.length} more: ${hiddenStack.join(", ")}`}
                  className="font-mono text-xs text-fg-subtle"
                >
                  +{hiddenStack.length}
                </li>
              )}
            </ul>

            <div className="border-t border-line pt-3.5">
              <Link
                href={caseStudyHref}
                className="inline-flex items-center gap-2 bg-invert-bg px-4 py-2.5 text-xs font-medium tracking-tight text-invert-fg transition-opacity hover:opacity-90"
              >
                <span>View Case Study</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Interactive Radix category tabs and uniform 6/6 Swiss horizontal project showcases.
 */
export function ProjectsTabsView({
  categories,
  projects,
}: ProjectsTabsViewProps) {
  const [activeTab, setActiveTab] = useState<ProjectCategoryId>("real-users");

  useEffect(() => {
    const syncFromHash = () => {
      const next = parseHashTab(window.location.hash);
      if (next) {
        setActiveTab(next);
      }
    };

    const timer = window.setTimeout(syncFromHash, 0);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const handleTabChange = (value: string) => {
    const next = value as ProjectCategoryId;
    setActiveTab(next);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${next}`);
    }
  };

  return (
    <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
      <Tabs.List
        aria-label="Project categories"
        className="grid grid-cols-1 border border-line bg-bg sm:grid-cols-3 sm:divide-x sm:divide-line"
      >
        {categories.map((cat) => {
          const count = projects.filter((p) => p.category === cat.id).length;
          const isSelected = activeTab === cat.id;

          return (
            <Tabs.Trigger
              key={cat.id}
              value={cat.id}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 border-b border-line px-4 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg sm:border-b-0 sm:px-5",
                isSelected
                  ? "bg-invert-bg text-invert-fg"
                  : "bg-bg text-fg-muted hover:bg-surface hover:text-fg",
              )}
            >
              <div className="flex items-baseline gap-2.5">
                <span
                  className={cn(
                    "font-mono text-xs",
                    isSelected ? "text-invert-fg/75" : "text-fg-subtle",
                  )}
                >
                  {cat.index}
                </span>
                <span className="text-sm font-medium tracking-tight">
                  {cat.label}
                </span>
              </div>
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  isSelected ? "text-invert-fg/80" : "text-fg-subtle",
                )}
              >
                ({count})
              </span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {categories.map((cat) => {
        const categoryProjects = projects.filter((p) => p.category === cat.id);

        return (
          <Tabs.Content
            key={cat.id}
            value={cat.id}
            className="pt-8 focus:outline-none"
          >
            <div className="space-y-8">
              {categoryProjects.map((project, idx) => (
                <Reveal key={project.slug} delay={idx * 0.04}>
                  <ProjectCard
                    project={project}
                    priority={cat.id === "real-users" && idx < 2}
                  />
                </Reveal>
              ))}
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
