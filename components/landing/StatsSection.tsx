"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { BarChart2, Users, Layers, Zap } from "lucide-react";

// ─── Counter Helper ───────────────────────────────────────────────────────────

function Counter({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent =
              Intl.NumberFormat("en-US").format(Math.floor(value)) + suffix;
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: 10000, suffix: "+", label: "Diagrams Created", icon: BarChart2 },
  { value: 5000, suffix: "+", label: "Active Users", icon: Users },
  { value: 6, suffix: "", label: "Diagram Types", icon: Layers },
  { value: 99, suffix: "%", label: "Uptime", icon: Zap },
];

// ─── StatsSection ─────────────────────────────────────────────────────────────

export default function StatsSection() {
  return (
    <section className="w-full bg-indigo-600 py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Trusted by Developers and Teams Worldwide
          </h2>
          <p className="text-base sm:text-lg text-indigo-200 max-w-2xl">
            Join thousands of users already creating diagrams with AI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative flex flex-col items-center text-center px-4 ${
                  // Add border between items on desktop, except for the last one
                  index < stats.length - 1
                    ? "lg:border-r lg:border-indigo-500/50"
                    : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center"
                >
                  <Icon size={32} className="mb-4 text-white opacity-90" />
                  <div className="text-4xl font-extrabold tracking-tight mb-2">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-indigo-200 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
