/* =============================================================================
 * PAGE.TSX — Main Portfolio Page
 *
 * This is the root page component that assembles all portfolio sections.
 * Each section is a modular component imported from /components/.
 *
 * Section order:
 *   1. Navbar — Fixed glassmorphic navigation (always visible)
 *   2. Hero — Full-screen landing with animated background
 *   3. About — Bio and tech stack
 *   4. Experience — Timeline of roles and positions
 *   5. Projects — Interactive project card gallery
 *   6. Footer — Simple credit footer
 *
 * To add a new section:
 *   1. Create a component in /components/
 *   2. Import it here
 *   3. Add it in the desired position below
 *   4. If it should be linkable from the navbar, add its ID to
 *      NAV_LINKS in Navbar.tsx
 * ============================================================================= */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      {/* === Navigation — Fixed at top, always visible === */}
      <Navbar />

      {/* === Main Content Flow ===
       * Each section has its own id for anchor-link navigation.
       * The flex-1 on main ensures it fills available viewport space. */}
      <main className="flex-1">
        {/* Hero — Full viewport landing section */}
        <Hero />

        {/* About — Bio and tech stack badges */}
        <About />

        {/* Experience — Vertical timeline */}
        <Experience />

        {/* Projects — Interactive card gallery */}
        <Projects />
      </main>

      {/* === Footer ===
       * Minimal footer with copyright.
       * You can expand this with social links, contact info, etc. */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8 px-4 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Ekaansh Patel. Built with{" "}
          <span className="text-slate-400">Next.js</span>,{" "}
          <span className="text-slate-400">Tailwind CSS</span>, and{" "}
          <span className="text-slate-400">Aceternity UI</span>.
        </p>
      </footer>
    </>
  );
}
