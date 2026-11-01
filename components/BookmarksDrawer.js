'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  X, Bookmark, Trash2, Download, ExternalLink, ArrowRight,
  Code, Star, Sparkles, FolderArchive 
} from 'lucide-react';
import { useBookmarks } from './BookmarksContext';
import { useToast } from './ToastContext';
import { toolsData, repositoriesData } from '@/data';

export default function BookmarksDrawer({ isOpen, onClose, onSelectTool, onSelectRepo }) {
  const { 
    bookmarkedTools, 
    bookmarkedRepos, 
    toggleBookmarkTool, 
    toggleBookmarkRepo, 
    clearAllBookmarks 
  } = useBookmarks();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'tools' | 'repos'
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const savedToolObjects = toolsData.filter((t) => bookmarkedTools.includes(t.id));
  const savedRepoObjects = repositoriesData.filter((r) => bookmarkedRepos.includes(r.id));
  const totalCount = savedToolObjects.length + savedRepoObjects.length;

  const exportAsMarkdown = () => {
    let md = `# My DevAtlas Saved Stack\nGenerated on ${new Date().toLocaleDateString()}\n\n`;
    if (savedToolObjects.length > 0) {
      md += `## Saved Developer Tools (${savedToolObjects.length})\n`;
      savedToolObjects.forEach((t) => {
        md += `- [${t.name}](${t.website}) — ${t.category}: ${t.description}\n`;
      });
      md += '\n';
    }
    if (savedRepoObjects.length > 0) {
      md += `## Saved Open-Source Repositories (${savedRepoObjects.length})\n`;
      savedRepoObjects.forEach((r) => {
        md += `- [${r.fullName}](${r.githubUrl}) — ${r.language ? `[${r.language}] ` : ''}${r.description}\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devatlas-stack-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported saved stack as Markdown!');
  };

  return (
    <>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" 
      />

      <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] bg-white dark:bg-[#0B1120] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Bookmark className="h-4 w-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Saved Stack
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {totalCount} saved {totalCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {totalCount > 0 && (
              <button
                onClick={exportAsMarkdown}
                title="Export as Markdown"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1.5 font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter subtabs */}
        {totalCount > 0 && (
          <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'tools'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Tools ({savedToolObjects.length})
            </button>
            <button
              onClick={() => setActiveTab('repos')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'repos'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Repositories ({savedRepoObjects.length})
            </button>
          </div>
        )}

        {/* Content list */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {totalCount === 0 ? (
            <div className="py-20 text-center space-y-3">
              <FolderArchive className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                No items saved yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Click the bookmark star icon on any tool or repository card to build your personalized engineering stack.
              </p>
            </div>
          ) : (
            <>
              {/* Tools list */}
              {(activeTab === 'all' || activeTab === 'tools') && savedToolObjects.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Developer Tools ({savedToolObjects.length})
                  </div>
                  {savedToolObjects.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => {
                        onClose();
                        if (onSelectTool) onSelectTool(tool);
                      }}
                      className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 bg-white dark:bg-slate-900 cursor-pointer shadow-sm hover:shadow transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-8 w-8 rounded-lg object-contain bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-800"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-lg bg-teal-600/10 text-teal-600 font-bold text-xs flex items-center justify-center">
                            {tool.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors truncate">
                            {tool.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                            {tool.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmarkTool(tool.id);
                            showToast(`Removed ${tool.name} from saved`);
                          }}
                          className="p-1.5 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Repos list */}
              {(activeTab === 'all' || activeTab === 'repos') && savedRepoObjects.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Open Source Repositories ({savedRepoObjects.length})
                  </div>
                  {savedRepoObjects.map((repo) => (
                    <div
                      key={repo.id}
                      onClick={() => {
                        onClose();
                        if (onSelectRepo) onSelectRepo(repo);
                      }}
                      className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 bg-white dark:bg-slate-900 cursor-pointer shadow-sm hover:shadow transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs shrink-0">
                          <Code className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors truncate">
                            {repo.fullName}
                          </h4>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                            {repo.language ? `${repo.language} • ` : ''}⭐ {repo.stars?.toLocaleString() || 0}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmarkRepo(repo.id);
                            showToast(`Removed ${repo.name} from saved`);
                          }}
                          className="p-1.5 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        {totalCount > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => {
                if (confirm('Clear all saved bookmarks?')) {
                  clearAllBookmarks();
                  showToast('Cleared all saved items');
                }
              }}
              className="text-xs text-rose-500 hover:underline font-medium"
            >
              Clear all bookmarks
            </button>
            <span className="text-[11px] text-slate-400">
              Saved locally in browser
            </span>
          </div>
        )}

      </aside>
    </>
  );
}
