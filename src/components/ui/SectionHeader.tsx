import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  index: string;
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

/**
 * Swiss editorial section heading bar with hairline bottom rule and optional right action link.
 */
export function SectionHeader({
  index,
  title,
  actionLabel,
  actionHref,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4",
        className,
      )}
    >
      <h2 className="text-mono-label text-fg-muted">
        {index} — {title}
      </h2>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-muted transition-colors hover:text-fg"
        >
          <span>{actionLabel}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
