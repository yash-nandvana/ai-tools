'use client';

import { useState } from 'react';
import { Sparkles, Star, GitFork, ExternalLink, ArrowRight, Flame } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import RepositoryCard from '@/components/RepositoryCard';
import ToolSidebarModal from '@/components/ToolSidebarModal';
import RepositorySidebarModal from '@/components/RepositorySidebarModal';
import { toolsData, repositoriesData } from '@/data';

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'tools' | 'repos'
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const trendingTools = toolsData.filter((t) => t.trending);
  const trendingRepos = repositoriesData.filter((r) => r.trending);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070B14] relative">
      <Navbar activeTab="trending" />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full relative">
        {/* Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-xs font-semibold border border-amber-200/50 dark:border-amber-800/50">
            <Flame className="h-3.5 w-3.5" />
            <span>High Velocity Adoption Radar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trending Tools & Repositories
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Curated software platforms, coding agents, and open-source GitHub repositories experiencing accelerated developer momentum.
          </p>

          {/* Subtabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              All Trending ({trendingTools.length + trendingRepos.length})
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${
                activeTab === 'tools'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Tools ({trendingTools.length})
            </button>
            <button
              onClick={() => setActiveTab('repos')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${
                activeTab === 'repos'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Repositories ({trendingRepos.length})
            </button>
          </div>
        </div>

        {/* Section 1: Trending Tools */}
        {(activeTab === 'all' || activeTab === 'tools') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Trending Software Tools</span>
                <span className="text-xs font-normal text-slate-400">({trendingTools.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {trendingTools.slice(0, activeTab === 'all' ? 16 : 48).map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isSelected={selectedTool?.id === tool.id}
                  onSelect={(t) => setSelectedTool(t)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Trending Repositories */}
        {(activeTab === 'all' || activeTab === 'repos') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Trending Open-Source Repositories</span>
                <span className="text-xs font-normal text-slate-400">({trendingRepos.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {trendingRepos.slice(0, activeTab === 'all' ? 16 : 48).map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  repo={repo}
                  isSelected={selectedRepo?.id === repo.id}
                  onSelect={(r) => setSelectedRepo(r)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modals */}
        {selectedTool && (
          <ToolSidebarModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
            onSelectAlternative={(alt) => {
              const f = toolsData.find(t => t.name.toLowerCase() === alt.toLowerCase());
              if (f) setSelectedTool(f);
            }}
          />
        )}

        {selectedRepo && (
          <RepositorySidebarModal
            repo={selectedRepo}
            onClose={() => setSelectedRepo(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
