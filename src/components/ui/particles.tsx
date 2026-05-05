"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Particles — Lightweight interactive canvas-based particle system.
 *
 * Performance approach:
 *   - Uses a single <canvas> element (no DOM nodes per particle)
 *   - requestAnimationFrame loop with 60fps target
 *   - Mouse-reactive: particles gently ease toward cursor
 *   - Particles are pre-allocated once — no GC pressure
 *
 * Props:
 *   quantity  — number of particles (default 80)
 *   color     — particle color as hex string (default "#ffffff")
 *   ease      — mouse-follow easing factor, higher = slower (default 80)
 *   size      — base particle radius in px (default 1)
 *   staticity — how static particles are, higher = less movement (default 50)
 *   refresh   — set true to re-initialize particles
 *   className — wrapper classes (usually "absolute inset-0")
 */
interface ParticlesProps {
  quantity?: number;
  color?: string;
  ease?: number;
  size?: number;
  staticity?: number;
  refresh?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace("#", "");
  
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  
  const num = parseInt(hex, 16);
  
  if (hex.length === 8) {
    // RRGGBBAA - extract RGB, ignore AA (alpha is handled separately)
    return [
      (num >> 24) & 255,
      (num >> 16) & 255,
      (num >> 8) & 255
    ];
  }
  
  // RRGGBB
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255
  ];
}

export function Particles({
  quantity = 200,
  color = "#1100ffff",
  ease = 40,
  size = 0.5,
  staticity = 30,
  refresh = false,
  className,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const animFrameRef = useRef(0);

  const rgb = hexToRgb(color);

  const createParticle = useCallback((): Particle => {
    const w = canvasSizeRef.current.w;
    const h = canvasSizeRef.current.h;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      translateX: 0,
      translateY: 0,
      size: Math.random() * 2 + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    contextRef.current = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const rect = canvas.getBoundingClientRect();
    canvasSizeRef.current = { w: rect.width, h: rect.height };

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Pre-allocate particles
    particlesRef.current = Array.from({ length: quantity }, () =>
      createParticle()
    );
  }, [quantity, createParticle]);

  const drawParticle = useCallback(
    (p: Particle) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const { x, y, translateX, translateY, size: pSize, alpha } = p;
      ctx.beginPath();
      ctx.arc(x + translateX, y + translateY, pSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
      ctx.fill();
    },
    [rgb]
  );

  const animate = useCallback(() => {
    const ctx = contextRef.current;
    const { w, h } = canvasSizeRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Fade in
      if (p.alpha < p.targetAlpha) {
        p.alpha = Math.min(p.alpha + 0.02, p.targetAlpha);
      }

      // Drift
      p.x += p.dx;
      p.y += p.dy;

      // Mouse magnetism
      p.translateX +=
        (mouse.x / (staticity / p.magnetism) - p.translateX) / ease;
      p.translateY +=
        (mouse.y / (staticity / p.magnetism) - p.translateY) / ease;

      // Wrap around edges
      if (p.x + p.translateX < -10) p.x = w + 10;
      else if (p.x + p.translateX > w + 10) p.x = -10;
      if (p.y + p.translateY < -10) p.y = h + 10;
      else if (p.y + p.translateY > h + 10) p.y = -10;

      drawParticle(p);
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, [ease, staticity, drawParticle]);

  /* Initialize and start animation */
  useEffect(() => {
    initCanvas();
    animate();

    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas, animate]);

  /* Re-init on refresh prop change */
  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  /* Track mouse position relative to canvas center */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - canvasSizeRef.current.w / 2,
        y: e.clientY - rect.top - canvasSizeRef.current.h / 2,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
