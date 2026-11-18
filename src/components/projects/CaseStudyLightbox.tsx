"use client";

import { useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectMediaItem } from "@/types/portfolio";

export interface CaseStudyLightboxProps {
  images: ProjectMediaItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  projectTitle: string;
  hideDescription?: boolean;
}

/**
 * Interactive full-color Radix Dialog lightbox with keyboard arrow navigation and slide counter.
 */
export function CaseStudyLightbox({
  images,
  activeIndex,
  onClose,
  onSelectIndex,
  projectTitle,
  hideDescription = false,
}: CaseStudyLightboxProps) {
  const isOpen = activeIndex !== null && images[activeIndex] !== undefined;
  const total = images.length;

  useEffect(() => {
    if (!isOpen || activeIndex === null || total === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onSelectIndex((activeIndex - 1 + total) % total);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onSelectIndex((activeIndex + 1) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isOpen, onSelectIndex, total]);

  const currentImage =
    activeIndex !== null ? images[activeIndex] ?? null : null;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90" />
        <Dialog.Content className="fixed inset-3 z-50 flex flex-col border border-line bg-bg text-fg focus:outline-none md:inset-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-line bg-surface px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <Dialog.Title className="truncate text-sm font-medium tracking-tight text-fg">
                {projectTitle}
              </Dialog.Title>
              <Dialog.Description
                className={
                  hideDescription
                    ? "sr-only"
                    : "truncate font-mono text-xs uppercase tracking-wider text-fg-muted"
                }
              >
                {currentImage?.alt ?? "System screenshot preview"}
              </Dialog.Description>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {activeIndex !== null && (
                <span className="border border-line bg-bg px-2.5 py-1 font-mono text-xs tabular-nums text-fg">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              )}
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close lightbox"
                  className="inline-flex cursor-pointer items-center justify-center border border-line bg-bg p-1.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Full-Color Image Canvas */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-surface p-4 sm:p-8">
            {currentImage && (
              <div className="relative h-full w-full">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between gap-4 border-t border-line bg-bg px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => {
                if (activeIndex === null) return;
                onSelectIndex((activeIndex - 1 + total) % total);
              }}
              disabled={total <= 1}
              className="inline-flex cursor-pointer items-center gap-1.5 border border-line bg-bg px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} aria-hidden="true" />
              <span>Previous</span>
            </button>

            <span className="hidden font-mono text-xs uppercase tracking-wider text-fg-subtle sm:inline">
              ← / → NAVIGATE · ESC CLOSE
            </span>

            <button
              type="button"
              onClick={() => {
                if (activeIndex === null) return;
                onSelectIndex((activeIndex + 1) % total);
              }}
              disabled={total <= 1}
              className="inline-flex cursor-pointer items-center gap-1.5 border border-line bg-bg px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
