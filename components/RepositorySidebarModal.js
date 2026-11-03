'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  X, ExternalLink, Github, Check, BookOpen, 
  Share2, CheckCheck, Star, GitFork, Terminal,
  Copy, Bookmark, ArrowRight, ShieldCheck, Code
} from 'lucide-react';
import PricingBadge from './PricingBadge';
import { useBookmarks } from './BookmarksContext';
import { useToast } from './ToastContext';

export default function RepositorySidebarModal({ repo, onClose }) {
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const { isRepoBookmarked, toggleBookmarkRepo } = useBookmarks();
  const { showToast } = useToast();
  const scrollContainerRef = useRef(null);

  // Scroll to top when repo opens or changes (crucial on mobile)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [repo?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!repo) return null;

  const {
    id,
    name,
    owner,
    fullName,
    description,
    category,
    subcategory,
    language,
    languageColor,
    stars,
    forks,
    license,
    latestRelease,
    githubUrl,
    documentation,
    installCommand,
    features = [],
    useCases = [],
    gettingStarted,
    slug
  } = repo;

  const isBookmarked = isRepoBookmarked(id);

  const handleCopyClone = () => {
    const cmd = installCommand || `git clone ${githubUrl}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedClone(true);
    showToast('Copied install command!');
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/repositories/${slug || id}`;
      navigator.clipboard.writeText(url);
      setCopiedShare(true);
      showToast('Copied link to repository!');
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleBookmarkClick = () => {
    toggleBookmarkRepo(id);
    if (isBookmarked) {
      showToast(`Removed ${fullName} from saved stack`, 'info');
    } else {
      showToast(`Saved ${fullName} to your stack!`, 'success');
    }
  };

  return (
    <>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" 
      />

      <aside 
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] md:w-[500px] lg:w-[540px] xl:w-[580px] bg-white dark:bg-[#0B1120] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Repository Details
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-200/50 dark:border-teal-800/50">
              <ShieldCheck className="h-3 w-3" />
              Verified Open Source
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleBookmarkClick}
              title={isBookmarked ? 'Remove from saved' : 'Save to bookmarks'}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCopyShare}
              title="Copy share link"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copiedShare ? <CheckCheck className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Info */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-md border border-slate-800 dark:bg-slate-800">
              <Github className="h-8 w-8 text-emerald-400" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>{owner}</span>
                <span>/</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white truncate">
                {name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <PricingBadge pricing="Open Source" openSource={true} />
                {license && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                    {license}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* GitHub Metrics Pill Strip */}
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{stars?.toLocaleString() || 0}</span>
              </div>
              <span className="text-[10px] text-slate-400">GitHub Stars</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-slate-700 dark:text-slate-300 font-bold text-sm">
                <GitFork className="h-3.5 w-3.5" />
                <span>{forks?.toLocaleString() || 0}</span>
              </div>
              <span className="text-[10px] text-slate-400">Forks</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-sm">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor || '#0D9488' }} />
                <span>{language || 'Code'}</span>
              </div>
              <span className="text-[10px] text-slate-400">Primary Language</span>
            </div>
          </div>

          {/* Quick Install Terminal Box */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Quick Install Command
            </span>
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner">
              <span className="truncate">
                {installCommand || `git clone ${githubUrl}.git`}
              </span>
              <button
                onClick={handleCopyClone}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                title="Copy command"
              >
                {copiedClone ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent-gradient px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>

            <Link
              href={`/repositories/${slug || id}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-colors shadow-sm"
            >
              <span>Full Repo Page</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              About Repository
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Key Features
              </h4>
              <div className="space-y-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Getting started */}
          {gettingStarted && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Getting Started
              </h4>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {gettingStarted}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs">
          <Link
            href={`/repositories/${slug || id}`}
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Open Dedicated Repository Page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-slate-400 text-[11px]">
            DevAtlas Verified
          </span>
        </div>

      </aside>
    </>
  );
}
