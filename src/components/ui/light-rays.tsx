"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * LightRays — Ambient animated light beams shining from above.
 *
 * Pure CSS implementation — runs on the compositor thread for 60fps.
 * Place inside a `position: relative; overflow: hidden` container.
 *
 * Props:
 *   className — additional wrapper classes
 */
export function LightRays({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Ray 1 — wide, slow sweep */}
      <div
        className="absolute top-0 left-1/4 h-full w-[1px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.03) 40%, transparent 80%)",
          transform: "rotate(-15deg) scaleY(1.5)",
          transformOrigin: "top center",
          animation: "lightRaySweep1 12s ease-in-out infinite",
          opacity: 0.6,
        }}
      />
      {/* Ray 2 — narrow, faster */}
      <div
        className="absolute top-0 left-[35%] h-full w-[2px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.02) 50%, transparent 85%)",
          transform: "rotate(-8deg) scaleY(1.4)",
          transformOrigin: "top center",
          animation: "lightRaySweep2 9s ease-in-out infinite",
          opacity: 0.5,
        }}
      />
      {/* Ray 3 — center beam */}
      <div
        className="absolute top-0 left-1/2 h-full w-[3px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.05) 30%, transparent 70%)",
          transform: "rotate(2deg) scaleY(1.3)",
          transformOrigin: "top center",
          animation: "lightRaySweep3 15s ease-in-out infinite",
          opacity: 0.4,
        }}
      />
      {/* Ray 4 — right side */}
      <div
        className="absolute top-0 left-[60%] h-full w-[1px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.02) 45%, transparent 80%)",
          transform: "rotate(10deg) scaleY(1.5)",
          transformOrigin: "top center",
          animation: "lightRaySweep4 11s ease-in-out infinite",
          opacity: 0.5,
        }}
      />
      {/* Ray 5 — far right, subtle */}
      <div
        className="absolute top-0 left-[75%] h-full w-[2px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.02) 40%, transparent 75%)",
          transform: "rotate(18deg) scaleY(1.6)",
          transformOrigin: "top center",
          animation: "lightRaySweep5 13s ease-in-out infinite",
          opacity: 0.35,
        }}
      />

      {/* Ambient glow at the top */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          animation: "ambientPulse 8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
