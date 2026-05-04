"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedGradientText — Text with smoothly shifting gradient colors.
 *
 * Props:
 *   speed     — animation speed multiplier (higher = faster, default 1)
 *   colorFrom — starting gradient color (default "#4ade80")
 *   colorTo   — ending gradient color (default "#06b6d4")
 *   className — additional text classes (sizing, weight, etc.)
 */
export function AnimatedGradientText({
  children,
  speed = 1,
  colorFrom = "#4ade80",
  colorTo = "#06b6d4",
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}) {
  const duration = 8 / speed; // base 8s, inversely proportional to speed

  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        backgroundSize: "200% 100%",
        animation: `animatedGradientText ${duration}s ease infinite`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}
