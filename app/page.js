'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsDirectory from '@/components/ToolsDirectory';
import RepositoriesDirectory from '@/components/RepositoriesDirectory';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('tools'); // 'tools' | 'repositories'

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F1] dark:bg-[#070B14] relative selection:bg-[#783F27] selection:text-[#FAF6F1] dark:selection:bg-white dark:selection:text-slate-900">
      {/* Clean Navbar with DevAtlas Logo, Tools & Repositories tabs, and Theme button */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Directory Container matching screenshot */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'tools' ? (
          <ToolsDirectory />
        ) : (
          <RepositoriesDirectory />
        )}
      </main>

      {/* Single Clean 1-Line Footer */}
      <Footer />
    </div>
  );
}
