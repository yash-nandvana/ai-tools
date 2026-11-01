'use client';

import { useState } from 'react';
import { ArrowUpRight, Calendar, Bookmark, ShieldCheck, Sparkles, Flame } from 'lucide-react';
import PricingBadge from './PricingBadge';
import { useBookmarks } from './BookmarksContext';
import { useToast } from './ToastContext';

export default function ToolCard({ tool, isSelected, onSelect }) {
  const { isToolBookmarked, toggleBookmarkTool } = useBookmarks();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const {
    id,
    name,
    category,
    description,
    pricing,
    openSource,
    tags,
    logo,
    website,
    slug,
  } = tool;

  const isBookmarked = isToolBookmarked(id);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const displayDate = tool.launchDate || tool.releaseDate;
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmarkTool(id);
    if (isBookmarked) {
      showToast(`Removed ${name} from saved stack`, 'info');
    } else {
      showToast(`Saved ${name} to your stack!`, 'success');
    }
  };

  return (
    <div
      onClick={() => onSelect(tool)}
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 cursor-pointer bg-white/95 dark:bg-[#0D1322]/90 backdrop-blur-sm hover:-translate-y-1 ${
        isSelected
          ? 'border-accent-primary ring-2 ring-accent-primary shadow-lg'
          : 'border-slate-200/90 dark:border-slate-800/80 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-black/40 shadow-xs'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {logo && !imgError ? (
              <img
                src={logo}
                alt={`${name} logo`}
                loading="lazy"
                className="h-10 w-10 shrink-0 rounded-xl object-contain border border-slate-100 bg-white p-1 dark:border-slate-800 dark:bg-slate-800/80 shadow-xs group-hover:scale-105 transition-transform"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-xs bg-accent-gradient text-white shadow-xs group-hover:scale-105 transition-transform">
                {initials}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-accent-primary transition-colors truncate">
                  {name}
                </h3>
                {tool.status === 'verified' && (
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-primary shrink-0" title="Verified developer tool" />
                )}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                {category.split('&')[0].trim()}
              </p>
            </div>
          </div>

          {/* Quick Actions: Bookmark & External */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remove from saved' : 'Save to bookmarks'}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={`Visit ${name} website`}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Description: 2-line clean clamped text */}
        <p className="mt-3.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer tags, release date, and pricing */}
      <div className="mt-4 pt-3 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/80">
        {formattedDate && (
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-accent-primary" />
              <span>Launched {formattedDate}</span>
            </span>
            {tool.trending && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                <Flame className="h-2.5 w-2.5 fill-current" />
                <span>Trending</span>
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <PricingBadge pricing={pricing} openSource={openSource} />

          <div className="flex items-center gap-1.5">
            {tags && tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 truncate max-w-[100px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
