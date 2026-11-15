"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PROFILE } from "@/data/profile";
import {
  getActiveNavIndex,
  PhtClock,
  SocialLinksRow,
  ThemeToggleButton,
} from "@/components/layout/NavUtilities";
import { useResumeModal } from "@/components/layout/ResumeModal";
import { cn } from "@/lib/utils";

/**
 * Fixed 56px Swiss top bar and full-screen typographic overlay menu for viewports < 1024px.
 */
export function MobileTopBar() {
  const pathname = usePathname();
  const activeIndex = getActiveNavIndex(pathname);
  const { openResume } = useResumeModal();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-bg px-4 sm:px-6 lg:hidden">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-baseline gap-2.5"
        >
          <span className="text-sm font-medium tracking-tight text-fg">
            {PROFILE.name}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-wider text-fg-subtle sm:inline">
            {PROFILE.shortRole}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-swiss-nav"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex cursor-pointer items-center gap-1.5 border border-line bg-bg px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg transition-colors hover:border-fg"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            {menuOpen ? (
              <X size={13} aria-hidden="true" />
            ) : (
              <Menu size={13} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-swiss-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 top-14 z-30 flex flex-col justify-between overflow-y-auto bg-bg px-4 py-6 sm:px-6 lg:hidden"
        >
          <nav aria-label="Mobile primary navigation" className="divide-y divide-line border-y border-line">
            {PROFILE.navigation.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-baseline justify-between py-4 transition-colors",
                    isActive
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                  )}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-fg-subtle">
                      {item.index}
                    </span>
                    <span className="text-2xl font-medium tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                    {isActive ? "ACTIVE" : "↗"}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-4 border-t border-line pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 bg-fg"
                />
                <span>{PROFILE.availabilityLabel}</span>
              </div>
              <PhtClock />
            </div>

            <SocialLinksRow />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Link
                href="/services#consultations"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between bg-invert-bg px-4 py-3 text-xs font-medium tracking-tight text-invert-fg"
              >
                <span>Book a consultation</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openResume();
                }}
                className="flex cursor-pointer items-center justify-between border border-line bg-bg px-4 py-3 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
              >
                <span>Resume PDF</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
