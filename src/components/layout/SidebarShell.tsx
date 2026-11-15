"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { LineSidebar } from "@/components/layout/LineSidebar";
import {
  getActiveNavIndex,
  PhtClock,
  SocialLinksRow,
  ThemeToggleButton,
} from "@/components/layout/NavUtilities";
import { useResumeModal } from "@/components/layout/ResumeModal";

const NAV_ITEMS = PROFILE.navigation.map((item) => ({
  index: item.index,
  label: item.label,
  href: item.href,
}));

/**
 * Fixed 260px Swiss left navigation rail for desktop viewports (>= 1024px).
 */
export function SidebarShell() {
  const pathname = usePathname();
  const activeIndex = getActiveNavIndex(pathname);
  const { openResume } = useResumeModal();

  return (
    <aside
      aria-label="Sidebar navigation"
      className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col justify-between border-r border-line bg-bg px-6 py-7 lg:flex"
    >
      {/* Top: Brand Identity */}
      <div className="border-b border-line pb-5">
        <Link
          href="/"
          className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
        >
          <span className="block text-lg font-medium tracking-tight text-fg transition-opacity group-hover:opacity-80">
            {PROFILE.name}
          </span>
          <span className="mt-0.5 block text-xs text-fg-muted">
            {PROFILE.shortRole}
          </span>
        </Link>
      </div>

      {/* Middle: Cursor-Proximity LineSidebar Navigation */}
      <div className="my-auto py-6">
        <LineSidebar
          items={NAV_ITEMS}
          activeIndex={activeIndex}
          accentColor="var(--fg)"
          textColor="var(--fg-subtle)"
          markerColor="var(--line)"
          markerLength={32}
          markerGap={10}
          maxShift={14}
          itemGap={16}
          fontSize={0.95}
          showIndex
          showMarker
        />
      </div>

      {/* Bottom: Status, Socials, Primary CTA, Resume, Theme & PHT Clock */}
      <div className="space-y-3 border-t border-line pt-5">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 bg-fg"
          />
          <span>{PROFILE.availabilityLabel}</span>
        </div>

        <SocialLinksRow />

        <Link
          href="/services#consultations"
          className="flex w-full items-center justify-between bg-invert-bg px-3.5 py-2.5 text-xs font-medium tracking-tight text-invert-fg transition-opacity hover:opacity-90"
        >
          <span>Book a consultation</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={openResume}
            className="inline-flex cursor-pointer items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted transition-colors hover:text-fg"
          >
            <span>Resume</span>
            <ArrowUpRight size={11} aria-hidden="true" />
          </button>

          <ThemeToggleButton />
        </div>

        <div className="flex items-center justify-between border-t border-line pt-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            MANILA
          </span>
          <PhtClock />
        </div>
      </div>
    </aside>
  );
}
