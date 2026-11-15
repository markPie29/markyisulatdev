import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ExperienceRole } from "@/types/portfolio";

export interface BrandLogoProps {
  role: Pick<
    ExperienceRole,
    "slug" | "company" | "logo" | "logoLight" | "invertOnLight"
  >;
  className?: string;
  decorative?: boolean;
}

/**
 * Renders monochrome company logos across both Dark and Light Swiss editorial themes.
 */
export function BrandLogo({
  role,
  className,
  decorative = true,
}: BrandLogoProps) {
  const alt = decorative ? "" : role.company;

  if (role.slug === "marked-media") {
    return (
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center text-fg",
          className,
        )}
        aria-hidden={decorative}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 465.23 579.7"
          fill="currentColor"
          className="h-full w-auto"
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : role.company}
        >
          <path d="M465.23,404.18l-134.56,175.52h-196.09L0,404.18,180.85,0h37.34v328.72c-29.02,6.59-50.67,32.56-50.67,63.56s21.65,56.95,50.67,63.54c4.66,1.06,9.52,1.63,14.5,1.63s9.73-.55,14.35-1.59c29.09-6.53,50.84-32.52,50.84-63.58s-21.75-57.07-50.84-63.6V0h37.34l180.84,404.18Z" />
        </svg>
      </span>
    );
  }

  if (role.slug === "nexvision-innovations") {
    return (
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center text-fg",
          className,
        )}
        aria-hidden={decorative}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-full w-full"
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : role.company}
        >
          <rect x="3" y="3" width="26" height="26" />
          <path d="M9 23V9l14 14V9" />
        </svg>
      </span>
    );
  }

  if (role.slug === "ap-global-it-solutions") {
    return (
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center text-fg",
          className,
        )}
        aria-hidden={decorative}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-full w-full"
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : role.company}
        >
          <rect x="3" y="3" width="26" height="26" />
          <circle cx="16" cy="16" r="7" />
          <line x1="9" y1="16" x2="23" y2="16" />
          <line x1="16" y1="9" x2="16" y2="23" />
        </svg>
      </span>
    );
  }

  if (role.logoLight) {
    return (
      <span
        className={cn(
          "inline-flex h-5 w-7 shrink-0 items-center justify-center",
          className,
        )}
        aria-hidden={decorative}
      >
        <Image
          src={role.logo}
          alt={alt}
          width={879}
          height={657}
          className="hidden h-full w-auto object-contain dark:block"
        />
        <Image
          src={role.logoLight}
          alt={alt}
          width={879}
          height={657}
          className="block h-full w-auto object-contain dark:hidden"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 shrink-0 items-center justify-center",
        className,
      )}
      aria-hidden={decorative}
    >
      <Image
        src={role.logo}
        alt={alt}
        width={256}
        height={248}
        className={cn(
          "h-full w-auto object-contain grayscale",
          role.invertOnLight && "invert dark:invert-0",
        )}
      />
    </span>
  );
}
