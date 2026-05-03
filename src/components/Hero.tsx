/* =============================================================================
 * HERO COMPONENT — Landing Section with Animated Background
 *
 * Features:
 *   - Full-viewport hero section
 *   - Aceternity UI BackgroundBeams for animated SVG beam effect
 *   - Circular profile photo placeholder with animated gradient border
 *   - Animated text entrance using Framer Motion
 *   - CTA buttons: Download Resume (primary), GitHub, LinkedIn (outline)
 *
 * To customize:
 *   - Replace the "EP" initials placeholder with your actual photo
 *     (use next/image with the Image component)
 *   - Update GITHUB_URL and LINKEDIN_URL with your real profile links
 *   - Place your resume PDF at /public/resume.pdf
 *
 * Usage: <Hero />
 * ============================================================================= */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { FloatingDock } from "@/components/ui/floating-dock";

/* ---------------------------------------------------------------------------
 * CUSTOM SVG ICONS — GitHub & LinkedIn
 *
 * Lucide removed brand/social icons in recent versions.
 * These are simple inline SVG components as replacements.
 * --------------------------------------------------------------------------- */
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ---------------------------------------------------------------------------
 * CONFIGURATION — Update these with your real links
 * --------------------------------------------------------------------------- */
const GITHUB_URL = "https://github.com/ekaanshp";
const LINKEDIN_URL = "https://linkedin.com/in/ekaanshp";
const RESUME_PATH = "/resume.pdf";

/* ---------------------------------------------------------------------------
 * ANIMATION VARIANTS — Staggered fade-in from bottom
 *
 * container: orchestrates children with staggered delays
 * item: each child fades in and slides up
 * --------------------------------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* === Content Container ===
       * z-10 ensures content renders above the background beams.
       * Staggered animation via Framer Motion variants. */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6"
      >
        {/* === Profile Photo Placeholder ===
         * Circular container with animated gradient border.
         * Replace the inner div content with an <Image> tag for your photo.
         *
         * Example replacement:
         *   import Image from "next/image";
         *   <Image src="/profile.jpg" alt="Ekaansh Patel" fill className="object-cover" />
         */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative group">
            {/* Animated gradient ring — GPU composited layer for smooth spin */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-spin" style={{ animationDuration: "8s", willChange: "transform" }} />
            {/* Photo container — replace placeholder with your image */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-900 border-2 border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Placeholder initials — replace with <Image> component */}
              <span className="text-3xl sm:text-4xl font-bold gradient-text select-none">
                EP
              </span>
            </div>
          </div>
        </motion.div>

        {/* === Sparkles Background ===
         * Placed behind the name and title to add subtle magic. */}
        <div className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_50%)]">
          <SparklesCore
            particleDensity={100}
            minSize={0.5}
            maxSize={1.5}
            particleColor="#4b5563"
            className="w-full h-full"
          />
        </div>

        {/* === Name with Hover Effect === */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 w-full max-w-[800px] h-[100px] sm:h-[140px] mb-2 sm:mb-4"
        >
          <TextHoverEffect text="Ekaansh Patel" duration={1} />
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium mb-8 max-w-2xl"
        >
          Computer Science Student{" "}
          <span className="text-blue-400">&amp;</span> Software Engineer
        </motion.p>

        {/* === University Badge === */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-slate-500 mb-10 flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          University of Michigan — Ann Arbor
        </motion.p>

        {/* === Floating Dock CTA ===
         * Replaces traditional buttons with a sleek interactive dock. */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-4"
        >
          <FloatingDock
            items={[
              {
                title: "Resume",
                icon: <FileText className="h-full w-full" />,
                href: RESUME_PATH,
              },
              {
                title: "GitHub",
                icon: <GithubIcon className="h-full w-full" />,
                href: GITHUB_URL,
              },
              {
                title: "LinkedIn",
                icon: <LinkedinIcon className="h-full w-full" />,
                href: LINKEDIN_URL,
              },
            ]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
