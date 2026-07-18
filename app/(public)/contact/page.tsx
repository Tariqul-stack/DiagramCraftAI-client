"use client";

import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  {
    label: "Email",
    value: "hello@diagramcraft.ai",
    icon: Mail,
  },
  {
    label: "Location",
    value: "Available Worldwide (Remote)",
    icon: MapPin,
  },
  {
    label: "Response Time",
    value: "Within 24 hours",
    icon: Clock,
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "Twitter", href: "#", icon: FaTwitter },
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
];

const inputClassName =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 transition-colors";
const inputErrorClassName =
  "w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-400 transition-colors";

export default function ContactPage() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus(null);

    try {
      await axios.post("/api/contact", data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <section className="bg-gradient-to-br from-[#1E1B4B] to-indigo-800 py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-indigo-300 uppercase tracking-wider text-sm font-semibold mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">Get in Touch</h1>
          <p className="mt-5 text-lg text-indigo-100 max-w-2xl mx-auto">
            Have a question or feedback? We would love to hear from you.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <section className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Information
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Fill out the form and we will get back to you within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="bg-indigo-50 rounded-xl p-3">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="text-2xl text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </section>

          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              {status === "success" && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                  Message sent successfully! We will get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                  Failed to send message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                    className={
                      errors.name ? inputErrorClassName : inputClassName
                    }
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={
                      errors.email ? inputErrorClassName : inputClassName
                    }
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    {...register("subject")}
                    className={
                      errors.subject ? inputErrorClassName : inputClassName
                    }
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your question or feedback..."
                    {...register("message")}
                    className={`resize-none ${
                      errors.message ? inputErrorClassName : inputClassName
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
