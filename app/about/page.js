import { Compass, ShieldCheck, Heart, Sparkles, Check, Database, Zap, Code, Terminal, Layers } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { directoryStats } from '@/data';

export const metadata = {
  title: 'About DevAtlas — Standards, Verification & Architecture',
  description: 'DevAtlas is the ultimate curated developer tools and open-source directory built for engineers and architects.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F1] dark:bg-[#070B14] relative">
      <Navbar activeTab="about" />

      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
        
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0D9488] to-teal-400 text-white shadow-lg shadow-teal-500/20">
            <Compass className="h-8 w-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About DevAtlas
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The definitive engineering directory for developer tools, AI agents, and open-source GitHub ecosystems.
          </p>

          {/* Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <div className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="text-xl font-bold text-teal-600 dark:text-teal-400">
                {directoryStats.totalTools.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Verified Tools</div>
            </div>

            <div className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {directoryStats.totalRepositories.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Open Source Repos</div>
            </div>

            <div className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {directoryStats.totalCategories}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Technical Categories</div>
            </div>
          </div>
        </div>

        {/* Mission statement */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Architectural Principles
          </h2>
          <p>
            Software engineering is experiencing its most rapid transformation in history. The boundary between AI coding agents, traditional IDEs, testing automation, and cloud runtimes is dissolving.
          </p>
          <p>
            Yet, finding which tool or repository actually solves your specific challenge has never been harder. Most directories are flooded with low-quality promotional clones, fake GitHub metric badges, and SEO spam.
          </p>
          <p>
            <strong>DevAtlas</strong> was architected as a high-density, authentic engineering directory with three unwavering rules:
          </p>
          <ul className="space-y-3 pt-2">
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span><strong>No Fabricated Metrics:</strong> No fake star counts, no invented features, and no phantom pricing claims. Every single metric is validated.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span><strong>Factual Launch Timelines:</strong> Exact historical and release dates, distinguishing 2026 cutting-edge software from battle-tested industry pioneers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mt-0.5">
                <Check className="h-3 w-3" />
              </span>
              <span><strong>Zero Sponsored Cloaking:</strong> Verified tools and open-source repositories are ranked purely by developer utility, community momentum, and architectural quality.</span>
            </li>
          </ul>
        </div>

        {/* Directory Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50 text-[#0D9488]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Curated Software Tools
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Proprietary and hosted platforms vetted for reliability, security compliance, platform support (Web, CLI, IDE), and developer productivity.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline pt-2"
            >
              <span>Explore Tools Directory</span>
              <span>→</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Code className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Open-Source GitHub Repositories
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Open-source repositories with permissive licenses, transparent commit histories, active stars, and production-tested codebases.
            </p>
            <Link
              href="/repositories"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
            >
              <span>Explore Repositories Directory</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
