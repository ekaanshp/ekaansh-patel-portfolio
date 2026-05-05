/* =============================================================================
 * NAVBAR COMPONENT — Glassmorphic Sticky Navigation
 *
 * Features:
 *   - Fixed to top of viewport with glassmorphism effect
 *   - Smooth-scroll anchor links to: About, Experience, Projects
 *   - Scroll-aware opacity: becomes more opaque after scrolling
 *   - Mobile hamburger menu with animated slide-in panel
 *   - Name/logo on the left side
 *
 * Usage: <Navbar />
 * ============================================================================= */

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ---------------------------------------------------------------------------
 * NAVIGATION LINKS
 * 
 * Each link has a label and an href pointing to a section ID.
 * To add a new section, just add an entry here and create a matching
 * section with the corresponding id in page.tsx.
 * --------------------------------------------------------------------------- */
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  /* Track whether user has scrolled past the hero for opacity change */
  const [scrolled, setScrolled] = useState(false);
  /* Track mobile menu open/close state */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* -------------------------------------------------------------------------
   * SCROLL LISTENER
   * 
   * After scrolling 50px, the navbar gains a stronger background and border.
   * This creates a nice transition from transparent → glassmorphic.
   * ----------------------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------------------------------------------------------------
   * SMOOTH SCROLL HANDLER
   * 
   * Handles smooth scrolling to section anchors.
   * Closes mobile menu after navigation.
   * ----------------------------------------------------------------------- */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      /* Offset by 80px to account for the fixed navbar height */
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <nav
      id="navbar"
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <motion.div
        layout
        initial={false}
        className={`
          pointer-events-auto
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "mt-4 w-[90%] max-w-2xl rounded-full glass-navbar border border-white/10 px-6 shadow-2xl shadow-blue-500/10"
              : "mt-0 w-full max-w-none bg-transparent px-4 sm:px-6 lg:px-8"
          }
        `}
        style={{
          willChange: "transform, opacity",
        }}
      >
        <div className="flex h-14 items-center justify-between">
          {/* === Logo / Name === */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors duration-200"
          >
            EP<span className="text-blue-500">.</span>
          </a>

          {/* === Desktop Navigation Links === */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="
                  text-sm font-medium text-slate-300
                  hover:text-white
                  transition-colors duration-200
                  relative
                  after:absolute after:bottom-[-4px] after:left-0
                  after:h-[2px] after:w-0 after:bg-blue-500
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* === Mobile Hamburger Button === */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* === Mobile Menu Overlay === */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-2 space-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="
                      block py-2 px-3 rounded-lg
                      text-sm font-medium text-slate-300
                      hover:text-white hover:bg-white/5
                      transition-all duration-200
                    "
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
