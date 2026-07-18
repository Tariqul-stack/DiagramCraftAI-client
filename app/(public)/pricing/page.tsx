import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

type Feature = {
  text: string;
  included: boolean;
};

type Plan = {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonHref: string;
  buttonClassName: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      { text: "10 diagrams per month", included: true },
      { text: "6 diagram types", included: true },
      { text: "Public gallery access", included: true },
      { text: "AI Chat Assistant", included: true },
      { text: "Basic export (copy code)", included: true },
      { text: "Private diagrams", included: false },
      { text: "Priority support", included: false },
      { text: "Advanced AI models", included: false },
    ],
    buttonText: "Get Started Free",
    buttonHref: "/register",
    buttonClassName: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
  {
    name: "Pro",
    price: "$12",
    description: "For professionals and power users",
    popular: true,
    features: [
      { text: "Unlimited diagrams", included: true },
      { text: "6 diagram types", included: true },
      { text: "Public gallery access", included: true },
      { text: "AI Chat Assistant", included: true },
      { text: "PNG/SVG export", included: true },
      { text: "Private diagrams", included: true },
      { text: "Priority support", included: true },
      { text: "Team collaboration", included: false },
    ],
    buttonText: "Start Pro Trial",
    buttonHref: "/register",
    buttonClassName: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
  {
    name: "Team",
    price: "$39",
    description: "For teams and organizations",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Up to 10 team members", included: true },
      { text: "Shared diagram library", included: true },
      { text: "Team collaboration", included: true },
      { text: "Admin dashboard", included: true },
      { text: "Priority support", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
    ],
    buttonText: "Contact Sales",
    buttonHref: "/contact",
    buttonClassName: "bg-gray-900 text-white hover:bg-gray-800",
  },
];

const FAQ_ITEMS = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer:
      "Yes, we offer a 7-day free trial for the Pro plan. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards including Visa, Mastercard, and American Express. We also support PayPal.",
  },
];

function FeatureItem({ text, included }: Feature) {
  const Icon = included ? CheckCircle : XCircle;

  return (
    <li className="flex items-center gap-3 text-sm text-gray-700">
      <Icon
        className={included ? "text-green-500 shrink-0" : "text-gray-300 shrink-0"}
        size={18}
      />
      <span>{text}</span>
    </li>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={
        plan.popular
          ? "relative bg-white border-2 border-indigo-400 rounded-2xl p-8 shadow-indigo-100 shadow-lg"
          : "bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
      }
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
        <span className="text-lg text-gray-400 font-normal">/month</span>
      </div>
      <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

      <ul className="mt-8 space-y-3">
        {plan.features.map((feature) => (
          <FeatureItem key={feature.text} {...feature} />
        ))}
      </ul>

      <Link
        href={plan.buttonHref}
        className={`mt-8 block w-full text-center rounded-xl py-3 font-semibold transition-colors ${plan.buttonClassName}`}
      >
        {plan.buttonText}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <section className="bg-gradient-to-br from-[#1E1B4B] to-indigo-800 py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-indigo-300 uppercase tracking-wider text-sm font-semibold mb-4">
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Start for free. Upgrade when you need more.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
            Pricing FAQ
          </h2>

          <div>
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="border-b border-gray-200 py-6 last:border-0"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-200 text-sm mb-6 mt-2">
            Join 5,000+ users already creating diagrams with AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
            >
              Start for Free
            </Link>
            <Link
              href="/explore"
              className="border border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
