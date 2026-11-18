"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MaskHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "div" | "p";
  className?: string;
  delay?: number;
  immediate?: boolean;
}

const SWISS_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial line-mask slide-up heading primitive honoring reduced motion.
 */
export function MaskHeading({
  children,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
}: MaskHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={cn("overflow-hidden pb-[0.14em] -mb-[0.14em]", className)}>
      {immediate ? (
        <motion.span
          className="block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.5, delay, ease: SWISS_EASE }}
        >
          {children}
        </motion.span>
      ) : (
        <motion.span
          className="block"
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5, delay, ease: SWISS_EASE }}
        >
          {children}
        </motion.span>
      )}
    </Tag>
  );
}
