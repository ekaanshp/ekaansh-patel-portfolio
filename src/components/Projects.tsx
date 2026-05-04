/* =============================================================================
 * PROJECTS COMPONENT — Interactive Project Cards Gallery
 *
 * Features:
 *   - Grid of project cards using MagicCard with cursor-tracking spotlight
 *   - BorderBeam animated accents on each card for visual polish
 *   - Project details: title, description, tech stack tags
 *   - "View Project" and "Source Code" action buttons
 *   - Scroll-triggered staggered animations
 *   - Responsive: 1 col (mobile) → 2 cols (md) → 3 cols (lg)
 *
 * To add a new project:
 *   1. Add an entry to the PROJECTS array
 *   2. Include title, description, tags, and URLs
 *   3. The card will automatically render in the grid
 *
 * Usage: <Projects />
 * ============================================================================= */

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";

/* Custom GitHub SVG icon (lucide removed brand icons) */
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ---------------------------------------------------------------------------
 * PROJECT DATA
 *
 * Each project entry contains:
 *   - title: Project name
 *   - description: 2-3 sentence overview
 *   - tags: Technologies used (rendered as small badges)
 *   - liveUrl: Link to deployed project ("#" as placeholder)
 *   - sourceUrl: Link to GitHub repo ("#" as placeholder)
 *   - icon: Emoji displayed as the project icon
 *   - comingSoon: Optional flag for projects in development
 *
 * To add a project:
 *   1. Add a new object to this array
 *   2. Update liveUrl and sourceUrl with real links when available
 * --------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "F1 Telemetry Dashboard",
    description:
      "A real-time Formula 1 telemetry visualization dashboard with custom timeline scrubbing, live driver position tracking, and historical race data analysis via API integration.",
    tags: ["React", "Vite", "Python", "REST API"],
    liveUrl: "#",
    sourceUrl: "#",
    icon: "🏎️",
  },
  {
    title: "Drone Delivery Algorithm",
    description:
      "An optimized delivery routing system implementing Prim's MST algorithm and Branch & Bound for the Traveling Salesman Problem, minimizing total flight distance for drone deliveries.",
    tags: ["C++", "Prim's Algorithm", "Branch & Bound", "DSA"],
    liveUrl: "#",
    sourceUrl: "#",
    icon: "🚁",
  },
  {
    title: "ML Web Application",
    description:
      "A machine learning web application showcasing predictive modeling and interactive data visualizations. Currently in development — stay tuned for updates!",
    tags: ["Python", "TensorFlow", "Next.js", "FastAPI"],
    liveUrl: "#",
    sourceUrl: "#",
    icon: "🤖",
    comingSoon: true,
  },
];

/* ---------------------------------------------------------------------------
 * PROJECT CARD — Single Project Entry
 *
 * Wraps content in MagicCard for the cursor-tracking spotlight glow effect.
 * BorderBeam adds animated gradient borders for visual polish.
 * Independently animated when scrolled into view.
 * --------------------------------------------------------------------------- */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <MagicCard
        gradientColor="#0f1729"
        gradientSize={300}
        className="h-full p-6 sm:p-8"
      >
        {/* === Project Icon & Coming Soon Badge === */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{project.icon}</span>
          {"comingSoon" in project && project.comingSoon && (
            <span className="flex items-center gap-1 text-xs font-medium text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              <Sparkles className="size-3" />
              Coming Soon
            </span>
          )}
        </div>

        {/* === Project Title === */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
          {project.title}
        </h3>

        {/* === Project Description === */}
        <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-grow">
          {project.description}
        </p>

        {/* === Tech Stack Tags === */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* === Action Buttons ===
         * View Project: links to deployed app
         * Source Code: links to GitHub repository
         * Update URLs in the PROJECTS array above. */}
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild className="h-9 px-4 gap-2 border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 rounded-lg text-xs font-medium transition-all duration-200">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3.5" />
              View Project
            </a>
          </Button>
          <Button variant="outline" asChild className="h-9 px-4 gap-2 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg text-xs font-medium transition-all duration-200">
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-3.5" />
              Source Code
            </a>
          </Button>
        </div>
      </MagicCard>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * MAIN PROJECTS COMPONENT
 * --------------------------------------------------------------------------- */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-padding"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* === Section Header === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full" />
        </motion.div>

        {/* === Project Cards Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
