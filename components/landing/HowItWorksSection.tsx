"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Share2 } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Describe Your Diagram",
    description:
      "Type a plain English prompt describing what diagram you need. Be as simple or detailed as you like.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "AI Generates Instantly",
    description:
      "Our AI powered by Groq processes your prompt and generates valid Mermaid.js diagram code in seconds.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Save and Share",
    description:
      "Save your diagram to your account, make it public to share with the community, or keep it private.",
    icon: Share2,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 text-center mb-3">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            Generate Diagrams in 3 Simple Steps
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            No design skills needed. Just describe what you want.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className="text-6xl font-bold text-indigo-100 mb-4">
                {step.num}
              </div>
              <div className="flex justify-center mb-4">
                <step.icon size={28} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
