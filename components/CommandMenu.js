'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, X, ArrowRight, Sparkles, Code, 
  Layers, ExternalLink, Bookmark, Compass, TrendingUp,
  FileText, ShieldCheck, Terminal
} from 'lucide-react';
import { toolsData, repositoriesData, CATEGORIES } from '@/data';

export default function CommandMenu({ isOpen, onClose, onSelectTool, onSelectRepo }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  // Listen for global Cmd+K / Ctrl+K
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search results
  const results = (() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Default suggested shortcuts
      return [
        { type: 'nav', id: 'nav-tools', title: 'Browse All Tools', subtitle: 'Explore 2,100+ developer platforms', path: '/tools', icon: 'tool' },
        { type: 'nav', id: 'nav-repos', title: 'Explore Open-Source Repositories', subtitle: '1,250+ GitHub projects with stats', path: '/repositories', icon: 'repo' },
        { type: 'nav', id: 'nav-trending', title: 'Trending Velocity', subtitle: 'Fastest growing software & repos', path: '/trending', icon: 'trending' },
        { type: 'nav', id: 'nav-categories', title: 'Taxonomy & Categories', subtitle: 'Browse 27 technical domains', path: '/categories', icon: 'category' },
        { type: 'nav', id: 'nav-research', title: 'Research & Verification Queue', subtitle: 'Submit new tools and view verification logs', path: '/research', icon: 'research' },
        { type: 'nav', id: 'nav-about', title: 'About DevAtlas Architecture', subtitle: 'Directory principles and criteria', path: '/about', icon: 'about' },
      ];
    }

    const matchedTools = toolsData
      .filter((t) => t.name.toLowerCase().includes(q) || (t.tags || []).some(tag => tag.toLowerCase().includes(q)) || t.category.toLowerCase().includes(q))
      .slice(0, 5)
      .map((t) => ({ type: 'tool', id: t.id, title: t.name, subtitle: `${t.category} • ${t.pricing}`, item: t }));

    const matchedRepos = repositoriesData
      .filter((r) => r.name.toLowerCase().includes(q) || r.fullName.toLowerCase().includes(q) || (r.language || '').toLowerCase().includes(q))
      .slice(0, 4)
      .map((r) => ({ type: 'repo', id: r.id, title: r.fullName, subtitle: `${r.language || 'Code'} • ⭐ ${r.stars?.toLocaleString() || 0}`, item: r }));

    const matchedCats = CATEGORIES
      .filter((c) => c.name.toLowerCase().includes(q) || (c.shortName || '').toLowerCase().includes(q))
      .slice(0, 3)
      .map((c) => ({ type: 'category', id: c.id, title: c.name, subtitle: `${c.toolsCount || 0} tools`, item: c }));

    return [...matchedTools, ...matchedRepos, ...matchedCats];
  })();

  const handleSelect = (result) => {
    onClose();
    if (result.type === 'nav') {
      router.push(result.path);
    } else if (result.type === 'tool') {
      if (onSelectTool) {
        onSelectTool(result.item);
      } else {
        router.push(`/tools/${result.item.slug || result.item.id}`);
      }
    } else if (result.type === 'repo') {
      if (onSelectRepo) {
        onSelectRepo(result.item);
      } else {
        router.push(`/repositories/${result.item.slug || result.item.id}`);
      }
    } else if (result.type === 'category') {
      router.push(`/categories`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-x-0 top-16 sm:top-24 z-50 mx-auto max-w-xl px-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1120] shadow-2xl">
          
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search tools, repos, categories or type a command..."
              className="w-full bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
            />
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline-flex items-center rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                ESC
              </span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
                No matching results found for "{query}"
              </div>
            ) : (
              results.map((res, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={res.id || idx}
                    onClick={() => handleSelect(res)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-slate-800 text-accent-primary font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        res.type === 'tool' ? 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400' :
                        res.type === 'repo' ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200' :
                        'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                      }`}>
                        {res.type === 'tool' && <Sparkles className="h-4 w-4" />}
                        {res.type === 'repo' && <Code className="h-4 w-4" />}
                        {res.type === 'category' && <Layers className="h-4 w-4" />}
                        {res.type === 'nav' && <Compass className="h-4 w-4" />}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate font-medium text-slate-900 dark:text-white">
                          {res.title}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                          {res.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        {res.type}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer tips */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-4 py-2 text-[11px] text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="flex items-center gap-1.5">
              <span className="font-mono">↑↓</span> to navigate • <span className="font-mono">↵</span> to select
            </span>
            <span>DevAtlas Command Hub</span>
          </div>

        </div>
      </div>
    </>
  );
}
