"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { SiDiscord, SiFacebook, SiGithub } from "react-icons/si";
import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/portfolio";

const emptySubscribe = () => () => {};

/**
 * Returns true once hydrated on the client without triggering setState-in-effect warnings.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Resolves active sidebar navigation index (01-06) from the current pathname.
 */
export function getActiveNavIndex(pathname: string): number {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/projects")) return 1;
  if (pathname.startsWith("/experience")) return 2;
  if (pathname.startsWith("/stack")) return 3;
  if (pathname.startsWith("/testimonials")) return 4;
  if (pathname.startsWith("/services")) return 5;
  return 0;
}

/**
 * Formats live Asia/Manila time strictly on the client to remain compatible with Next.js 16 Cache Components.
 */
export function PhtClock({ className }: { className?: string }) {
  const [timeString, setTimeString] = useState<string>("--:-- PHT");

  useEffect(() => {
    const updateClock = () => {
      const formatted = new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      setTimeString(`${formatted} PHT`);
    };

    const initialTimer = window.setTimeout(updateClock, 0);
    const interval = window.setInterval(updateClock, 15000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-wider text-fg-subtle tabular-nums",
        className,
      )}
    >
      {timeString}
    </span>
  );
}

/**
 * Safe Dark/Light theme switcher backed by next-themes.
 */
export function ThemeToggleButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  const isDark = !isClient || resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 border border-line bg-bg px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted transition-colors hover:border-fg hover:text-fg",
        className,
      )}
    >
      {isClient ? (
        isDark ? (
          <>
            <Sun size={12} aria-hidden="true" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon size={12} aria-hidden="true" />
            <span>Dark</span>
          </>
        )
      ) : (
        <>
          <Sun size={12} aria-hidden="true" />
          <span>Mode</span>
        </>
      )}
    </button>
  );
}

function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function SocialGlyph({ id }: { id: SocialLink["id"] }) {
  switch (id) {
    case "github":
      return <SiGithub size={16} aria-hidden="true" />;
    case "linkedin":
      return <LinkedInMark />;
    case "facebook":
      return <SiFacebook size={16} aria-hidden="true" />;
    case "discord":
      return <SiDiscord size={16} aria-hidden="true" />;
  }
}

/**
 * Monochrome GH / LI / FB / DC icon-only social links strip without borders or text labels.
 */
export function SocialLinksRow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between py-1",
        className,
      )}
    >
      {PROFILE.socials.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className="inline-flex items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
        >
          <SocialGlyph id={social.id} />
        </a>
      ))}
    </div>
  );
}
