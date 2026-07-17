"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GitBranch,
  ArrowLeftRight,
  Database,
  Layers,
  Brain,
  CalendarDays,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import { DIAGRAM_TYPES } from "@/constants/diagramTypes";

// Map the string icon names to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  GitBranch,
  ArrowLeftRight,
  Database,
  Layers,
  Brain,
  CalendarDays,
};

export default function DiagramTypesSection() {
  return (
    <section className="w-full bg-[#F9FAFB] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Diagram Types
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Everything You Need to Visualize
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl">
            From simple flowcharts to complex database schemas, we support all
            major diagram types.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DIAGRAM_TYPES.map((type, index) => {
            const IconComponent = iconMap[type.icon];

            return (
              <motion.div
                key={type.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1">
                  {/* Icon */}
                  <div className="mb-5 inline-flex items-center justify-center p-3 rounded-lg bg-indigo-600 text-white w-fit shadow-md">
                    {IconComponent && <IconComponent size={24} strokeWidth={2} />}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {type.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
                    {type.description}
                  </p>

                  {/* Link */}
                  <Link
                    href="/diagrams/add"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors mt-auto group-hover:underline"
                  >
                    Try it <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
