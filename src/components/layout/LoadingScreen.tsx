"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STORAGE_KEY = "marky_loaded_2k26";
const LOADER_DURATION_MS = 900;

/**
 * Once-per-session Swiss typographic loader overlay that never blocks SSR of page children.
 */
export function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures in restricted contexts.
    }
    setWiping(true);
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        return;
      }
    } catch {
      return;
    }

    if (prefersReducedMotion) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage failures.
      }
      return;
    }

    let cancelled = false;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (cancelled) return;
      if (startTime === null) {
        startTime = now;
        setVisible(true);
      }

      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / LOADER_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - ratio, 2);
      const nextValue = Math.round(eased * 100);
      setProgress(nextValue);

      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        try {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // Ignore storage failures.
        }
        timeoutRef.current = window.setTimeout(() => {
          if (!cancelled) {
            setWiping(true);
          }
        }, 180);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="swiss-loader"
        aria-label="Loading portfolio"
        role="status"
        initial={{ y: "0%" }}
        animate={wiping ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (wiping) {
            setVisible(false);
          }
        }}
        className="fixed inset-0 z-50 flex flex-col justify-between border-b border-line bg-bg p-6 md:p-10"
      >
        {/* Top bar: 000 -> 100 mono counter + skip affordance */}
        <div className="flex items-start justify-between border-b border-line pb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-2xl font-medium tracking-tight text-fg tabular-nums md:text-4xl">
              {String(progress).padStart(3, "0")}
            </span>
            <span className="text-mono-label text-fg-subtle">
              / 100 — INDEX
            </span>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="text-mono-label cursor-pointer border border-line px-3 py-1.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
          >
            Skip
          </button>
        </div>

        {/* Center masked reveal */}
        <div className="my-auto py-8">
          <p className="text-mono-label mb-3 text-fg-subtle">
            SWISS EDITORIAL PORTFOLIO · 2026
          </p>
          <div className="overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-display font-medium tracking-tight text-fg"
            >
              Marky Isulat — Full-Stack Developer
            </motion.p>
          </div>
        </div>

        {/* Bottom hairline progress bar */}
        <div className="space-y-3">
          <div className="h-px w-full bg-line">
            <div
              className="h-px bg-fg transition-[width] duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-mono-label text-fg-subtle">
            <span>SYSTEMS THAT HELP ACTUAL USERS</span>
            <span>ANTIPOLO · PHT</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
