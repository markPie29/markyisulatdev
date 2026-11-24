"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Bike,
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
  PersonalGalleryCategoryId,
  ProjectMediaItem,
} from "@/types/portfolio";
import { CaseStudyLightbox } from "@/components/projects/CaseStudyLightbox";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface PersonalArchiveSectionProps {
  data: PersonalArchiveData;
}

type GalleryFilterId = "all" | PersonalGalleryCategoryId;

const GALLERY_FILTERS: { id: GalleryFilterId; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "tech-events", label: "TECH & EVENTS" },
  { id: "campus-varsity", label: "CAMPUS & VARSITY" },
  { id: "dj-off-duty", label: "DJ & OFF-DUTY" },
];

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
 * Standalone Personal Archive content: origin dossier, title-only interests,
 * creator channels, and a filterable full-color editorial Bento gallery at the bottom.
 */
export function PersonalArchiveSection({ data }: PersonalArchiveSectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryFilterId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<GalleryFilterId, number> = {
      all: data.gallery.length,
      "tech-events": 0,
      "campus-varsity": 0,
      "dj-off-duty": 0,
    };
    for (const item of data.gallery) {
      counts[item.category] += 1;
    }
    return counts;
  }, [data.gallery]);

  const filteredGallery = useMemo(() => {
    if (activeCategory === "all") return data.gallery;
    return data.gallery.filter((item) => item.category === activeCategory);
  }, [activeCategory, data.gallery]);

  const filteredLightboxImages: ProjectMediaItem[] = useMemo(
    () =>
      filteredGallery.map((item) => ({
        src: item.src,
        alt: item.alt,
      })),
    [filteredGallery],
  );

  const handleCategoryChange = (category: GalleryFilterId) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  };

  return (
    <div className="space-y-0">
      {/* ROW 1: Single Unified Card — Origin Intro on Left + Services-Style Radial Sheen & Giant Faded Icon on Right */}
      <Reveal immediate>
        <div className="relative overflow-hidden border border-line bg-bg">
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
      <Reveal delay={0.05}>
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

      {/* ROW 3 (BOTTOM): 03 // PERSONAL GALLERY — Editorial Bento Grid + Category Filter Tabs */}
      <Reveal delay={0.08}>
        <section
          aria-label="Personal photo gallery"
          className="border-x border-b border-line bg-bg"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
            <span className="font-mono text-xs uppercase tracking-wider text-fg-muted">
              03 // PERSONAL GALLERY
            </span>

            <div
              role="tablist"
              aria-label="Filter personal gallery by category"
              className="flex flex-wrap items-center gap-1.5"
            >
              {GALLERY_FILTERS.map((filter) => {
                const isActive = activeCategory === filter.id;
                const count = categoryCounts[filter.id];
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(filter.id)}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg",
                      isActive
                        ? "border-fg bg-invert-bg text-invert-fg"
                        : "border-line bg-bg text-fg-muted hover:border-fg hover:text-fg",
                    )}
                  >
                    <span>{filter.label}</span>
                    <span
                      className={cn(
                        "tabular-nums",
                        isActive ? "text-invert-fg/75" : "text-fg-subtle",
                      )}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-flow-dense grid-cols-2 gap-px bg-line md:grid-cols-3 lg:grid-cols-4">
            {filteredGallery.map((item, idx) => {
              const isLandscape = item.orientation === "landscape";
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Inspect photo ${item.index}`}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden bg-surface focus-visible:outline focus-visible:outline-1 focus-visible:outline-inset focus-visible:outline-fg",
                    isLandscape
                      ? "col-span-2 aspect-[8/5]"
                      : "col-span-1 aspect-[4/5]",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    draggable={false}
                    sizes={
                      isLandscape
                        ? "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                        : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    }
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>
              );
            })}
          </div>
        </section>
      </Reveal>

      <CaseStudyLightbox
        images={filteredLightboxImages}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
        projectTitle="07 // Personal Life"
        hideDescription
      />
    </div>
  );
}
