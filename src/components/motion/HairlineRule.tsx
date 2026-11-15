"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HairlineRuleProps {
  className?: string;
  delay?: number;
  immediate?: boolean;
}

const SWISS_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 1px structural hairline rule animating cleanly left-to-right via scaleX.
 */
export function HairlineRule({
  className,
  delay = 0,
  immediate = false,
}: HairlineRuleProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn("h-px w-full bg-line", className)}
      />
    );
  }

  if (immediate) {
    return (
      <motion.div
        aria-hidden="true"
        className={cn("h-px w-full origin-left bg-line", className)}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, delay, ease: SWISS_EASE }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px w-full origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.55, delay, ease: SWISS_EASE }}
    />
  );
}
