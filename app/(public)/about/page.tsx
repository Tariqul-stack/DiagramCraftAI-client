import Link from "next/link";
import { Eye, Users, Zap, type LucideIcon } from "lucide-react";

const STATS = [
  { value: "10,000+", label: "Diagrams Created" },
  { value: "5,000+", label: "Happy Users" },
  { value: "6", label: "Diagram Types" },
  { value: "< 3 sec", label: "Generation Time" },
];

const TECH_STACK = [
  {
    name: "Next.js 15",
    description: "React framework for production-ready web apps",
  },
  {
    name: "Groq AI",
    description: "Ultra-fast LLM inference for instant diagram generation",
  },
  {
    name: "MongoDB",
    description: "Flexible database for storing diagrams and user data",
  },
  {
    name: "Mermaid.js",
    description: "Industry-standard library for rendering diagrams",
  },
  {
    name: "TypeScript",
    description: "Type-safe development for reliable, maintainable code",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS for consistent, beautiful UI",
  },
];

const VALUES: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Simplicity First",
    icon: Zap,
    description:
      "Complex diagrams should be simple to create. We obsess over making the user experience as smooth as possible.",
  },
  {
    title: "AI Transparency",
    icon: Eye,
    description:
      "We believe in showing you exactly what the AI generates. No black boxes - you always see and control the output.",
  },
  {
    title: "Community Driven",
    icon: Users,
    description:
      "The best ideas come from the community. Share your diagrams, learn from others, and grow together.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <section className="bg-gradient-to-br from-[#1E1B4B] to-indigo-800 py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-indigo-300 uppercase tracking-wider text-sm font-semibold mb-4">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold max-w-4xl mx-auto">
            Building the Future of Visual Communication
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            We believe great ideas deserve great diagrams. DiagramCraft AI makes
            professional diagramming accessible to everyone.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            DiagramCraft AI was built to solve a simple problem - creating
            diagrams is time-consuming and requires specialized tools. We
            combined the power of modern AI with intuitive design to let anyone
            create professional diagrams in seconds, not hours.
          </p>
        </div>
      </section>

      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-indigo-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Built with Modern Technology
            </h2>
            <p className="mt-4 text-gray-500">
              We use the best tools to deliver the best experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-indigo-300 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-4">
                  {tech.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {tech.name}
                </h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 text-center"
                >
                  <div className="bg-indigo-50 rounded-xl p-4 w-fit mx-auto mb-4">
                    <Icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Create Your First Diagram?
          </h2>
          <p className="mt-4 text-indigo-200">
            Join thousands of developers already using DiagramCraft AI
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center mt-8 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
