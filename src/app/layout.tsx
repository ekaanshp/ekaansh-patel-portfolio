/* =============================================================================
 * ROOT LAYOUT — App-wide configuration
 *
 * This is the top-level layout for the Next.js App Router.
 * It sets up:
 *   - Google Fonts (Inter for body, JetBrains Mono for code)
 *   - Global metadata (title, description, theme-color)
 *   - Dark mode class on <html> (always-on dark mode)
 *   - Global CSS import
 * ============================================================================= */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ---------------------------------------------------------------------------
 * FONT CONFIGURATION
 * 
 * Inter — Primary font for headings and body text.
 *         Clean, modern, highly legible at all sizes.
 *
 * JetBrains Mono — Monospace font for code snippets and tech badges.
 *                   Adds a "developer" aesthetic to technical content.
 * --------------------------------------------------------------------------- */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ---------------------------------------------------------------------------
 * METADATA — SEO & Browser Configuration
 * 
 * Update these values to personalize your portfolio.
 * The theme-color ensures the browser chrome matches our dark theme.
 * --------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: "Ekaansh Patel | Portfolio",
  description:
    "Computer Science student at the University of Michigan. Software engineer passionate about building modern web applications, data-driven systems, and intuitive user experiences.",
  keywords: [
    "Ekaansh Patel",
    "portfolio",
    "software engineer",
    "University of Michigan",
    "computer science",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Ekaansh Patel" }],
};

/* Viewport configuration — themeColor must be in viewport export for Next.js 14+ */
export const viewport = {
  themeColor: "#030712",
};

/* ---------------------------------------------------------------------------
 * ROOT LAYOUT COMPONENT
 * 
 * - `dark` class on <html> forces dark mode across all shadcn components
 * - Font CSS variables are injected via className so Tailwind can use them
 * - `antialiased` enables font smoothing for crisp text rendering
 * --------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
