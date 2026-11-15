"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { ProjectCategoryId, ProjectItem } from "@/types/portfolio";

interface CategoryMeta {
  id: ProjectCategoryId;
  index: string;
  label: string;
  description: string;
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

function parseHashTab(hash: string): ProjectCategoryId | null {
  const cleaned = hash.replace(/^#/, "") as ProjectCategoryId;
  return VALID_TABS.includes(cleaned) ? cleaned : null;
}

/**
 * Interactive Radix category tabs and 7/5 Swiss editorial project showcases.
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
            <p className="mb-8 max-w-[65ch] text-sm leading-relaxed text-fg-muted">
              {cat.description}
            </p>

            <div className="space-y-12">
              {categoryProjects.map((project, idx) => (
                <Reveal key={project.slug} delay={idx * 0.04}>
                  <article className="group border border-line bg-bg">
                    {/* Top Metadata Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                        {project.index} / {project.categoryLabel}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                        {project.classification} · {project.year}
                      </span>
                    </div>

                    {/* 7 / 5 Editorial Showcase Spread */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Left 7 Columns: 16:9 Grayscale -> Color Cover */}
                      <div className="flex flex-col border-b border-line bg-surface lg:col-span-7 lg:border-r lg:border-b-0">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="relative block aspect-video w-full overflow-hidden"
                        >
                          <Image
                            src={project.coverImage}
                            alt={`${project.title} cover preview`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover object-top grayscale transition-all duration-400 ease-out group-hover:grayscale-0"
                          />
                        </Link>
                        {project.awardBadge && (
                          <div className="border-t border-line bg-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-fg sm:px-6">
                            {project.awardBadge}
                          </div>
                        )}
                      </div>

                      {/* Right 5 Columns: Narrative + UX Touch + Stack + Actions */}
                      <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-5">
                        <div className="space-y-5">
                          <div>
                            <h2 className="text-h2 font-medium tracking-tight text-fg">
                              <Link
                                href={`/projects/${project.slug}`}
                                className="hover:underline hover:underline-offset-4"
                              >
                                {project.title}
                              </Link>
                            </h2>
                            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                              {project.role}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-mono-label text-fg-subtle">
                              Problem &amp; Context
                            </p>
                            <p className="text-sm leading-relaxed text-fg-muted">
                              {project.problemContext}
                            </p>
                          </div>

                          <div className="border-l border-line pl-3.5 space-y-1.5">
                            <p className="text-mono-label text-fg-subtle">
                              The Human &amp; UX Touch
                            </p>
                            <p className="text-sm leading-relaxed text-fg">
                              {project.humanUxTouch}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 text-xs text-fg-muted"
                              >
                                <TechIcon name={tech} />
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-2 bg-invert-bg px-4 py-2.5 text-xs font-medium tracking-tight text-invert-fg transition-opacity hover:opacity-90"
                          >
                            <span>Read Case Study</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border border-line bg-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
                            >
                              <span>Live</span>
                              <ArrowUpRight size={13} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
