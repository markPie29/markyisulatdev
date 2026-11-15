"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";

type Falloff = "linear" | "smooth" | "sharp";

export interface LineSidebarItem {
  label: string;
  href?: string;
  index?: string;
}

export interface LineSidebarProps {
  items: (string | LineSidebarItem)[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  activeIndex?: number | null;
  defaultActive?: number | null;
  onItemClick?: (index: number, item: LineSidebarItem) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

function normalizeItem(
  item: string | LineSidebarItem,
  idx: number,
): LineSidebarItem {
  if (typeof item === "string") {
    return { label: item, index: String(idx + 1).padStart(2, "0") };
  }
  return {
    label: item.label,
    href: item.href,
    index: item.index ?? String(idx + 1).padStart(2, "0"),
  };
}

/**
 * Monochrome cursor-proximity numbered navigation list adapted for Next.js App Router links and React 19.
 */
export function LineSidebar({
  items,
  accentColor = "var(--fg)",
  textColor = "var(--fg-subtle)",
  markerColor = "var(--line)",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 18,
  falloff = "smooth",
  markerLength = 36,
  markerGap = 10,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 16,
  fontSize = 0.95,
  smoothing = 100,
  activeIndex: controlledActiveIndex,
  defaultActive = null,
  onItemClick,
  className = "",
}: LineSidebarProps) {
  const prefersReducedMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [internalActive, setInternalActive] = useState<number | null>(
    defaultActive,
  );

  const resolvedActive =
    controlledActiveIndex !== undefined ? controlledActiveIndex : internalActive;

  const activeRef = useRef<number | null>(resolvedActive);
  const smoothingRef = useRef(smoothing);
  const runFrameRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    runFrameRef.current = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const tau = Math.max(smoothingRef.current, 1) / 1000;
      const k = 1 - Math.exp(-dt / tau);

      let moving = false;
      const elements = itemRefs.current;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el) continue;
        const target = Math.max(
          targetsRef.current[i] || 0,
          activeRef.current === i ? 1 : 0,
        );
        const cur = currentRef.current[i] || 0;
        const next = cur + (target - cur) * k;
        const settled = Math.abs(target - next) < 0.0015;
        const value = settled ? target : next;
        currentRef.current[i] = value;
        el.style.setProperty("--effect", value.toFixed(4));
        if (!settled) moving = true;
      }

      rafRef.current = moving
        ? requestAnimationFrame((nextTime) => runFrameRef.current(nextTime))
        : null;
    };
  }, []);

  const startLoop = useCallback(() => {
    if (prefersReducedMotion) {
      const elements = itemRefs.current;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el) continue;
        const target = Math.max(
          targetsRef.current[i] || 0,
          activeRef.current === i ? 1 : 0,
        );
        currentRef.current[i] = target;
        el.style.setProperty("--effect", target.toFixed(4));
      }
      return;
    }

    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame((now) => runFrameRef.current(now));
  }, [prefersReducedMotion]);

  useEffect(() => {
    activeRef.current = resolvedActive;
    smoothingRef.current = smoothing;
    startLoop();
  }, [resolvedActive, smoothing, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLUListElement>) => {
      if (prefersReducedMotion) return;
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const elements = itemRefs.current;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(
          Math.max(0, 1 - distance / proximityRadius),
        );
      }
      startLoop();
    },
    [falloff, prefersReducedMotion, proximityRadius, startLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleItemFocus = useCallback(
    (index: number) => {
      targetsRef.current = items.map((_, i) => (i === index ? 1 : 0));
      startLoop();
    },
    [items, startLoop],
  );

  const handleItemBlur = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleSelect = useCallback(
    (index: number, item: LineSidebarItem) => {
      if (controlledActiveIndex === undefined) {
        setInternalActive(index);
      }
      onItemClick?.(index, item);
    },
    [controlledActiveIndex, onItemClick],
  );

  const effectiveShift = prefersReducedMotion ? 0 : maxShift;

  const tickClass = showMarker
    ? `after:pointer-events-none after:absolute after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick && !prefersReducedMotion
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : "after:-translate-y-1/2"
      }`
    : "";

  return (
    <nav
      aria-label="Primary navigation"
      className={`relative flex justify-start${showMarker ? " [padding-left:calc(var(--marker-length)+var(--marker-gap))]" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${effectiveShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex w-full list-none flex-col py-2 [gap:var(--item-gap)]"
      >
        {items.map((rawItem, index) => {
          const item = normalizeItem(rawItem, index);
          const isActive = resolvedActive === index;

          const innerContent = (
            <>
              {showMarker && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
                />
              )}
              <span className="relative inline-flex items-baseline font-medium leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]">
                {showIndex && (
                  <span className="mr-[0.65rem] font-mono text-[0.78em] font-normal [opacity:calc(0.55+var(--effect,0)*0.45)]">
                    {item.index}
                  </span>
                )}
                <span>{item.label}</span>
              </span>
            </>
          );

          return (
            <li
              key={`${item.href ?? item.label}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              style={{ "--effect": isActive ? "1" : "0" } as CSSProperties}
              className={`relative before:pointer-events-none before:absolute before:-inset-x-6 before:-inset-y-[5px] before:content-[''] ${tickClass}`}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleSelect(index, item)}
                  onFocus={() => handleItemFocus(index)}
                  onBlur={handleItemBlur}
                  className="relative block w-full py-0.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
                >
                  {innerContent}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => handleSelect(index, item)}
                  onFocus={() => handleItemFocus(index)}
                  onBlur={handleItemBlur}
                  className="relative block w-full cursor-pointer py-0.5 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg"
                >
                  {innerContent}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default LineSidebar;
