"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";

// ─── Fake diagram preview ─────────────────────────────────────────────────────

function DiagramPreview() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      {/* Node row 1 */}
      <div className="flex items-center justify-center">
        <div className="px-4 py-2 rounded-lg bg-indigo-600/80 text-white text-xs font-mono font-semibold shadow-lg">
          User Input
        </div>
      </div>

      {/* Arrow down */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-0.5 h-4 bg-indigo-400/60" />
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-indigo-400/60" />
      </div>

      {/* Node row 2 — diamond */}
      <div className="flex items-center justify-center">
        <div
          className="w-32 h-10 bg-purple-600/80 text-white text-xs font-mono font-semibold shadow-lg flex items-center justify-center"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", height: 52, width: 160 }}
        >
          AI Processing
        </div>
      </div>

      {/* Arrow down */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-0.5 h-4 bg-indigo-400/60" />
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-indigo-400/60" />
      </div>

      {/* Node row 3 */}
      <div className="flex items-center gap-6">
        <div className="px-4 py-2 rounded-lg bg-violet-600/80 text-white text-xs font-mono font-semibold shadow-lg">
          Mermaid Code
        </div>
        <ChevronRight size={16} className="text-indigo-400/60" />
        <div className="px-4 py-2 rounded-lg bg-emerald-600/80 text-white text-xs font-mono font-semibold shadow-lg">
          Live Diagram
        </div>
      </div>
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="w-full min-h-[70vh] bg-gradient-to-br from-[#1E1B4B] via-indigo-900 to-indigo-800 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-fit"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-wide backdrop-blur-sm">
                <Sparkles size={13} />
                AI-Powered Diagram Generator
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Transform Your Ideas Into{" "}
              <span className="block bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
                Beautiful Diagrams
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-indigo-200/80 leading-relaxed max-w-lg">
              Type a simple prompt and let AI generate professional flowcharts,
              ERDs, sequence diagrams and more in seconds.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/diagrams/add"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-400/40 hover:-translate-y-0.5"
              >
                Create Your First Diagram
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 hover:border-white/60 bg-transparent hover:bg-white/10 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              >
                View Gallery
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {["10,000+ Diagrams", "6 Diagram Types", "Free to Start"].map(
                (stat, i) => (
                  <span
                    key={stat}
                    className="flex items-center gap-3 text-xs text-indigo-300/80 font-medium"
                  >
                    {i > 0 && (
                      <span className="w-px h-3 bg-indigo-400/40" aria-hidden />
                    )}
                    {stat}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* ── Right column (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl border border-white/10 bg-[#1E1B4B]/50 backdrop-blur-md p-6 shadow-2xl shadow-black/30">
              {/* Card header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs text-indigo-300/60 font-mono">
                  diagram.mmd
                </span>
              </div>

              {/* Code block */}
              <pre className="text-xs font-mono leading-relaxed text-indigo-200/90 bg-black/40 rounded-lg p-4 overflow-x-auto">
                <code>{`graph TD
  A[User Input] --> B{AI Processing}
  B --> C[Mermaid Code]
  C --> D[Live Diagram]`}</code>
              </pre>

              {/* Divider */}
              <div className="my-5 border-t border-white/10" />

              {/* Live preview label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400/80 font-semibold uppercase tracking-wide">
                  Live Preview
                </span>
              </div>

              {/* Diagram visualization */}
              <DiagramPreview />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
