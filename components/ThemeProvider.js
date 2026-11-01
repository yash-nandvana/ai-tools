'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const ACCENT_PALETTES = [
  {
    id: 'teal',
    name: 'Cyber Teal',
    primary: '#0D9488',
    secondary: '#06B6D4',
    cssClass: 'accent-teal',
    colorHex: '#0D9488',
  },
  {
    id: 'violet',
    name: 'Linear Violet',
    primary: '#7C3AED',
    secondary: '#6366F1',
    cssClass: 'accent-violet',
    colorHex: '#7C3AED',
  },
  {
    id: 'emerald',
    name: 'Neon Emerald',
    primary: '#059669',
    secondary: '#10B981',
    cssClass: 'accent-emerald',
    colorHex: '#10B981',
  },
  {
    id: 'rose',
    name: 'Sunset Rose',
    primary: '#E11D48',
    secondary: '#F59E0B',
    cssClass: 'accent-rose',
    colorHex: '#E11D48',
  },
  {
    id: 'blue',
    name: 'Electric Blue',
    primary: '#2563EB',
    secondary: '#38BDF8',
    cssClass: 'accent-blue',
    colorHex: '#2563EB',
  },
];

const ThemeContext = createContext({
  theme: 'dark',
  accent: 'teal',
  toggleTheme: () => {},
  setAccent: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccentState] = useState('teal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Default to dark mode for an ultra-premium developer look, unless saved as light
    const savedTheme = localStorage.getItem('devatlas-theme') || 'dark';
    const savedAccent = localStorage.getItem('devatlas-accent') || 'teal';
    
    setTheme(savedTheme);
    setAccentState(savedAccent);

    // Apply dark class
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply accent class to <html>
    applyAccentClass(savedAccent);
  }, []);

  const applyAccentClass = (accentId) => {
    ACCENT_PALETTES.forEach((p) => {
      document.documentElement.classList.remove(p.cssClass);
    });
    const found = ACCENT_PALETTES.find((p) => p.id === accentId) || ACCENT_PALETTES[0];
    document.documentElement.classList.add(found.cssClass);
    document.documentElement.setAttribute('data-accent', found.id);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('devatlas-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setAccent = (accentId) => {
    setAccentState(accentId);
    localStorage.setItem('devatlas-accent', accentId);
    applyAccentClass(accentId);
  };

  return (
    <ThemeContext.Provider value={{ theme, accent, toggleTheme, setAccent, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
