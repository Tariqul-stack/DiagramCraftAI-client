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
    <section className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 text-center mb-3">
            Diagram Types
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            Everything You Need to Visualize
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            From simple flowcharts to complex database schemas, we support all
            major diagram types.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
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
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col group">
                  <div className="bg-indigo-50 group-hover:bg-indigo-100 rounded-xl p-3 w-fit mb-4 transition-colors duration-300">
                    {IconComponent && <IconComponent size={24} className="text-indigo-600" />}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {type.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {type.description}
                  </p>

                  <Link
                    href="/diagrams/add"
                    className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center gap-1.5"
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
