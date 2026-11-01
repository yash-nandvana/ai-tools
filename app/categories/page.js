'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, CheckCircle2, Terminal, Palette, Cloud, 
  Database, ShieldCheck, CheckSquare, Bot, Cpu, Layers,
  ArrowRight, Sparkles, Video, Mic, Search, Server, 
  BarChart3, Globe, MessageSquare, TrendingUp, Scale, 
  Users, GraduationCap, Activity, Filter, ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/data/categories';
import { toolsData, repositoriesData } from '@/data';

const iconMap = {
  Code2: <Code2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
  CheckCircle2: <CheckCircle2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  Terminal: <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  Palette: <Palette className="h-6 w-6 text-pink-600 dark:text-pink-400" />,
  Cloud: <Cloud className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
  Database: <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
  CheckSquare: <CheckSquare className="h-6 w-6 text-slate-600 dark:text-slate-400" />,
  Bot: <Bot className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
  Cpu: <Cpu className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
  Layers: <Layers className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
  Sparkles: <Sparkles className="h-6 w-6 text-amber-500 dark:text-amber-400" />,
  Video: <Video className="h-6 w-6 text-red-500 dark:text-red-400" />,
  Mic: <Mic className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />,
  Search: <Search className="h-6 w-6 text-sky-500 dark:text-sky-400" />,
  Server: <Server className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />,
  BarChart3: <BarChart3 className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
  Globe: <Globe className="h-6 w-6 text-teal-500 dark:text-teal-400" />,
  MessageSquare: <MessageSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-orange-500 dark:text-orange-400" />,
  Scale: <Scale className="h-6 w-6 text-slate-700 dark:text-slate-300" />,
  Users: <Users className="h-6 w-6 text-pink-500 dark:text-pink-400" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-violet-500 dark:text-violet-400" />,
  Activity: <Activity className="h-6 w-6 text-rose-500 dark:text-rose-400" />
};

export default function CategoriesPage() {
  const [search, setSearch] = useState('');

  // Calculate tool and repo counts dynamically per category
  const categoriesWithStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catNorm = cat.name.toLowerCase();
      const shortNorm = (cat.shortName || '').toLowerCase();

      const toolMatches = toolsData.filter((t) => {
        const tCat = (t.category || '').toLowerCase();
        return tCat.includes(catNorm) || tCat.includes(shortNorm);
      }).length;

      const repoMatches = repositoriesData.filter((r) => {
        const rCat = (r.category || '').toLowerCase();
        return rCat.includes(catNorm) || rCat.includes(shortNorm);
      }).length;

      return {
        ...cat,
        actualToolsCount: toolMatches,
        actualReposCount: repoMatches,
        totalItems: toolMatches + repoMatches,
      };
    });
  }, []);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categoriesWithStats;
    const q = search.toLowerCase().trim();
    return categoriesWithStats.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.shortName || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    );
  }, [categoriesWithStats, search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F1] dark:bg-[#070B14] relative">
      <Navbar activeTab="categories" />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 text-xs font-semibold border border-teal-200/50 dark:border-teal-800/50">
            <Layers className="h-3.5 w-3.5" />
            <span>27 Standardized Engineering Domains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Directory Categories & Taxonomy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Browse our complete engineering taxonomy covering AI agents, autonomous testing, runtime infrastructure, and developer utilities.
          </p>

          {/* Search bar inside categories */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter categories..."
              className="w-full rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-teal-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform shadow-sm">
                    {iconMap[cat.icon] || <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400" />}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                    {cat.totalItems} items
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <Link
                  href={`/tools?category=${encodeURIComponent(cat.name)}`}
                  className="font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                >
                  <span>{cat.actualToolsCount} Tools</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>

                <Link
                  href={`/repositories?category=${encodeURIComponent(cat.name)}`}
                  className="font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  {cat.actualReposCount} Repositories
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
