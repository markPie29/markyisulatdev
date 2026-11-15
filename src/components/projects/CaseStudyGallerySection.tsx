"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import { CaseStudyLightbox } from "@/components/projects/CaseStudyLightbox";
import type { ProjectMediaItem, ProjectSubSection } from "@/types/portfolio";

export interface CaseStudyGallerySectionProps {
  projectTitle: string;
  gallery: ProjectMediaItem[];
  subSections?: ProjectSubSection[];
}

/**
 * Renders full-color case study screenshot grids (plus optional subSections) wired to a Radix Lightbox.
 */
export function CaseStudyGallerySection({
  projectTitle,
  gallery,
  subSections,
}: CaseStudyGallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allLightboxImages = useMemo(() => {
    const map = new Map<string, ProjectMediaItem>();
    for (const item of gallery) {
      map.set(item.src, item);
    }
    if (subSections) {
      for (const section of subSections) {
        for (const item of section.gallery) {
          if (!map.has(item.src)) {
            map.set(item.src, item);
          }
        }
      }
    }
    return Array.from(map.values());
  }, [gallery, subSections]);

  const openBySrc = (src: string) => {
    const index = allLightboxImages.findIndex((item) => item.src === src);
    setActiveIndex(index >= 0 ? index : 0);
  };

  return (
    <>
      {/* Optional Sub-Sections (e.g. URSAC Hub Part A & Part B) */}
      {subSections && subSections.length > 0 && (
        <section aria-label="Module breakdowns" className="space-y-8 border-t border-line pt-8">
          <h2 className="text-mono-label text-fg-subtle">
            ECOSYSTEM BREAKDOWN — DUAL PLATFORM ARCHITECTURE
          </h2>
          <div className="space-y-8">
            {subSections.map((sub) => (
              <div
                key={sub.title}
                className="border border-line bg-bg p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <h3 className="text-h3 font-medium text-fg">
                      {sub.title}
                    </h3>
                    <p className="mt-1 text-sm text-fg-muted">{sub.subtitle}</p>
                  </div>
                  {sub.liveUrl && (
                    <a
                      href={sub.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
                    >
                      <span>Live</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {sub.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-1 text-xs text-fg-muted"
                    >
                      <TechIcon name={tech} />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                  {sub.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1 w-1 shrink-0 bg-fg-subtle"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {sub.gallery.map((media, idx) => (
                    <button
                      key={`${sub.title}-${media.src}`}
                      type="button"
                      onClick={() => openBySrc(media.src)}
                      aria-label={`Expand ${media.alt}`}
                      className="group relative aspect-video w-full cursor-pointer overflow-hidden border border-line bg-surface text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
                    >
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 35vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 border border-line bg-bg/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-fg opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 size={10} aria-hidden="true" />
                        <span>{String(idx + 1).padStart(2, "0")}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04 — SYSTEM GALLERY (Full-Color by default) */}
      <section aria-label="System gallery" className="border-t border-line pt-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-mono-label text-fg-subtle">
            04 — SYSTEM GALLERY (FULL COLOR)
          </h2>
          <span className="font-mono text-xs text-fg-subtle">
            CLICK ANY FRAME TO EXPAND ({gallery.length})
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {gallery.map((media, idx) => (
            <button
              key={media.src}
              type="button"
              onClick={() => openBySrc(media.src)}
              aria-label={`Expand ${media.alt}`}
              className="group relative aspect-video w-full cursor-pointer overflow-hidden border border-line bg-surface text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 size={11} aria-hidden="true" />
                <span>FRAME {String(idx + 1).padStart(2, "0")}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <CaseStudyLightbox
        images={allLightboxImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onSelectIndex={setActiveIndex}
        projectTitle={projectTitle}
      />
    </>
  );
}
