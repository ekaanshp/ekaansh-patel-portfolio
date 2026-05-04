"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * IconCloud — Interactive 3D rotating cloud of icons.
 *
 * Uses pure CSS transforms + JS for the spherical layout.
 * Much lighter than Three.js-based alternatives.
 *
 * Props:
 *   images    — array of image URLs for the cloud icons
 *   className — additional wrapper classes
 */
export function IconCloud({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const angleRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef({ x: 0.002, y: 0.003 });
  const [positions, setPositions] = useState<
    { x: number; y: number; z: number }[]
  >([]);

  /* Distribute points evenly on a sphere using the golden spiral method */
  const spherePoints = useMemo(() => {
    const points: { x: number; y: number; z: number }[] = [];
    const n = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const radius = 140;

    for (let i = 0; i < n; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
      const phi = (2 * Math.PI * i) / goldenRatio;

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      });
    }
    return points;
  }, [images.length]);

  /* Rotate a point around x and y axes */
  const rotatePoint = useCallback(
    (
      point: { x: number; y: number; z: number },
      angleX: number,
      angleY: number
    ) => {
      // Rotate around Y axis
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = point.x * cosY - point.z * sinY;
      const z1 = point.x * sinY + point.z * cosY;

      // Rotate around X axis
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = point.y * cosX - z1 * sinX;
      const z2 = point.y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    },
    []
  );

  /* Animation loop */
  useEffect(() => {
    const animate = () => {
      angleRef.current.x += speedRef.current.x;
      angleRef.current.y += speedRef.current.y;

      const newPositions = spherePoints.map((point) =>
        rotatePoint(point, angleRef.current.x, angleRef.current.y)
      );
      setPositions(newPositions);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [spherePoints, rotatePoint]);

  /* Speed up rotation slightly on hover */
  const handleMouseEnter = () => {
    speedRef.current = { x: 0.005, y: 0.007 };
  };
  const handleMouseLeave = () => {
    speedRef.current = { x: 0.002, y: 0.003 };
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width: 320, height: 320 }}
    >
      {images.map((src, i) => {
        const pos = positions[i] || { x: 0, y: 0, z: 0 };
        /* Map z (-140..140) to opacity (0.3..1) and scale (0.6..1.2) */
        const normalizedZ = (pos.z + 140) / 280;
        const opacity = 0.3 + normalizedZ * 0.7;
        const scale = 0.6 + normalizedZ * 0.6;
        const zIndex = Math.round(normalizedZ * 100);

        return (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute pointer-events-none select-none"
            style={{
              width: 36,
              height: 36,
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`,
              opacity,
              zIndex,
              transition: "opacity 0.1s ease",
              filter: `brightness(${0.8 + normalizedZ * 0.4})`,
            }}
          />
        );
      })}
    </div>
  );
}
