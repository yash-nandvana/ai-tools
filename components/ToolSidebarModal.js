'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  X, ExternalLink, Github, Check, BookOpen, 
  Share2, CheckCheck, Zap, MessageSquare, Layers, 
  Sparkles, Terminal, Shield, ArrowRight, DollarSign,
  Bookmark, ShieldCheck, Copy
} from 'lucide-react';
import PricingBadge from './PricingBadge';
import { useBookmarks } from './BookmarksContext';
import { useToast } from './ToastContext';

export default function ToolSidebarModal({ tool, onClose, onSelectAlternative }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const { isToolBookmarked, toggleBookmarkTool } = useBookmarks();
  const { showToast } = useToast();
  const scrollContainerRef = useRef(null);

  // Scroll to top when tool opens or changes (crucial on mobile)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [tool?.id, activeTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tool) return null;

  const {
    id,
    name,
    category,
    subcategory,
    description,
    overview,
    website,
    github,
    documentation,
    pricingUrl,
    pricing,
    openSource,
    platform,
    useCases = [],
    features = [],
    alternatives = [],
    logo,
    slug
  } = tool;

  const isBookmarked = isToolBookmarked(id);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/tools/${slug || id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      showToast('Copied share link to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmarkClick = () => {
    toggleBookmarkTool(id);
    if (isBookmarked) {
      showToast(`Removed ${name} from saved stack`, 'info');
    } else {
      showToast(`Saved ${name} to your stack!`, 'success');
    }
  };

  const featureIcons = [
    <Zap className="h-4 w-4 text-emerald-500" key="zap" />,
    <MessageSquare className="h-4 w-4 text-teal-500" key="msg" />,
    <Layers className="h-4 w-4 text-blue-500" key="layers" />,
    <Sparkles className="h-4 w-4 text-purple-500" key="sparkles" />,
    <Terminal className="h-4 w-4 text-amber-500" key="term" />,
    <Shield className="h-4 w-4 text-rose-500" key="shield" />,
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" 
      />

      {/* Floating Right Overlay Drawer */}
      <aside 
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] md:w-[500px] lg:w-[540px] xl:w-[580px] bg-white dark:bg-[#0B1120] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Top Header Row with Close & Actions */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Tool Overview
            </span>
            {tool.status === 'verified' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-primary bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            )}
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
              onClick={handleCopyLink}
              title="Copy share link"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? <CheckCheck className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
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
          
          {/* Main Info Header */}
          <div className="flex items-start gap-4">
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="h-16 w-16 shrink-0 rounded-2xl object-contain border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800 shadow-sm"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-accent-gradient text-white flex items-center justify-center font-bold text-xl shadow-md">
                {name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {name}
                </h2>
                <PricingBadge pricing={pricing} openSource={openSource} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {category} {subcategory ? `• ${subcategory}` : ''}
              </p>
            </div>
          </div>

          {/* Quick External Action CTAs */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent-gradient px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
            >
              <span>Visit Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-colors shadow-sm"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Source</span>
              </a>
            ) : documentation ? (
              <a
                href={documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-colors shadow-sm"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Docs</span>
              </a>
            ) : (
              <Link
                href={`/tools/${slug || id}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-colors shadow-sm"
              >
                <span>Full Details Page</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-semibold">
            {['overview', 'features', 'use cases', 'alternatives'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 capitalize relative transition-colors ${
                  activeTab === tab
                    ? 'text-accent-primary font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gradient rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Description
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {description}
                </p>
                {overview && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
                    {overview}
                  </p>
                )}
              </div>

              {platform && platform.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Supported Runtimes & Platforms
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {platform.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Features */}
          {activeTab === 'features' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Core Capabilities & Architecture
              </h4>
              <div className="space-y-2.5">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-xs"
                  >
                    <div className="mt-0.5 shrink-0">
                      {featureIcons[idx % featureIcons.length]}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Use Cases */}
          {activeTab === 'use cases' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Engineering Workflows
              </h4>
              <div className="space-y-2.5">
                {useCases.map((uc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-xs"
                  >
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {uc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Alternatives */}
          {activeTab === 'alternatives' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Market Alternatives
              </h4>
              {alternatives && alternatives.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {alternatives.map((alt) => (
                    <button
                      key={alt}
                      onClick={() => onSelectAlternative(alt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 transition-colors shadow-sm"
                    >
                      <span>{alt}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  No direct alternatives mapped yet. Browse related tools in {category}.
                </p>
              )}
            </div>
          )}

        </div>

        {/* Footer Link */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs">
          <Link
            href={`/tools/${slug || id}`}
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Open Dedicated Tool Page</span>
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
