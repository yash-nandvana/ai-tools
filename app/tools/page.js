'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsDirectory from '@/components/ToolsDirectory';
import RepositoriesDirectory from '@/components/RepositoriesDirectory';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('tools');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070B14] relative">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'tools' ? (
          <ToolsDirectory />
        ) : (
          <RepositoriesDirectory />
        )}
      </main>
      <Footer />
    </div>
  );
}
