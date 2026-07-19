"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  ChevronDown,
  CircleHelp,
  Menu,
  MoreHorizontal,
  Search,
  Sparkles,
} from "lucide-react";

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[660px] lg:ml-auto">
      <div className="absolute -inset-8 rounded-[3rem] bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-4 top-8 h-[83%] w-full rounded-[1.35rem] border border-white/15 bg-white/[0.07] shadow-2xl shadow-blue-950/30" />

      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/40 bg-white/[0.14] p-2 shadow-[0_30px_90px_rgba(7,24,71,0.38)] backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[0.95rem] border border-white/20 bg-[#f7f9ff] text-slate-700">
          <div className="flex h-11 items-center gap-2 border-b border-slate-200/80 bg-white/80 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-3 text-[10px] font-semibold tracking-[0.16em] text-slate-400">DIAGRAMCRAFT AI</span>
            <div className="ml-auto flex gap-3 text-slate-400"><CircleHelp size={14} /><Menu size={15} /></div>
          </div>

          <div className="grid min-h-[390px] grid-cols-[48px_1fr] sm:grid-cols-[64px_1fr]">
            <aside className="border-r border-slate-200 bg-[#eef2ff]/85 p-3">
              <div className="mb-8 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30"><Sparkles size={14} /></div>
              <div className="space-y-5 text-slate-400"><BarChart3 size={17} className="text-blue-600" /><Bot size={17} /><Menu size={17} /><CircleHelp size={17} /></div>
            </aside>

            <div className="min-w-0 p-4 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">Live workspace</p><h3 className="mt-1 text-base font-bold text-slate-800 sm:text-lg">AI diagram overview</h3></div>
                <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-400 sm:flex"><Search size={12} /> Search</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr]">
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between"><span className="text-[10px] font-semibold text-slate-500">Generated diagrams</span><MoreHorizontal size={15} className="text-slate-300" /></div>
                  <div className="mt-6 flex h-32 items-end gap-2 border-b border-l border-slate-100 px-2 pb-0">
                    {[38, 54, 44, 72, 62, 88, 78, 100].map((height, index) => <div key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-sky-300" style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] text-slate-400"><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold text-slate-500">AI activity</span><div className="relative mx-auto mt-7 h-24 w-24 rounded-full" style={{ background: "conic-gradient(#2563eb 0 68%, #93c5fd 68% 86%, #e0e7ff 86% 100%)" }}><div className="absolute inset-3 flex items-center justify-center rounded-full bg-white"><span className="text-xl font-bold text-slate-800">68%</span></div></div><p className="mt-4 text-center text-[9px] text-slate-400">of your weekly goal</p></div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between"><span className="text-[10px] font-semibold text-slate-500">Recent diagrams</span><span className="text-[10px] font-semibold text-blue-600">View all</span></div>
                <div className="mt-4 grid grid-cols-3 gap-2"><div className="h-14 rounded-lg bg-blue-50 p-2"><div className="h-1.5 w-8 rounded-full bg-blue-400" /><div className="mt-3 flex gap-1"><i className="h-5 w-5 rounded bg-white shadow-sm" /><i className="h-5 w-7 rounded bg-indigo-200" /><i className="h-5 w-4 rounded bg-white shadow-sm" /></div></div><div className="h-14 rounded-lg bg-violet-50 p-2"><div className="h-1.5 w-10 rounded-full bg-violet-400" /><div className="mt-3 h-5 w-full rounded bg-white shadow-sm" /></div><div className="h-14 rounded-lg bg-sky-50 p-2"><div className="h-1.5 w-7 rounded-full bg-sky-400" /><div className="mt-3 flex gap-1"><i className="h-5 w-5 rounded-full bg-white shadow-sm" /><i className="h-5 w-5 rounded-full bg-sky-200" /><i className="h-5 w-5 rounded-full bg-white shadow-sm" /></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#071b4c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_36%,rgba(73,157,255,0.46),transparent_28%),radial-gradient(circle_at_6%_10%,rgba(42,112,255,0.34),transparent_33%),linear-gradient(120deg,#071b4c_0%,#0b3f9b_47%,#8ab8e7_130%)]" />
      <div className="absolute -left-40 bottom-[-22rem] h-[40rem] w-[40rem] rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute right-[-11rem] top-[-12rem] h-[36rem] w-[36rem] rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 pb-16 pt-24 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:px-10 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-white/80 shadow-lg shadow-blue-950/10 backdrop-blur-xl"><Sparkles size={14} className="text-sky-200" /> AI-Powered Diagram Generator</div>
          <h1 className="max-w-[700px] text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.7rem]">Transform Your Ideas Into <span className="bg-gradient-to-r from-white via-sky-100 to-blue-200 bg-clip-text text-transparent">Beautiful Diagrams</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-blue-50/75 sm:text-xl">Type a simple prompt and let AI generate professional flowcharts, ERDs, sequence diagrams and more in seconds.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/diagrams/add" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-950/25 transition hover:-translate-y-0.5 hover:bg-blue-500">Create Your First Diagram <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
            <Link href="/explore" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20">View Gallery</Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-6 sm:gap-12">{[{ label: "Diagrams Created", value: "10,000+" }, { label: "Diagram Types", value: "6" }, { label: "Free to Start", value: "100%" }].map((stat) => <div key={stat.label}><p className="text-xl font-bold text-white">{stat.value}</p><p className="mt-1 text-xs text-blue-100/55">{stat.label}</p></div>)}</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="w-full lg:translate-x-4"><DashboardPreview /></motion.div>
      </div>
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-white/60"><ChevronDown size={20} className="animate-bounce" /></div>
    </section>
  );
}
