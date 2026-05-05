/* =============================================================================
 * PAGE.TSX — Main Portfolio Page
 *
 * This is the root page component that assembles all portfolio sections.
 * Each section is a modular component imported from /components/.
 *
 * Section order:
 *   1. Navbar — Fixed glassmorphic navigation (always visible)
 *   2. LightRays — Ambient light effect (fixed background)
 *   3. AuroraBackground — Fixed dark aurora glow covering the entire page
 *   4. Hero — Full-screen landing (particles + content sit above aurora)
 *   5. About → Experience → Projects → Footer inside the same aurora wrapper
 *
 * To add a new section:
 *   1. Create a component in /components/
 *   2. Import it here
 *   3. Add it inside the AuroraBackground wrapper below
 *   4. If it should be linkable from the navbar, add its ID to
 *      NAV_LINKS in Navbar.tsx
 * ============================================================================= */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import { LightRays } from "@/components/ui/light-rays";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <>
      {/* === Navigation — Fixed at top, always visible === */}
      <Navbar />

      {/* === Global Ambient Light Rays ===
       * Fixed to the viewport — much lighter than BackgroundBeams.
       * Subtle animated light beams from above for visual depth. */}
      <LightRays className="fixed inset-0 z-0" />

      {/* === Aurora wrapper — covers the ENTIRE page seamlessly ===
       * Hero particles (z-[1]) and content (z-10) render above the aurora (z-0).
       * This eliminates the hard visual break between Hero and the rest. */}
      <AuroraBackground className="relative z-10 w-full flex-1" showRadialGradient={false}>
        <main>
          {/* Hero — particles + content sit above the aurora via z-index */}
          <Hero />

          {/* About — Bio and tech stack badges + icon cloud */}
          <About />

          {/* Experience — Vertical timeline */}
          <Experience />

          {/* Projects — Interactive card gallery with MagicCard */}
          <Projects />

          {/* Footer */}
          <footer className="border-t border-slate-800/50 py-8 px-4 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Ekaansh Patel. Built with{" "}
              <span className="text-slate-400">Next.js</span>,{" "}
              <span className="text-slate-400">React</span>,{" "}
              <span className="text-slate-400">Tailwind CSS</span>,{" "}
              <span className="text-slate-400">shadcn/ui</span>,{" "}
              <span className="text-slate-400">Aceternity UI</span>,{" "}
              <span className="text-slate-400">Magic UI</span>,{" "}
              <span className="text-slate-400">Framer Motion</span>, and{" "}
              <span className="text-slate-400">Three.js</span>.
            </p>
          </footer>
        </main>
      </AuroraBackground>
    </>
  );
}

