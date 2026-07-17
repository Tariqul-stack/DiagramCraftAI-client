"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is DiagramCraft AI?",
    answer:
      "DiagramCraft AI is an AI-powered diagram generator that converts plain English prompts into professional diagrams. It supports Flowcharts, ERDs, Sequence diagrams, Class diagrams, Mindmaps and Gantt charts.",
  },
  {
    question: "How does the AI diagram generation work?",
    answer:
      "You type a plain English description of the diagram you need. Our AI powered by Groq's Llama 3.3 model processes your prompt and generates valid Mermaid.js code which is then rendered as a visual diagram instantly.",
  },
  {
    question: "Is DiagramCraft AI free to use?",
    answer:
      "Yes, DiagramCraft AI is free to get started. You can create diagrams, save them to your account and share them with the community without any cost.",
  },
  {
    question: "Can I keep my diagrams private?",
    answer:
      "Absolutely. When creating a diagram you can set the visibility to private. Private diagrams are only visible to you and will not appear in the public gallery.",
  },
  {
    question: "What diagram types are supported?",
    answer:
      "We currently support 6 diagram types: Flowcharts, Sequence Diagrams, Entity Relationship Diagrams (ERD), Class Diagrams, Mind Maps and Gantt Charts. More types are coming soon.",
  },
  {
    question: "Can I edit the AI generated diagram?",
    answer:
      "Yes. After the AI generates a diagram you can view the Mermaid.js code and regenerate it with a refined prompt. Full manual code editing will be available in a future update.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl">
            Everything you need to know about DiagramCraft AI.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`border-b border-gray-200 transition-colors duration-200 ${
                  isOpen ? "bg-indigo-50/50 border-l-4 border-l-indigo-600" : "border-l-4 border-l-transparent"
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between text-left py-5 px-6 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg font-bold transition-colors ${
                      isOpen ? "text-indigo-900" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 px-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
