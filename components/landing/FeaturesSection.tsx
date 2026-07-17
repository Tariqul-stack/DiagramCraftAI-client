"use client";

import { motion } from "framer-motion";
import {
  Zap,
  LayoutDashboard,
  MessageSquare,
  Globe,
  Shield,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Powered Generation",
    description:
      "Generate professional diagrams instantly using Groq's ultra-fast Llama 3.3 AI model.",
  },
  {
    icon: LayoutDashboard,
    title: "Multiple Diagram Types",
    description:
      "Support for Flowcharts, ERDs, Sequence diagrams, Class diagrams, Mindmaps and Gantt charts.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description:
      "Chat with AI about your diagram. Ask it to explain, improve or modify your diagram instantly.",
  },
  {
    icon: Globe,
    title: "Public Gallery",
    description:
      "Explore thousands of diagrams created by the community. Get inspired and learn from others.",
  },
  {
    icon: Shield,
    title: "Private Diagrams",
    description:
      "Keep sensitive diagrams private. You control who sees your work with public and private options.",
  },
  {
    icon: Rocket,
    title: "Free to Get Started",
    description:
      "Create your first diagram for free. No credit card required. Upgrade anytime for more features.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Why Choose DiagramCraft AI?
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl">
            Everything you need to create, manage and share professional
            diagrams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
                  {/* Icon */}
                  <div className="mb-5 inline-flex items-center justify-center p-3 rounded-lg bg-indigo-50 text-indigo-600 w-fit">
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
