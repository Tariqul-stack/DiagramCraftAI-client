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
    <section className="w-full py-24 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-200 text-center mb-3">
            Stats
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-4">
            Trusted by Developers and Teams Worldwide
          </h2>
          <p className="text-indigo-100 leading-relaxed text-center max-w-2xl mx-auto">
            Join thousands of users already creating diagrams with AI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <Icon size={32} className="text-white opacity-90" />
                <div className="text-5xl font-extrabold text-white">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
