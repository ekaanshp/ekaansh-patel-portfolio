"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Backlight — Renders a glowing duplicate of children behind them.
 *
 * Props:
 *   blur  — blur radius in px for the glow (default 5)
 *   className — additional wrapper classes
 */
export function Backlight({
  children,
  blur = 5,
  className,
}: {
  children: React.ReactNode;
  blur?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Glow layer — blurred duplicate positioned behind */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          filter: `blur(${blur}px)`,
          WebkitFilter: `blur(${blur}px)`,
          transform: "scale(1.1)",
          opacity: 0.75,
        }}
      >
        {children}
      </div>
      {/* Original content on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
