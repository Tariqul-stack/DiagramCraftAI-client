"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Zap, Menu, X, LogOut, User } from "lucide-react";
import { useGetMe, useLogout } from "@/hooks/useAuth";

// ─── Nav link definitions ─────────────────────────────────────────────────────

const publicLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const privateLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/diagrams/add", label: "Create" },
  { href: "/diagrams/manage", label: "Manage" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const { data: user } = useGetMe();
  const logout = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = user ? privateLinks : publicLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive(href) ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md px-6 h-14 flex items-center justify-between gap-6 shadow-md">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Zap size={18} className="text-blue-600" />
          <span className="text-sm font-bold text-slate-900 tracking-tight hidden sm:block">
            DiagramCraft AI
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Right side (desktop) ── */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                  <User size={15} className="text-slate-500" />
                  {user.name}
                </span>
                <button
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors duration-150 disabled:opacity-50"
                >
                  <LogOut size={15} />
                  {logout.isPending ? "Logging out…" : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-150 px-4 py-2 rounded-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                  <User size={15} className="text-slate-500" />
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    logout.mutate();
                    setMobileOpen(false);
                  }}
                  disabled={logout.isPending}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors duration-150 disabled:opacity-50"
                >
                  <LogOut size={15} />
                  {logout.isPending ? "Logging out…" : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold text-center text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-150 px-4 py-2 rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
