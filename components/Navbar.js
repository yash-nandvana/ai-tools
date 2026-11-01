'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sun, Moon, Search, Bookmark, Menu, X, 
  Sparkles, Compass, Layers, ShieldCheck, Flame, GitFork,
  Palette, Check
} from 'lucide-react';
import { useTheme, ACCENT_PALETTES } from './ThemeProvider';
import { useBookmarks } from './BookmarksContext';
import CommandMenu from './CommandMenu';
import BookmarksDrawer from './BookmarksDrawer';

export default function Navbar({ activeTab, onTabChange }) {
  const { theme, accent, toggleTheme, setAccent, mounted } = useTheme();
  const { totalBookmarks } = useBookmarks();
  const pathname = usePathname();
  const router = useRouter();

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef(null);

  // Close palette dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setIsPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global keydown listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (tab, path) => {
    setIsMobileMenuOpen(false);
    if (onTabChange && (pathname === '/' || pathname === '/tools' || pathname === '/repositories')) {
      onTabChange(tab);
      if (pathname !== '/') router.push('/');
    } else {
      router.push(path);
    }
  };

  const isCurrent = (tab, path) => {
    if (pathname === '/') {
      return activeTab === tab;
    }
    return pathname.startsWith(path);
  };

  const currentPalette = ACCENT_PALETTES.find((p) => p.id === accent) || ACCENT_PALETTES[0];

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#070B14]/85 transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo & Name */}
          <Link 
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  DevAtlas
                </span>
                <span className="hidden sm:inline-flex items-center rounded-md bg-accent-gradient text-white px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase shadow-sm">
                  PRO
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            <button
              onClick={() => handleNavClick('tools', '/tools')}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                isCurrent('tools', '/tools')
                  ? 'bg-slate-100 text-accent-primary dark:bg-slate-800/80 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
              }`}
            >
              Tools
            </button>

            <button
              onClick={() => handleNavClick('repositories', '/repositories')}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                isCurrent('repositories', '/repositories')
                  ? 'bg-slate-100 text-accent-primary dark:bg-slate-800/80 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
              }`}
            >
              Repositories
            </button>

            <Link
              href="/categories"
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                pathname === '/categories'
                  ? 'bg-slate-100 text-accent-primary dark:bg-slate-800/80 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
              }`}
            >
              Categories
            </Link>

            <Link
              href="/trending"
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                pathname === '/trending'
                  ? 'bg-slate-100 text-accent-primary dark:bg-slate-800/80 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
              }`}
            >
              <Flame className="h-4 w-4 text-amber-500" />
              <span>Trending</span>
            </Link>

            <Link
              href="/research"
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                pathname === '/research'
                  ? 'bg-slate-100 text-accent-primary dark:bg-slate-800/80 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
              }`}
            >
              Research
            </Link>

            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                pathname === '/about'
                  ? 'bg-slate-100 text-accent-primary dark:bg-slate-800/80 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Controls: Palette Picker + Search + Bookmarks + Theme */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Search Button (Cmd+K) */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-2.5 sm:px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200 transition-colors shadow-sm"
              title="Search directory (Ctrl+K or Cmd+K)"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Accent Palette Selector Popover */}
            <div className="relative" ref={paletteRef}>
              <button
                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shadow-sm"
                title="Change color theme palette"
              >
                <span
                  className="h-3 w-3 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm"
                  style={{ backgroundColor: currentPalette.colorHex }}
                />
                <span className="hidden lg:inline text-[11px] font-medium">{currentPalette.name}</span>
                <Palette className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {/* Palette Dropdown */}
              {isPaletteOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-[#0D1322] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Theme Color Palette
                  </div>
                  <div className="space-y-1">
                    {ACCENT_PALETTES.map((p) => {
                      const isSelected = accent === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setAccent(p.id);
                            setIsPaletteOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white shadow-sm'
                              : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="h-3.5 w-3.5 rounded-full shadow-sm"
                              style={{ backgroundColor: p.colorHex }}
                            />
                            <span>{p.name}</span>
                          </div>
                          {isSelected && <Check className="h-3.5 w-3.5 text-slate-700 dark:text-slate-200" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="relative flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shadow-sm"
              title="Open saved bookmarks"
            >
              <Bookmark className={`h-4 w-4 ${totalBookmarks > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Saved</span>
              {totalBookmarks > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm">
                  {totalBookmarks}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm transition-transform active:scale-95"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700 transition-transform rotate-0" />
                )}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070B14] px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => handleNavClick('tools', '/tools')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🛠️ Developer Tools
            </button>
            <button
              onClick={() => handleNavClick('repositories', '/repositories')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              📦 Open-Source Repositories
            </button>
            <Link
              href="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🏷️ Categories Taxonomy
            </Link>
            <Link
              href="/trending"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🔥 Trending Today
            </Link>
            <Link
              href="/research"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🔬 Research & Submit
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ℹ️ About DevAtlas
            </Link>

            {/* Mobile Accent Palette Chooser */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-400 mb-2">Color Palette:</span>
              <div className="flex items-center gap-2">
                {ACCENT_PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setAccent(p.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      accent === p.id
                        ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.colorHex }} />
                    <span>{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Menu Dialog */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* Saved Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
      />
    </>
  );
}
