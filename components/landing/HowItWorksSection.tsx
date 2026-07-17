"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Share2, ArrowRight } from "lucide-react";

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
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Generate Diagrams in 3 Simple Steps
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl">
            No design skills needed. Just describe what you want.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {steps.map((step, index) => (
            <div key={step.num} className="relative flex flex-col items-center">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                className="w-full flex flex-col items-center text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 z-10"
              >
                {/* Number & Icon */}
                <div className="relative mb-6">
                  <span className="text-7xl font-black text-indigo-50 leading-none select-none">
                    {step.num}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon size={28} className="text-indigo-600" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow connecting to next step (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 z-0 text-gray-300">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
