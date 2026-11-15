"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Use mount animation for above-the-fold hero content instead of whileInView. */
  immediate?: boolean;
}

const SWISS_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reusable Swiss editorial fade-up container (16px -> 0) honoring reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  immediate = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay, ease: SWISS_EASE }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.45, delay, ease: SWISS_EASE }}
    >
      {children}
    </motion.div>
  );
}
