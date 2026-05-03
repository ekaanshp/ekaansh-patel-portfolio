"use client";

/* =============================================================================
 * CARD SPOTLIGHT — Interactive hover spotlight effect (Aceternity-inspired)
 *
 * Replaced the original CanvasRevealEffect (WebGL/three.js) with a pure
 * CSS + Framer Motion gradient spotlight. This is:
 *   - More compatible (no WebGL/SSR issues)
 *   - More performant (no three.js bundle overhead)
 *   - Visually equivalent (radial gradient follows mouse cursor)
 *
 * Usage:
 *   <CardSpotlight className="...">
 *     <h3 className="relative z-20">Title</h3>
 *     <p className="relative z-20">Content must have z-20 to sit above the glow</p>
 *   </CardSpotlight>
 * ============================================================================= */

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* === Spotlight Glow Layer ===
       * A radial gradient that follows the mouse cursor.
       * Uses Framer Motion's useMotionTemplate for smooth tracking. */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {/* Pure CSS animated dot pattern — replaces the WebGL CanvasRevealEffect */}
        {isHovering && (
          <div
            className="absolute inset-0 rounded-md overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)`,
              backgroundSize: "8px 8px",
            }}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
};
