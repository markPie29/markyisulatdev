import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind utility classes cleanly without conflicting declarations.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
