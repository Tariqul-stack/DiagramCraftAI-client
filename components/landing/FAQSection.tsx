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
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 text-center mb-3">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            Everything you need to know about DiagramCraft AI.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mt-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex justify-between items-center py-5 px-2 text-left hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-base pr-4">
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
                      <div className="px-2 pb-6 text-gray-600 leading-relaxed">
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
