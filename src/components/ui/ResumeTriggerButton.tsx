"use client";

import { ArrowUpRight } from "lucide-react";
import { useResumeModal } from "@/components/layout/ResumeModal";
import { cn } from "@/lib/utils";

export interface ResumeTriggerButtonProps {
  label?: string;
  className?: string;
}

/**
 * Client trigger button opening the global Swiss PDF Resume modal from Server Component pages.
 */
export function ResumeTriggerButton({
  label = "Resume",
  className,
}: ResumeTriggerButtonProps) {
  const { openResume } = useResumeModal();

  return (
    <button
      type="button"
      onClick={openResume}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 border border-line bg-bg px-5 py-3 text-sm font-medium tracking-tight text-fg transition-colors hover:border-fg hover:bg-surface",
        className,
      )}
    >
      <span>{label}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </button>
  );
}
