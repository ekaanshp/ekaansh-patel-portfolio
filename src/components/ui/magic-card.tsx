"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MagicCard — Card with an interactive spotlight gradient that follows the cursor.
 *
 * Props:
 *   gradientColor — the color of the spotlight glow (default "#1a1a2e")
 *   gradientSize  — diameter of the spotlight in px (default 250)
 *   className     — additional wrapper classes
 *   children      — card content
 */
export function MagicCard({
  children,
  gradientColor = "#1a1a2e",
  gradientSize = 250,
  className,
  ...props
}: {
  gradientColor?: string;
  gradientSize?: number;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  /* Motion template for the radial gradient mask/background */
  const gradientBackground = useMotionTemplate`
    radial-gradient(
      ${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 65%
    )
  `;

  /* Border gradient that follows cursor */
  const borderGradient = useMotionTemplate`
    radial-gradient(
      ${gradientSize * 0.8}px circle at ${mouseX}px ${mouseY}px,
      rgba(59, 130, 246, 0.3),
      rgba(139, 92, 246, 0.15) 40%,
      transparent 65%
    )
  `;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-950/80 backdrop-blur-sm transition-all duration-300",
        isHovered && "border-slate-700/60",
        className
      )}
      {...props}
    >
      {/* Spotlight background glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: gradientBackground }}
      />

      {/* Border glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: borderGradient,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
