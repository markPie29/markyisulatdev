"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowUpRight, Trophy } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types/portfolio";

export interface FeaturedProjectsCarouselProps {
  projects: ProjectItem[];
}

type CarouselSlot = "center" | "left" | "right" | "hidden-left" | "hidden-right";

const AUTO_ADVANCE_MS = 2500;

function getCarouselSlot(
  index: number,
  activeIndex: number,
  total: number,
): CarouselSlot {
  const offset = (index - activeIndex + total) % total;
  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === total - 1) return "left";
  return offset <= total / 2 ? "hidden-right" : "hidden-left";
}

/**
 * Interactive Peek-a-Boo center-stage carousel for the homepage Featured Projects section.
 */
export function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const didDragRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const total = projects.length;
  const activeSlug = projects[activeIndex]?.slug;
  const isCenterCardHovered = Boolean(activeSlug && hoveredSlug === activeSlug);

  useEffect(() => {
    if (total <= 1 || prefersReducedMotion || isCenterCardHovered) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isCenterCardHovered, prefersReducedMotion, total]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      const normalized = ((nextIndex % total) + total) % total;
      setHoveredSlug(null);
      setActiveIndex(normalized);
    },
    [total],
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const handleStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handleDragStart = () => {
    didDragRef.current = false;
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 12) {
      didDragRef.current = true;
      window.setTimeout(() => {
        didDragRef.current = false;
      }, 80);
    }

    if (info.offset.x < -50) {
      goNext();
    } else if (info.offset.x > 50) {
      goPrev();
    }
  };

  if (total === 0) {
    return null;
  }

  const slotTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 28 };

  return (
    <div
      className="pt-4 outline-none"
      onKeyDown={handleStageKeyDown}
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      {/* Peek-a-Boo Stage */}
      <div className="relative overflow-hidden py-6 sm:py-10 md:[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        <div className="grid items-stretch justify-items-center">
          {projects.map((project, idx) => {
            const slot = getCarouselSlot(idx, activeIndex, total);
            const isCenter = slot === "center";
            const isHidden = slot === "hidden-left" || slot === "hidden-right";
            const isCenterHovered = isCenter && hoveredSlug === project.slug;
            const isSideHovered =
              !isCenter && !isHidden && hoveredSlug === project.slug;
            const bullets = project.homeBullets ?? [
              project.homeTagline ?? project.classification,
              project.metrics[0] ?? project.year,
            ];
            const indexLabel = String(idx + 1).padStart(2, "0");

            const slotAnimate =
              slot === "center"
                ? {
                    x: "0%",
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    zIndex: 20,
                  }
                : slot === "left"
                  ? {
                      x: "-92%",
                      scale: 0.84,
                      opacity: isSideHovered ? 0.32 : 0.15,
                      filter: isSideHovered ? "blur(0.5px)" : "blur(2px)",
                      zIndex: 10,
                    }
                  : slot === "right"
                    ? {
                        x: "92%",
                        scale: 0.84,
                        opacity: isSideHovered ? 0.32 : 0.15,
                        filter: isSideHovered ? "blur(0.5px)" : "blur(2px)",
                        zIndex: 10,
                      }
                    : slot === "hidden-left"
                      ? {
                          x: "-145%",
                          scale: 0.76,
                          opacity: 0,
                          filter: "blur(3px)",
                          zIndex: 0,
                        }
                      : {
                          x: "145%",
                          scale: 0.76,
                          opacity: 0,
                          filter: "blur(3px)",
                          zIndex: 0,
                        };

            const cardInner = (
              <article className="relative flex h-full flex-col justify-between border border-line bg-bg">
                {/* Inset Framed Thumbnail (Upper Half) */}
                <div className="p-4 pb-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface">
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} project cover`}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 390px"
                      className={cn(
                        "object-cover object-top transition-all duration-500 ease-out",
                        isCenter
                          ? cn(
                              "contrast-105 max-md:grayscale-0",
                              isCenterHovered
                                ? "md:scale-[1.03] md:grayscale-0"
                                : "md:grayscale",
                            )
                          : "grayscale",
                      )}
                    />
                  </div>
                </div>

                {/* Lower Typography, Bullet Highlights & Stack Logos */}
                <div className="flex flex-1 flex-col justify-between p-5 pt-4">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-fg-subtle">
                        {indexLabel}
                      </span>

                      <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted transition-colors group-hover/center:text-fg">
                        <span>{isCenter ? "Case Study" : "Focus"}</span>
                        <ArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover/center:translate-x-0.5 group-hover/center:-translate-y-0.5"
                        />
                      </span>
                    </div>

                    <h3 className="mt-3 h-[2.25em] text-h2 font-medium leading-[1.12] tracking-tight text-fg">
                      {project.homeTitle ?? project.title}
                    </h3>
                  </div>

                  <div>
                    {/* Hairline-Separated Bullet Points */}
                    <ul className="mt-4 space-y-2 border-t border-line py-3.5 font-mono text-xs uppercase tracking-wider text-fg-muted">
                      {bullets.map((bullet) => {
                        const isAward = bullet
                          .toUpperCase()
                          .includes("HACKATHON");

                        return (
                          <li
                            key={bullet}
                            className="flex items-center gap-2.5"
                          >
                            {isAward ? (
                              <Trophy
                                size={12}
                                aria-hidden="true"
                                className="shrink-0 text-fg"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="inline-block h-1 w-1 shrink-0 bg-fg-subtle"
                              />
                            )}
                            <span>{bullet}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Bare Standalone Stack Logos (Icons Only) */}
                    <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4">
                      {project.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          title={tech}
                          aria-label={tech}
                          className="inline-flex items-center text-fg-muted transition-colors group-hover/center:text-fg"
                        >
                          <TechIcon
                            name={tech}
                            size={18}
                            className="text-current"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );

            return (
              <motion.div
                key={project.slug}
                style={{ touchAction: "pan-y" }}
                initial={false}
                animate={slotAnimate}
                transition={slotTransition}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragStart={isCenter ? handleDragStart : undefined}
                onDragEnd={isCenter ? handleDragEnd : undefined}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className={cn(
                  "col-start-1 row-start-1 h-full w-full max-w-[390px]",
                  isCenter ? "group/center relative" : "relative select-none",
                  isHidden && "pointer-events-none",
                )}
              >
                {isCenter ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={(event) => {
                      if (didDragRef.current) {
                        event.preventDefault();
                      }
                    }}
                    className="block h-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    tabIndex={isHidden ? -1 : 0}
                    onClick={() => goTo(idx)}
                    aria-label={`Center ${project.title}`}
                    className="block h-full w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
                  >
                    {cardInner}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
