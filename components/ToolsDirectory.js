'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Sparkles, X, 
  Bookmark, ArrowDown, RotateCcw, Flame
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import ToolSidebarModal from '@/components/ToolSidebarModal';
import CategoryPillSlider from '@/components/CategoryPillSlider';
import { useBookmarks } from '@/components/BookmarksContext';
import { useToast } from '@/components/ToastContext';
import { toolsData, CATEGORIES } from '@/data';

const PAGE_SIZE = 36;

export default function ToolsDirectory({ initialCategory = null, initialSearch = '' }) {
  const { bookmarkedTools } = useBookmarks();
  const { showToast } = useToast();
  const gridTopRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewFilter, setViewFilter] = useState('all'); // 'all' | 'trending' | 'latest' | 'saved'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'trending' | 'latest' | 'oldest' | 'name-asc' | 'name-desc'
  const [pricingFilter, setPricingFilter] = useState('all'); // 'all' | 'free' | 'freemium' | 'opensource'
  const [yearFilter, setYearFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Smoothly scroll to the top of the cards list (especially on mobile)
  const scrollToFirstItem = () => {
    if (typeof window !== 'undefined' && gridTopRef.current) {
      const isMobile = window.innerWidth < 768;
      const rect = gridTopRef.current.getBoundingClientRect();
      // On mobile or when scrolled past the top, scroll to show the first item
      if (isMobile || rect.top < 60 || rect.top > 300) {
        const navOffset = 72; // sticky navbar offset
        const targetY = window.pageYOffset + rect.top - navOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  };

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, selectedCategory, viewFilter, sortBy, pricingFilter, yearFilter, monthFilter]);

  // Dynamically extract all available launch years from data
  const yearsList = useMemo(() => {
    const set = new Set();
    toolsData.forEach((t) => {
      const yr = t.launchYear || (t.launchDate ? t.launchDate.substring(0, 4) : null) || (t.releaseDate ? t.releaseDate.substring(0, 4) : null);
      if (yr) set.add(yr);
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, []);

  const monthsList = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];

  // Filter & Search Logic
  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchDesc = tool.description.toLowerCase().includes(q);
        const matchCat = tool.category.toLowerCase().includes(q);
        const matchTags = (tool.tags || []).some(t => t.toLowerCase().includes(q));
        const matchUseCases = (tool.useCases || []).some(u => u.toLowerCase().includes(q));
        const matchFeatures = (tool.features || []).some(f => f.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchTags && !matchUseCases && !matchFeatures) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory) {
        const catObj = CATEGORIES.find(c => c.name === selectedCategory || c.id === selectedCategory || c.shortName === selectedCategory || c.slug === selectedCategory);
        const catNormalized = selectedCategory.toLowerCase();
        const toolCatNormalized = (tool.category || '').toLowerCase();
        const toolSubcatNormalized = (tool.subcategory || '').toLowerCase();
        
        const directMatch = toolCatNormalized.includes(catNormalized) || toolSubcatNormalized.includes(catNormalized);
        let aliasMatch = false;
        if (catObj) {
          const shortNorm = (catObj.shortName || '').toLowerCase();
          const slugNorm = (catObj.slug || '').toLowerCase();
          const nameNorm = (catObj.name || '').toLowerCase();
          aliasMatch = toolCatNormalized.includes(shortNorm) || 
                       toolCatNormalized.includes(slugNorm) ||
                       toolCatNormalized.includes(nameNorm) ||
                       toolSubcatNormalized.includes(shortNorm) ||
                       toolSubcatNormalized.includes(slugNorm);
        }

        if (!directMatch && !aliasMatch) {
          return false;
        }
      }

      // 3. Quick Tabs
      if (viewFilter === 'trending' && !tool.trending) {
        return false;
      }
      if (viewFilter === 'latest') {
        const yr = tool.launchYear || (tool.launchDate ? tool.launchDate.substring(0, 4) : null);
        if (yr !== '2026') return false;
      }
      if (viewFilter === 'saved' && !bookmarkedTools.includes(tool.id)) {
        return false;
      }

      // 4. Year Filter
      if (yearFilter !== 'all') {
        const toolYear = tool.launchYear || (tool.launchDate ? tool.launchDate.substring(0, 4) : null) || (tool.releaseDate ? tool.releaseDate.substring(0, 4) : null);
        if (toolYear !== yearFilter) {
          return false;
        }
      }

      // 5. Month Filter
      if (monthFilter !== 'all') {
        const d = tool.launchDate || tool.releaseDate;
        const m = d ? d.substring(5, 7) : null;
        if (m !== monthFilter) return false;
      }

      // 6. Pricing
      if (pricingFilter === 'free' && tool.pricing !== 'Free') return false;
      if (pricingFilter === 'freemium' && tool.pricing !== 'Freemium') return false;
      if (pricingFilter === 'opensource' && !tool.openSource) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') {
        return (b.dailyTrendingScore || (b.trending ? 100 : 0)) - (a.dailyTrendingScore || (a.trending ? 100 : 0));
      }
      if (sortBy === 'latest') {
        const dateB = new Date(b.launchDate || b.releaseDate || 0);
        const dateA = new Date(a.launchDate || a.releaseDate || 0);
        return dateB - dateA;
      }
      if (sortBy === 'oldest') {
        const dateA = new Date(a.launchDate || a.releaseDate || 0);
        const dateB = new Date(b.launchDate || b.releaseDate || 0);
        return dateA - dateB;
      }
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, viewFilter, sortBy, pricingFilter, yearFilter, monthFilter, bookmarkedTools]);

  const displayedTools = useMemo(() => {
    return filteredTools.slice(0, visibleCount);
  }, [filteredTools, visibleCount]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setTimeout(scrollToFirstItem, 60);
  };

  const handleViewFilterSelect = (vf) => {
    setViewFilter(vf);
    setTimeout(scrollToFirstItem, 60);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setTimeout(scrollToFirstItem, 60);
  };

  const handlePricingChange = (p) => {
    setPricingFilter(p);
    setTimeout(scrollToFirstItem, 60);
  };

  const handleSelectAlternative = (altName) => {
    const found = toolsData.find(t => t.name.toLowerCase() === altName.toLowerCase());
    if (found) {
      setSelectedTool(found);
    }
  };

  const activeFiltersCount = (pricingFilter !== 'all' ? 1 : 0) + 
                             (yearFilter !== 'all' ? 1 : 0) + 
                             (monthFilter !== 'all' ? 1 : 0) + 
                             (selectedCategory ? 1 : 0) + 
                             (viewFilter !== 'all' ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setViewFilter('all');
    setPricingFilter('all');
    setYearFilter('all');
    setMonthFilter('all');
    setSortBy('popular');
    showToast('Filters cleared');
    setTimeout(scrollToFirstItem, 60);
  };

  return (
    <div className="relative">
      <div className="ambient-glow" />

      <div className="relative z-10">
        
        {/* Main Title Section */}
        <div className="pt-2 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 text-accent-primary text-xs font-bold mb-3 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{toolsData.length.toLocaleString()} Curated Platforms & Agents</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Discover <span className="text-accent-gradient">Developer Tools</span>
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Explore AI coding assistants, agent runtimes, testing platforms, and developer utilities to ship high-impact software faster.
              </p>
            </div>

            {/* Live Filter Indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Showing {displayedTools.length} of {filteredTools.length.toLocaleString()} tools</span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-semibold transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative max-w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name, category, features, or keywords (e.g. 'code completion', 'autonomous agent')..."
            className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-3.5 pl-11 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 dark:border-slate-800 dark:bg-[#0D1322]/90 dark:text-white dark:placeholder:text-slate-500 shadow-sm backdrop-blur transition-all"
            style={{ borderColor: searchQuery ? 'var(--primary)' : undefined }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Carousel Slider */}
        <div className="mt-4">
          <CategoryPillSlider
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Anchor point to scroll to on mobile when user clicks any filter/tab */}
        <div ref={gridTopRef} className="scroll-mt-20" />

        {/* Sub-bar: Filter Tabs & Sorting */}
        <div className="mt-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left sub-tabs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => handleViewFilterSelect('all')}
              className={`pb-1 text-sm font-semibold relative transition-colors ${
                viewFilter === 'all'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              All Tools
              {viewFilter === 'all' && (
                <span className="absolute -bottom-4 left-0 right-0 h-[2.5px] bg-accent-gradient rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleViewFilterSelect('trending')}
              className={`pb-1 text-sm font-semibold relative transition-colors flex items-center gap-1 ${
                viewFilter === 'trending'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Flame className="h-4 w-4 text-amber-500" />
              <span>Trending Today</span>
              {viewFilter === 'trending' && (
                <span className="absolute -bottom-4 left-0 right-0 h-[2.5px] bg-accent-gradient rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleViewFilterSelect('latest')}
              className={`pb-1 text-sm font-semibold relative transition-colors ${
                viewFilter === 'latest'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              ✨ 2026 Launches
              {viewFilter === 'latest' && (
                <span className="absolute -bottom-4 left-0 right-0 h-[2.5px] bg-accent-gradient rounded-full" />
              )}
            </button>

            {bookmarkedTools.length > 0 && (
              <button
                onClick={() => handleViewFilterSelect('saved')}
                className={`pb-1 text-sm font-semibold relative transition-colors flex items-center gap-1.5 ${
                  viewFilter === 'saved'
                    ? 'text-amber-500 dark:text-amber-400 font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5 fill-current" />
                <span>Saved Stack ({bookmarkedTools.length})</span>
                {viewFilter === 'saved' && (
                  <span className="absolute -bottom-4 left-0 right-0 h-[2.5px] bg-amber-500 rounded-full" />
                )}
              </button>
            )}
          </div>

          {/* Right controls: Sort Dropdown & Filter settings icon */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none dark:border-slate-800 dark:bg-[#0D1322] dark:text-slate-200 cursor-pointer shadow-xs"
              >
                <option value="popular">⭐ Most Popular</option>
                <option value="trending">🔥 Highest Velocity</option>
                <option value="latest">📅 Latest Launched</option>
                <option value="oldest">⏳ Pioneer Tools</option>
                <option value="name-asc">🔤 Alphabetical (A–Z)</option>
                <option value="name-desc">🔤 Alphabetical (Z–A)</option>
              </select>
            </div>

            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              aria-label="Filter settings"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors shadow-xs ${
                showFilterMenu || activeFiltersCount > 0
                  ? 'border-accent-primary bg-slate-100 dark:bg-slate-800 text-accent-primary'
                  : 'border-slate-200/80 bg-white/90 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0D1322] dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-primary text-[10px] text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Drawer / Accordion */}
        {showFilterMenu && (
          <div className="my-4 p-4 rounded-2xl border border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-[#0D1322]/80 backdrop-blur flex flex-col gap-3 text-xs animate-in slide-in-from-top-1 duration-150 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Pricing Model:</span>
                {['all', 'free', 'freemium', 'opensource'].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePricingChange(p)}
                    className={`px-3 py-1 rounded-xl capitalize border font-semibold transition-all ${
                      pricingFilter === p
                        ? 'bg-accent-gradient text-white border-transparent shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {p === 'opensource' ? 'Open Source' : p}
                  </button>
                ))}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-rose-500 hover:underline font-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Launch Year & Month Selectors */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Launch Year:</span>
                <select
                  value={yearFilter}
                  onChange={(e) => {
                    setYearFilter(e.target.value);
                    setTimeout(scrollToFirstItem, 60);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer shadow-xs"
                >
                  <option value="all">All Launch Years</option>
                  {yearsList.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Launch Month:</span>
                <select
                  value={monthFilter}
                  onChange={(e) => {
                    setMonthFilter(e.target.value);
                    setTimeout(scrollToFirstItem, 60);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer shadow-xs"
                >
                  <option value="all">All Months</option>
                  {monthsList.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid: Instant 60fps rendering with progressive load */}
        {filteredTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 pt-4 pb-8">
              {displayedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isSelected={selectedTool?.id === tool.id}
                  onSelect={(t) => setSelectedTool(t)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredTools.length && (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {displayedTools.length} of {filteredTools.length.toLocaleString()} tools
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-accent-gradient text-white shadow-md hover:opacity-95 transition-all active:scale-95"
                  >
                    <span>Load {Math.min(PAGE_SIZE, filteredTools.length - visibleCount)} More Tools</span>
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setVisibleCount(filteredTools.length)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    Show All
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 my-6 bg-white/50 dark:bg-slate-900/40">
            <Sparkles className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
              No matching tools found
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or clearing category filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-accent-gradient text-white shadow-xs transition-opacity"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Floating Right Sidebar Drawer */}
      {selectedTool && (
        <ToolSidebarModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
          onSelectAlternative={handleSelectAlternative}
        />
      )}
    </div>
  );
}
