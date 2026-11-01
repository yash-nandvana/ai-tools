'use client';

import { useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Code2, CheckCircle2, 
  Terminal, Palette, Cloud, Database, ShieldCheck, 
  CheckSquare, Cpu, Layers, Bot, Sparkles, Video, Mic,
  Search, Server, BarChart3, Globe, MessageSquare, TrendingUp,
  Scale, Users, GraduationCap, Activity, LayoutGrid
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

const iconMap = {
  Code2: <Code2 className="h-3.5 w-3.5 text-emerald-500" />,
  CheckCircle2: <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />,
  Terminal: <Terminal className="h-3.5 w-3.5 text-blue-500" />,
  Palette: <Palette className="h-3.5 w-3.5 text-pink-500" />,
  Cloud: <Cloud className="h-3.5 w-3.5 text-amber-500" />,
  Database: <Database className="h-3.5 w-3.5 text-indigo-500" />,
  ShieldCheck: <ShieldCheck className="h-3.5 w-3.5 text-teal-500" />,
  CheckSquare: <CheckSquare className="h-3.5 w-3.5 text-slate-500" />,
  Bot: <Bot className="h-3.5 w-3.5 text-rose-500" />,
  Cpu: <Cpu className="h-3.5 w-3.5 text-violet-500" />,
  Layers: <Layers className="h-3.5 w-3.5 text-cyan-500" />,
  Sparkles: <Sparkles className="h-3.5 w-3.5 text-amber-500" />,
  Video: <Video className="h-3.5 w-3.5 text-red-500" />,
  Mic: <Mic className="h-3.5 w-3.5 text-emerald-500" />,
  Search: <Search className="h-3.5 w-3.5 text-sky-500" />,
  Server: <Server className="h-3.5 w-3.5 text-indigo-500" />,
  BarChart3: <BarChart3 className="h-3.5 w-3.5 text-blue-500" />,
  Globe: <Globe className="h-3.5 w-3.5 text-teal-500" />,
  MessageSquare: <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />,
  TrendingUp: <TrendingUp className="h-3.5 w-3.5 text-orange-500" />,
  Scale: <Scale className="h-3.5 w-3.5 text-slate-500" />,
  Users: <Users className="h-3.5 w-3.5 text-pink-500" />,
  GraduationCap: <GraduationCap className="h-3.5 w-3.5 text-violet-500" />,
  Activity: <Activity className="h-3.5 w-3.5 text-rose-500" />
};

export default function CategoryPillSlider({ selectedCategory, onSelectCategory }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const t = setTimeout(checkScroll, 100);
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      clearTimeout(t);
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 100);
      setTimeout(checkScroll, 350);
    }
  };

  const handlePillClick = (catName, e) => {
    onSelectCategory(catName);
    // On mobile, horizontally center the selected pill smoothly
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className="relative flex items-center py-2">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:bg-slate-800 shadow-md mr-2 z-10 transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Scrollable Pills Track */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* All Categories Pill */}
        <button
          onClick={(e) => handlePillClick(null, e)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 select-none ${
            selectedCategory === null
              ? 'bg-accent-gradient text-white shadow-md shadow-slate-900/10'
              : 'border border-slate-200/80 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 shadow-sm'
          }`}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span>All Categories</span>
        </button>

        {/* Dynamic Category Pills */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name || selectedCategory === cat.shortName;
          return (
            <button
              key={cat.id}
              onClick={(e) => handlePillClick(cat.name, e)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-accent-gradient text-white shadow-md shadow-slate-900/10 font-bold'
                  : 'border border-slate-200/80 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 shadow-sm'
              }`}
            >
              <span className="shrink-0">{iconMap[cat.icon] || <Sparkles className="h-3.5 w-3.5" />}</span>
              <span>{cat.shortName || cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:bg-slate-800 shadow-md ml-2 z-10 transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
