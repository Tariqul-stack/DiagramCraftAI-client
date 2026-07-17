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
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 text-center mb-3">
            Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            Why Choose DiagramCraft AI?
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            Everything you need to create, manage and share professional
            diagrams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
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
                <div className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-lg hover:border-indigo-200 transition-all duration-300 h-full flex flex-col">
                  <div className="bg-indigo-50 rounded-xl p-3 w-fit mb-4">
                    <Icon size={24} className="text-indigo-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
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
