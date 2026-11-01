'use client';

import { useState } from 'react';
import { ArrowUpRight, Calendar, Star, GitFork, Code, Bookmark, Flame } from 'lucide-react';
import PricingBadge from './PricingBadge';
import { useBookmarks } from './BookmarksContext';
import { useToast } from './ToastContext';

export default function RepositoryCard({ repo, isSelected, onSelect }) {
  const { isRepoBookmarked, toggleBookmarkRepo } = useBookmarks();
  const { showToast } = useToast();

  const {
    id,
    name,
    owner,
    fullName,
    description,
    category,
    language,
    languageColor,
    stars,
    forks,
    githubUrl,
    releaseDate,
    latestRelease,
  } = repo;

  const isBookmarked = isRepoBookmarked(id);

  const displayDate = repo.launchDate || repo.releaseDate;
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmarkRepo(id);
    if (isBookmarked) {
      showToast(`Removed ${fullName} from saved stack`, 'info');
    } else {
      showToast(`Saved ${fullName} to your stack!`, 'success');
    }
  };

  return (
    <div
      onClick={() => onSelect(repo)}
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
            <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-950 text-white flex items-center justify-center dark:bg-slate-800 border border-slate-800 shadow-xs group-hover:scale-105 transition-transform">
              <Code className="h-5 w-5 text-accent-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                <span>{owner}</span>
                <span>/</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-accent-primary transition-colors truncate">
                {name}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                {category.split('&')[0].trim()}
              </p>
            </div>
          </div>

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
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={`View ${fullName} on GitHub`}
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

      {/* Bottom Metrics */}
      <div className="mt-4 pt-3 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        {formattedDate && (
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
              <Calendar className="h-3 w-3 text-accent-primary" />
              <span>Launched {formattedDate}</span>
            </span>
            {repo.trending ? (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                <Flame className="h-2.5 w-2.5 fill-current" />
                <span>Trending</span>
              </span>
            ) : latestRelease ? (
              <span className="font-mono text-slate-400 text-[10px]">
                {latestRelease}
              </span>
            ) : null}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            {language && (
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: languageColor || 'var(--primary)' }}
                />
                {language}
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] font-medium">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>{stars?.toLocaleString() || 0}</span>
            </span>
          </div>

          <PricingBadge pricing="Open Source" openSource={true} />
        </div>
      </div>
    </div>
  );
}
