import Link from 'next/link';
import { Compass, Github, Heart, Sparkles, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { directoryStats } from '@/data';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-[#070B14]/80 backdrop-blur-md text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-md shadow-slate-900/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                DevAtlas
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The premier curated directory of developer tools, AI coding agents, and open-source GitHub repositories built for modern software engineers and engineering architects.
            </p>

            {/* Live Stats Pill Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/50 font-semibold text-[11px]">
                <Sparkles className="h-3 w-3" />
                {directoryStats.totalTools.toLocaleString()} Tools
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 font-semibold text-[11px]">
                <Github className="h-3 w-3" />
                {directoryStats.totalRepositories.toLocaleString()} Repositories
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 font-semibold text-[11px]">
                <ShieldCheck className="h-3 w-3" />
                100% Verified
              </span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  All Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/repositories" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  GitHub Repositories
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Taxonomy & Categories
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Trending Momentum
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/research" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Submit New Tool
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Verification Standards
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Architectural Principles
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Dev */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Developer
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub Community</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono border border-slate-200 dark:border-slate-700">⌘K</kbd> anywhere</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DevAtlas. Discover the tools. Explore the code. Build better.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
