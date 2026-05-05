/* =============================================================================
 * EXPERIENCE COMPONENT — Vertical Timeline
 *
 * Features:
 *   - Clean vertical timeline with animated connecting line
 *   - Glassmorphic cards for each experience entry
 *   - Scroll-triggered animations for each card (Framer Motion)
 *   - Highlighted key skills and contributions
 *   - Responsive layout
 *
 * To add a new experience:
 *   1. Add an entry to the EXPERIENCES array below
 *   2. Include title, organization, date, description, highlights, and tags
 *   3. The card will automatically render in the timeline
 *
 * Usage: <Experience />
 * ============================================================================= */

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

/* ---------------------------------------------------------------------------
 * EXPERIENCE DATA
 *
 * Fields:
 *   - title: Your role / position
 *   - organization: Company or team name
 *   - date: Time period (e.g., "Sep 2024 – Present")
 *   - description: Brief overview of your work (2-3 sentences)
 *   - highlights: Array of specific achievements or responsibilities
 *   - tags: Technologies or skills used
 * --------------------------------------------------------------------------- */
const EXPERIENCES = [
  {
    title: "Teleoperations Software Subteam",
    organization: "Michigan Mars Rover Team (MRover)",
    date: "Sep 2025 – Present",
    description:
      "Contributing to the teleoperations software that acts as the web-based basestation for the team's Mars rover for the University Rover Challenge (URC).",
    highlights: [
      "Designed and implemented responsive dashboard components for real-time telemetry display",
      "Wrote comprehensive software tests to ensure the reliability of critical teleoperations features",
      "Collaborated with other subteams like the science payload sub-team to develop and integrate a camera color input system",
    ],
    tags: ["Python", "C++", "HTML", "JavaScript"],
  },
  {
    title: "Data Analyst / Research Member",
    organization: "Wolverine Sports Analytics",
    date: "Sep 2025 – Present",
    description:
      "Building predictive models and data pipelines for sports analytics.",
    highlights: [
      "Engineered data pipelines to ingest, clean, and analyze large-scale sports datasets",
      "Developed predictive models using Python to evaluate fantasy football player performance",
      "Trained machine learning models on historical FastF1 API session data to forecast driver performance and race outcomes",
      "Developed a React-based dashboard to visualize complex race predictions and driver session metrics",
    ],
    tags: ["Python", "Data Science", "Machine Learning", "React", "Vite", "Tailwind CSS"],
  },
];

/* ---------------------------------------------------------------------------
 * EXPERIENCE CARD — Single Timeline Entry
 *
 * Each card animates in from the left when scrolled into view.
 * Uses glassmorphism styling with hover glow effect.
 * --------------------------------------------------------------------------- */
function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
    >
      {/* === Timeline Line ===
       * Gradient line that fades at the bottom for the last entry */}
      <div className="absolute left-0 sm:left-3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />

      {/* === Timeline Dot ===
       * Blue dot with pulsing ring animation */}
      <div className="absolute left-[-5px] sm:left-[7px] top-1 z-10">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-blue-500 animate-ping opacity-20" />
        </div>
      </div>

      {/* === Card Content === */}
      <div className="relative glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 border border-slate-800/50 bg-slate-900/40 backdrop-blur-md overflow-hidden group">
        <GlowingEffect spread={80} glow={true} inactiveZone={0.01} />
        
        <div className="relative z-10">
          {/* Date badge */}
          <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full mb-3">
            {experience.date}
          </span>

        {/* Organization with briefcase icon */}
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="size-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-400">
            {experience.organization}
          </span>
        </div>

        {/* Role title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
          {experience.title}
        </h3>

        {/* Description paragraph */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Bullet-point highlights */}
        <ul className="space-y-2 mb-4">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * MAIN EXPERIENCE COMPONENT
 * --------------------------------------------------------------------------- */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding"
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
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full" />
        </motion.div>

        {/* === Timeline Container === */}
        <div className="relative">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.organization} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
