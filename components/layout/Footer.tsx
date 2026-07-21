import Link from "next/link";
import { Zap } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

// ─── Data ─────────────────────────────────────────────────────────────────────

const productLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Create Diagram", href: "/diagrams/add" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pricing", href: "/pricing" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "FAQ", href: "#" },
];

const socialLinks = [
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "Twitter", href: "#", icon: FaTwitter },
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FooterLinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
        {heading}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-150"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E1B4B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Zap size={20} className="text-indigo-400" />
              <span className="text-base font-bold tracking-tight">
                DiagramCraft AI
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Transform your ideas into beautiful diagrams using the power of AI.
              Fast, simple, and powerful.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-150"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 — Product */}
          <FooterLinkGroup heading="Product" links={productLinks} />

          {/* Column 3 — Company */}
          <FooterLinkGroup heading="Company" links={companyLinks} />

          {/* Column 4 — Support */}
          <FooterLinkGroup heading="Support" links={supportLinks} />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 DiagramCraft AI. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with Next.js and Groq AI
          </p>
        </div>
      </div>
    </footer>
  );
}
