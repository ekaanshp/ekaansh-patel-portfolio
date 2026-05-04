"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * BorderBeam — Animated gradient that travels along a container's border.
 *
 * Place inside a `position: relative; overflow: hidden` parent.
 *
 * Props:
 *   duration    — seconds for one full loop (default 6)
 *   delay       — animation delay in seconds (default 0)
 *   size        — beam length in px (default 200)
 *   borderWidth — visible border width in px (default 1.5)
 *   className   — gradient color overrides via `from-*`, `via-*`, `to-*`
 */
export function BorderBeam({
  duration = 6,
  delay = 0,
  size = 200,
  borderWidth = 1.5,
  className,
}: {
  duration?: number;
  delay?: number;
  size?: number;
  borderWidth?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={
        {
          "--border-beam-size": `${size}px`,
          "--border-beam-duration": `${duration}s`,
          "--border-beam-delay": `${delay}s`,
          "--border-beam-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: `${borderWidth}px`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          background: `conic-gradient(from calc(var(--border-beam-angle, 0deg)), transparent 60%, var(--beam-color-from, transparent) 75%, var(--beam-color-via, #3b82f6) 80%, var(--beam-color-to, transparent) 85%, transparent 95%)`,
          animation: `borderBeamRotate var(--border-beam-duration) linear var(--border-beam-delay) infinite`,
        }}
      />
    </div>
  );
}
