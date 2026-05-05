"use client";
/* =============================================================================
 * AURORA BACKGROUND — Aceternity UI-inspired animated aurora effect
 *
 * Adapted to match the portfolio's dark (#030712) blue/cyan/purple theme.
 * Uses pure CSS animations for smooth, GPU-composited rendering.
 *
 * Props:
 *   children      — content rendered on top of the aurora
 *   className     — additional wrapper classes
 *   showRadialGradient — whether to apply vignette fade at bottom
 * ============================================================================= */

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative bg-[#030712] text-slate-100",
        className
      )}
      {...props}
    >
      {/* === Aurora Layer ===
       * Multiple overlapping animated gradients create the aurora shimmer.
       * All animations are CSS-only — compositor-thread, zero JS cost. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Radial vignette mask — fades aurora at edges for a natural look */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={
            showRadialGradient
              ? {
                  maskImage:
                    "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
                }
              : undefined
          }
        >
          {/* Primary aurora — near-black navy sweep */}
          <div
            className="aurora-layer-1 absolute"
            style={{
              width: "200%",
              height: "200%",
              top: "-50%",
              left: "-50%",
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #03082fff 60deg, #07141e 90deg, #03082fff 120deg, transparent 180deg, transparent 360deg)",
              opacity: 0.9,
              filter: "blur(120px)",
              animation: "auroraRotate1 22s linear infinite",
            }}
          />
          {/* Secondary aurora — near-black midnight purple sweep */}
          <div
            className="aurora-layer-2 absolute"
            style={{
              width: "200%",
              height: "200%",
              top: "-50%",
              left: "-50%",
              background:
                "conic-gradient(from 180deg at 50% 50%, transparent 0deg, #220239ff 60deg, #0f0519 90deg, #060932ff 120deg, transparent 200deg, transparent 360deg)",
              opacity: 0.8,
              filter: "blur(120px)",
              animation: "auroraRotate2 28s linear infinite",
            }}
          />
          {/* Tertiary aurora — near-black blue pulse */}
          <div
            className="aurora-layer-3 absolute"
            style={{
              width: "160%",
              height: "160%",
              top: "-30%",
              left: "-30%",
              background:
                "radial-gradient(ellipse at 60% 40%, #071124ff 0%, #000537ff 20%, transparent 60%), radial-gradient(ellipse at 40% 60%, #071325ff 0%, #06012aff 20%, transparent 60%)",
              opacity: 0.7,
              filter: "blur(100px)",
              animation: "auroraPulse 10s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* === Children rendered above the aurora === */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
