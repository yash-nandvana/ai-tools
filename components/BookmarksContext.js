'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BookmarksContext = createContext({
  bookmarkedTools: [],
  bookmarkedRepos: [],
  toggleBookmarkTool: () => {},
  toggleBookmarkRepo: () => {},
  isToolBookmarked: () => false,
  isRepoBookmarked: () => false,
  clearAllBookmarks: () => {},
  totalBookmarks: 0,
});

export function BookmarksProvider({ children }) {
  const [bookmarkedTools, setBookmarkedTools] = useState([]);
  const [bookmarkedRepos, setBookmarkedRepos] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTools = localStorage.getItem('devatlas_bookmarks_tools');
      const savedRepos = localStorage.getItem('devatlas_bookmarks_repos');
      if (savedTools) setBookmarkedTools(JSON.parse(savedTools));
      if (savedRepos) setBookmarkedRepos(JSON.parse(savedRepos));
    } catch (e) {
      console.error('Error loading bookmarks from storage', e);
    }
  }, []);

  const toggleBookmarkTool = (toolId) => {
    setBookmarkedTools((prev) => {
      const exists = prev.includes(toolId);
      const updated = exists ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('devatlas_bookmarks_tools', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleBookmarkRepo = (repoId) => {
    setBookmarkedRepos((prev) => {
      const exists = prev.includes(repoId);
      const updated = exists ? prev.filter((id) => id !== repoId) : [...prev, repoId];
      try {
        localStorage.setItem('devatlas_bookmarks_repos', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isToolBookmarked = (toolId) => bookmarkedTools.includes(toolId);
  const isRepoBookmarked = (repoId) => bookmarkedRepos.includes(repoId);

  const clearAllBookmarks = () => {
    setBookmarkedTools([]);
    setBookmarkedRepos([]);
    try {
      localStorage.removeItem('devatlas_bookmarks_tools');
      localStorage.removeItem('devatlas_bookmarks_repos');
    } catch (e) {}
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedTools,
        bookmarkedRepos,
        toggleBookmarkTool,
        toggleBookmarkRepo,
        isToolBookmarked,
        isRepoBookmarked,
        clearAllBookmarks,
        totalBookmarks: (mounted ? bookmarkedTools.length + bookmarkedRepos.length : 0),
        mounted,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
