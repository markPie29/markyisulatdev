import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["display-xl", "display", "h2", "h3", "mono-label"],
        },
      ],
      "text-color": [
        {
          text: [
            "bg",
            "surface",
            "fg",
            "fg-muted",
            "fg-subtle",
            "line",
            "invert-bg",
            "invert-fg",
          ],
        },
      ],
    },
  },
});

/**
 * Combines Tailwind utility classes cleanly while preserving custom Swiss fluid typography
 * classes and semantic CSS color tokens.
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
