/* =============================================================================
 * ABOUT COMPONENT — Bio & Tech Stack Section
 *
 * Features:
 *   - Brief bio paragraph introducing Ekaansh
 *   - Tech stack displayed as interactive badges with colored dots
 *   - 3D rotating IconCloud beneath the tech badges
 *   - Scroll-triggered fade-in animations via Framer Motion useInView
 *   - Responsive grid layout for tech badges
 *
 * To customize:
 *   - Update the bio text in the <p> tags below
 *   - Add or remove technologies from the TECH_STACK array
 *
 * Usage: <About />
 * ============================================================================= */

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { IconCloud } from "@/components/ui/icon-cloud";

/* ---------------------------------------------------------------------------
 * TECH STACK DATA
 *
 * Each entry has a name, a color (hex) for the indicator dot, and a
 * Simple Icons slug for the icon cloud.
 *
 * To add a new technology:
 *   1. Add an object with { name, color, slug } to this array
 *   2. The badge will automatically render in the grid
 *   3. The icon will appear in the cloud
 * --------------------------------------------------------------------------- */
const TECH_STACK = [
  { name: "React", color: "#61dafb", slug: "react" },
  { name: "Next.js", color: "#ffffff", slug: "nextdotjs" },
  { name: "TypeScript", color: "#3178c6", slug: "typescript" },
  { name: "Vite", color: "#646cff", slug: "vite" },
  { name: "Python", color: "#3776ab", slug: "python" },
  { name: "C++", color: "#00599c", slug: "cplusplus" },
  { name: "Tailwind CSS", color: "#06b6d4", slug: "tailwindcss" },
  { name: "Node.js", color: "#339933", slug: "nodedotjs" },
];

/* Build icon cloud images from the tech stack slugs */
const ICON_CLOUD_IMAGES = TECH_STACK.map(
  (tech) => `https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace("#", "")}`
);

/* ---------------------------------------------------------------------------
 * ANIMATION VARIANTS — Staggered grid entrance
 * --------------------------------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function About() {
  /* Ref for scroll-triggered animation — fires once when section enters view */
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* === Section Header === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">About Me</span>
          </h2>
          {/* Accent underline bar */}
          <div className="w-16 h-1 bg-blue-500 rounded-full" />
        </motion.div>

        {/* === Bio Paragraphs ===
         * Update these with your own story.
         * Keep them concise — 2-3 paragraphs is ideal for a portfolio. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 mb-16"
        >
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            I am a Computer Science student at the University of Michigan, Ann Arbor,
            passionate about full stack development and building modern data-driven web applications. 
            I thrive at the intersection of software engineering and design, creating useful 
            applications with great user experience.
          </p>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            From developing visual dashboards for F1 race predictions in Wolverine Sports Analytics to building
            teleoperations interfaces for Michigan Mars Rover Team, I love tackling complex
            technical challenges. When I am not coding, you will find me watching a lot of Detroit sports 
            or hanging out with friends.
          </p>
        </motion.div>

        {/* === Tech Stack Header === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4"
        >
          <h3 className="text-xl font-semibold text-slate-200 mb-6">
            Tech Stack
          </h3>
        </motion.div>

        {/* === Tech Badges Grid ===
         * Each badge: colored dot + technology name.
         * Hover: glow effect + slight scale-up.
         * Grid: 2 cols (mobile) → 3 cols (sm) → 4 cols (md+). */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="
                group relative flex items-center gap-3
                px-4 py-3 rounded-xl border border-slate-800/50
                bg-slate-900/40 backdrop-blur-md
                cursor-default
                transition-all duration-300
                hover:scale-[1.03]
              "
            >
              <GlowingEffect spread={40} glow={true} inactiveZone={0.01} />
              {/* Colored dot — matches the technology's brand color */}
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* === Interactive Icon Cloud ===
         * 3D rotating sphere of tech stack icons below the badges grid.
         * Uses the same slugs from the TECH_STACK array. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <IconCloud images={ICON_CLOUD_IMAGES} />
        </motion.div>
      </div>
    </section>
  );
}
