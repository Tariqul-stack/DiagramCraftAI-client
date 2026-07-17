"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "DiagramCraft AI saved me hours of work. I used to spend 30 minutes drawing flowcharts manually. Now it takes 30 seconds with AI.",
    initials: "SK",
    avatarBg: "bg-indigo-600",
    name: "Sarah Kim",
    role: "Senior Software Engineer",
    company: "@ TechCorp",
  },
  {
    quote:
      "The ERD generation is incredible. I described my database requirements and got a perfect schema diagram instantly. Game changer for database design.",
    initials: "MR",
    avatarBg: "bg-purple-600",
    name: "Marcus Rodriguez",
    role: "Full Stack Developer",
    company: "@ StartupXYZ",
  },
  {
    quote:
      "I use DiagramCraft AI for all my project planning. The Gantt chart generation and mindmap features are exactly what our team needed.",
    initials: "AP",
    avatarBg: "bg-cyan-600",
    name: "Aisha Patel",
    role: "Product Manager",
    company: "@ InnovateCo",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 text-center mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            Thousands of developers and teams trust DiagramCraft AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden"
            >
              {/* Quotation Mark Icon */}
              <div className="absolute top-6 right-6 text-indigo-100">
                <Quote size={40} fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed italic flex-grow relative z-10">
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${testimonial.avatarBg}`}
                >
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm">
                    {testimonial.name}
                  </span>
                  <div className="flex items-center flex-wrap text-xs text-gray-500 mt-0.5">
                    <span className="text-gray-500 text-xs">{testimonial.role}</span>
                    <span className="mx-1.5 text-gray-300">•</span>
                    <span className="text-indigo-600 font-medium">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
