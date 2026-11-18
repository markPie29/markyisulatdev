"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Bike,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Disc3,
  Dumbbell,
  Film,
  Flame,
  Gamepad2,
  Sparkles,
  Trophy,
  Utensils,
  Video,
  type LucideIcon,
} from "lucide-react";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import type {
  CreatorChannelItem,
  PersonalArchiveData,
  ProjectMediaItem,
} from "@/types/portfolio";
import { CaseStudyLightbox } from "@/components/projects/CaseStudyLightbox";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface PersonalArchiveSectionProps {
  data: PersonalArchiveData;
}

const HOBBY_ICONS: Record<string, LucideIcon> = {
  dj: Disc3,
  volleyball: Trophy,
  gym: Dumbbell,
  gaming: Gamepad2,
  cooking: Utensils,
  content: Video,
  basketball: Flame,
  motorcycle: Bike,
  cafes: Coffee,
  movies: Film,
};

const AUTO_GLIDE_PX_PER_SEC = 34;

function ChannelIcon({ id }: { id: CreatorChannelItem["id"] }) {
  switch (id) {
    case "tiktok-personal":
    case "tiktok-studio":
      return <SiTiktok size={16} aria-hidden="true" />;
    case "youtube-dj":
      return <SiYoutube size={16} aria-hidden="true" />;
    case "instagram":
      return <SiInstagram size={16} aria-hidden="true" />;
  }
}

/**
 * Standalone Personal Archive content: full-color pure-photo filmstrip reel,
 * lean 2-sentence origin dossier, title-only interests, and channels.
 */
export function PersonalArchiveSection({ data }: PersonalArchiveSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const reelRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);

  const isHoveredRef = useRef(false);
  const isFocusWithinRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const manualPauseUntilRef = useRef(0);
  const didDragRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, scrollLeft: 0 });
  const glideRemainderRef = useRef(0);

  const [activeFrame, setActiveFrame] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDraggingUI, setIsDraggingUI] = useState(false);

  const totalFrames = data.gallery.length;

  const lightboxImages: ProjectMediaItem[] = useMemo(
    () =>
      data.gallery.map((item) => ({
        src: item.src,
        alt: item.alt,
      })),
    [data.gallery],
  );

  const getCardStep = useCallback(() => {
    const card = firstCardRef.current;
    if (!card) return 300;
    return card.offsetWidth;
  }, []);

  const syncActiveFrame = useCallback(() => {
    const el = reelRef.current;
    if (!el || totalFrames === 0) return;

    const step = getCardStep();
    if (step <= 0) return;

    const halfWidth = el.scrollWidth / 2;
    const normalizedScroll =
      halfWidth > 0 ? ((el.scrollLeft % halfWidth) + halfWidth) % halfWidth : el.scrollLeft;

    const idx = Math.round(normalizedScroll / step) % totalFrames;
    setActiveFrame((prev) => (prev === idx ? prev : idx));
  }, [getCardStep, totalFrames]);

  // Continuous smooth horizontal auto-glide across the doubled infinite reel
  useEffect(() => {
    if (prefersReducedMotion || lightboxIndex !== null || totalFrames === 0) {
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const el = reelRef.current;
      const paused =
        isHoveredRef.current ||
        isFocusWithinRef.current ||
        isDraggingRef.current ||
        isTouchingRef.current ||
        now < manualPauseUntilRef.current;

      if (el && !paused) {
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > el.clientWidth) {
          glideRemainderRef.current += dt * AUTO_GLIDE_PX_PER_SEC;
          if (glideRemainderRef.current >= 1) {
            const wholePx = Math.floor(glideRemainderRef.current);
            glideRemainderRef.current -= wholePx;
            el.scrollLeft += wholePx;

            if (el.scrollLeft >= halfWidth) {
              el.scrollLeft -= halfWidth;
            }
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [lightboxIndex, prefersReducedMotion, totalFrames]);

  // Mouse pointer drag-to-scroll handlers
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const el = reelRef.current;
      if (!el) return;

      const deltaX = event.clientX - dragOriginRef.current.x;
      if (Math.abs(deltaX) > 6) {
        didDragRef.current = true;
      }

      const halfWidth = el.scrollWidth / 2;
      let targetScroll = dragOriginRef.current.scrollLeft - deltaX;

      if (halfWidth > 0) {
        if (targetScroll < 0) {
          targetScroll += halfWidth;
          dragOriginRef.current.scrollLeft += halfWidth;
        } else if (targetScroll >= halfWidth) {
          targetScroll -= halfWidth;
          dragOriginRef.current.scrollLeft -= halfWidth;
        }
      }

      el.scrollLeft = targetScroll;
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDraggingUI(false);

      if (didDragRef.current) {
        window.setTimeout(() => {
          didDragRef.current = false;
        }, 80);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  const handleReelPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = reelRef.current;
    if (!el) return;

    didDragRef.current = false;
    isDraggingRef.current = true;
    setIsDraggingUI(true);
    dragOriginRef.current = {
      x: event.clientX,
      scrollLeft: el.scrollLeft,
    };
  };

  const stepReel = (direction: -1 | 1) => {
    const el = reelRef.current;
    if (!el) return;

    const step = getCardStep();
    const halfWidth = el.scrollWidth / 2;

    manualPauseUntilRef.current = performance.now() + 2600;

    if (direction === -1 && el.scrollLeft < step && halfWidth > 0) {
      el.scrollLeft += halfWidth;
    } else if (
      direction === 1 &&
      halfWidth > 0 &&
      el.scrollLeft >= halfWidth
    ) {
      el.scrollLeft -= halfWidth;
    }

    el.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const openFrameInLightbox = (index: number) => {
    if (didDragRef.current) return;
    setLightboxIndex(index % totalFrames);
  };

  const renderedSets = [0, 1] as const;

  return (
    <div className="space-y-0">
      {/* TOP BLOCK: Pure Full-Color Filmstrip Reel (Zero Card Text) */}
      <Reveal immediate>
        <div className="border border-line bg-bg">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
            <span className="font-mono text-xs uppercase tracking-wider text-fg-muted">
              {String(totalFrames).padStart(2, "0")} FRAMES
            </span>

            <div className="flex items-center gap-2">
              <span className="border border-line bg-bg px-2.5 py-1 font-mono text-xs tabular-nums text-fg">
                {String(activeFrame + 1).padStart(2, "0")} /{" "}
                {String(totalFrames).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => stepReel(-1)}
                aria-label="Previous personal photo"
                className="inline-flex cursor-pointer items-center justify-center border border-line bg-bg p-1.5 text-fg-muted transition-colors hover:border-fg hover:text-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
              >
                <ChevronLeft size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => stepReel(1)}
                aria-label="Next personal photo"
                className="inline-flex cursor-pointer items-center justify-center border border-line bg-bg p-1.5 text-fg-muted transition-colors hover:border-fg hover:text-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
              >
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={reelRef}
            role="region"
            aria-label="Personal photo gallery"
            onScroll={syncActiveFrame}
            onPointerDown={handleReelPointerDown}
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
            onFocusCapture={() => {
              isFocusWithinRef.current = true;
            }}
            onBlurCapture={() => {
              isFocusWithinRef.current = false;
            }}
            onTouchStart={() => {
              isTouchingRef.current = true;
            }}
            onTouchEnd={() => {
              isTouchingRef.current = false;
              manualPauseUntilRef.current = performance.now() + 2000;
            }}
            className={cn(
              "flex w-full overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              isDraggingUI ? "cursor-grabbing" : "cursor-grab",
            )}
          >
            {renderedSets.map((setIdx) => {
              const isDuplicate = setIdx === 1;
              return data.gallery.map((item, idx) => (
                <button
                  key={`${setIdx}-${item.index}`}
                  ref={setIdx === 0 && idx === 0 ? firstCardRef : undefined}
                  type="button"
                  tabIndex={isDuplicate ? -1 : 0}
                  aria-hidden={isDuplicate || undefined}
                  aria-label={isDuplicate ? undefined : `Inspect photo ${item.index}`}
                  onClick={() => openFrameInLightbox(idx)}
                  className="group relative aspect-[4/5] w-[260px] shrink-0 overflow-hidden border-r border-line bg-surface focus-visible:outline focus-visible:outline-1 focus-visible:outline-inset focus-visible:outline-fg sm:w-[300px] lg:w-[330px]"
                >
                  <Image
                    src={item.src}
                    alt={isDuplicate ? "" : item.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 330px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>
              ));
            })}
          </div>
        </div>
      </Reveal>

      {/* ROW 1: Single Unified Card — Origin Intro on Left + Services-Style Radial Sheen & Giant Faded Icon on Right */}
      <Reveal delay={0.05}>
        <div className="relative overflow-hidden border-x border-b border-line bg-bg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,color-mix(in_srgb,var(--fg)_7%,transparent),transparent_65%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-fg/35 [mask-image:linear-gradient(150deg,black_18%,rgba(0,0,0,0.32)_58%,transparent_94%)] md:block lg:right-8"
          >
            <Sparkles
              className="h-[148px] w-[148px] lg:h-[168px] lg:w-[168px]"
              strokeWidth={0.85}
            />
          </div>

          <div className="relative z-10 space-y-3 p-6 sm:p-8 lg:max-w-[72%] lg:p-10">
            {data.originParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={cn(
                  "max-w-[72ch] leading-relaxed",
                  idx === 0
                    ? "text-lg font-medium tracking-tight text-fg sm:text-xl"
                    : "text-base text-fg-muted",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ROW 2: 6 / 6 Split — Title-Only Off-Duty Interests (2x5) & Minimal Channels (2x2) */}
      <Reveal delay={0.08}>
        <div className="grid grid-cols-1 border-x border-b border-line lg:grid-cols-12">
          {/* Left 6 Cols: 01 // OFF-DUTY INTERESTS */}
          <div className="flex flex-col border-b border-line bg-bg lg:col-span-6 lg:border-r lg:border-b-0">
            <div className="border-b border-line bg-surface px-5 py-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
              01 // OFF-DUTY INTERESTS
            </div>

            <div className="grid flex-1 grid-cols-1 gap-px bg-line sm:grid-cols-2">
              {data.hobbies.map((hobby) => {
                const Icon = HOBBY_ICONS[hobby.id] ?? Disc3;
                return (
                  <div
                    key={hobby.id}
                    className="flex items-center justify-between gap-3 bg-bg px-4 py-3.5 transition-colors hover:bg-surface"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="font-mono text-[11px] text-fg-subtle">
                        {hobby.index}
                      </span>
                      <span className="truncate text-sm font-medium tracking-tight text-fg">
                        {hobby.title}
                      </span>
                    </div>
                    <Icon
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-fg-muted"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 6 Cols: 02 // CHANNELS */}
          <div className="flex flex-col bg-bg lg:col-span-6">
            <div className="border-b border-line bg-surface px-5 py-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
              02 // CHANNELS
            </div>

            <div className="grid flex-1 grid-cols-1 gap-px bg-line sm:grid-cols-2">
              {data.channels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between bg-bg p-5 transition-colors duration-200 hover:bg-invert-bg hover:text-invert-fg focus-visible:bg-invert-bg focus-visible:text-invert-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle transition-colors group-hover:text-invert-fg/70 group-focus-visible:text-invert-fg/70">
                        {channel.index} / {channel.platform}
                      </span>
                      <span className="text-fg-muted transition-colors group-hover:text-invert-fg group-focus-visible:text-invert-fg">
                        <ChannelIcon id={channel.id} />
                      </span>
                    </div>

                    <p className="mt-4 text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-invert-fg group-focus-visible:text-invert-fg">
                      {channel.handle}
                    </p>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-wider text-fg-muted transition-colors group-hover:border-invert-fg/20 group-hover:text-invert-fg group-focus-visible:border-invert-fg/20 group-focus-visible:text-invert-fg">
                    <div className="space-y-0.5 tabular-nums">
                      <p className="font-medium text-fg transition-colors group-hover:text-invert-fg group-focus-visible:text-invert-fg">
                        {channel.primaryStat}
                      </p>
                      <p className="text-fg-subtle transition-colors group-hover:text-invert-fg/75 group-focus-visible:text-invert-fg/75">
                        {channel.secondaryStat}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <CaseStudyLightbox
        images={lightboxImages}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
        projectTitle="07 // Personal Life"
        hideDescription
      />
    </div>
  );
}
