'use client';

import { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Clock, XCircle, AlertCircle, 
  Search, ExternalLink, ShieldCheck, Plus, Check, Send
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ToastContext';
import { researchItemsData } from '@/data/research-items';

export default function ResearchPage() {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'approved' | 'pending' | 'rejected'
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    type: 'tool',
    website: '',
    github: '',
    category: 'AI Coding Assistants & Agents',
    description: '',
    evidence: '',
  });

  const filteredItems = researchItemsData.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.verificationStatus === filterStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Submission for "${formData.name}" received for verification!`, 'success');
    setTimeout(() => {
      setFormData({
        name: '',
        type: 'tool',
        website: '',
        github: '',
        category: 'AI Coding Assistants & Agents',
        description: '',
        evidence: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070B14] relative">
      <Navbar activeTab="research" />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        {/* Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 text-xs font-semibold mb-3 border border-teal-200/50 dark:border-teal-800/50">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Community Verification Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Research & Verification Submissions
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Every tool in DevAtlas passes rigorous verification against launch dates, feature fidelity, pricing clarity, and open-source licensing. Submit new platforms or inspect the active audit queue below.
          </p>
        </div>

        {/* 2-Column: Form on left, Queue on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Submission Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="h-4 w-4 text-teal-600" />
                  <span>Submit Tool or Repo</span>
                </h2>
                <span className="text-[11px] text-slate-400">Queue Time ~24h</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Software / Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cursor, vLLM, OpenHands"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="tool">Developer Tool</option>
                      <option value="repository">GitHub Repo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 text-ellipsis"
                    >
                      <option>AI Coding Assistants & Agents</option>
                      <option>AI Testing & QA Automation</option>
                      <option>Agent Frameworks & MCP</option>
                      <option>DevOps, CI/CD & Cloud</option>
                      <option>Database & Storage</option>
                      <option>Developer Utilities</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Website or Product URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/owner/repo"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Engineering Summary
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe what problem this tool solves and why it's impactful..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full rounded-xl bg-[#0D9488] py-2.5 font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Submitted to Audit Queue!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit for Verification</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Audit Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Live Verification Queue ({filteredItems.length})
              </h2>

              <div className="flex items-center gap-1.5 text-xs">
                {['all', 'approved', 'pending', 'rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                      filterStatus === st
                        ? 'bg-[#0D9488] text-white'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {item.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                        {item.category}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        item.verificationStatus === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : item.verificationStatus === 'pending'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                      }`}
                    >
                      {item.verificationStatus === 'approved' && <CheckCircle2 className="h-3 w-3" />}
                      {item.verificationStatus === 'pending' && <Clock className="h-3 w-3" />}
                      {item.verificationStatus === 'rejected' && <XCircle className="h-3 w-3" />}
                      <span>{item.verificationStatus}</span>
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {item.evidence && (
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 font-mono">
                      Audit Note: {item.evidence}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
