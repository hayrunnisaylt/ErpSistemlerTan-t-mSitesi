"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface ScaledFrameProps {
  /**
   * Minimum width (px) the inner content needs to render without cropping.
   * Wider containers render the content at full width (no scaling);
   * narrower ones render it at this width and scale it down to fit.
   */
  designWidth: number;
  /** Height (px) the inner content is designed/rendered at. */
  designHeight: number;
  children: ReactNode;
  className?: string;
}

/**
 * Renders its children at (at least) a fixed "desktop" width and scales them
 * down proportionally when the available width is narrower. Keeps dashboard mockups intact
 * (no cropped columns / truncated numbers) on narrow phone screens.
 */
export function ScaledFrame({
  designWidth,
  designHeight,
  children,
  className = "",
}: ScaledFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: designWidth, scale: 1 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w <= 0) return;
      setBox(
        w >= designWidth
          ? { width: w, scale: 1 }
          : { width: designWidth, scale: w / designWidth }
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: designHeight * box.scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: box.width,
          height: designHeight,
          transform: box.scale === 1 ? undefined : `scale(${box.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
