import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getToolBySlug, toolsData } from '@/data';
import { 
  ArrowLeft, ExternalLink, Github, Check, BookOpen, 
  DollarSign, Layers, ShieldCheck, Calendar, Sparkles,
  Zap, Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingBadge from '@/components/PricingBadge';
import ToolCard from '@/components/ToolCard';

export function generateStaticParams() {
  return toolsData.slice(0, 100).map((tool) => ({
    slug: tool.slug || tool.id,
  }));
}

export function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.name} — Architecture & Developer Details`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug || tool.id}`,
    },
    openGraph: {
      title: `${tool.name} — Developer Details | DevAtlas`,
      description: tool.description,
      url: `https://devatlas.dev/tools/${tool.slug || tool.id}`,
      images: [
        {
          url: tool.logo || '/og-image.png',
          width: 800,
          height: 600,
          alt: `${tool.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${tool.name} | DevAtlas`,
      description: tool.description,
      images: [tool.logo || '/og-image.png'],
    },
  };
}

export default function ToolDetailPage({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  // Find related tools in same category
  const relatedTools = toolsData
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  const displayDate = tool.launchDate || tool.releaseDate;
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F1] dark:bg-[#070B14] relative">
      <Navbar activeTab="tools" />

      <main className="flex-1 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link
            href="/tools"
            className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Tools Directory</span>
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">{tool.name}</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              {tool.logo ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-16 w-16 rounded-2xl object-contain border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800 shadow-sm"
                />
              ) : (
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#0D9488] to-teal-400 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                  {tool.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {tool.name}
                  </h1>
                  <PricingBadge pricing={tool.pricing} openSource={tool.openSource} />
                  {tool.status === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-200/50 dark:border-teal-800/50">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {tool.category} {tool.subcategory ? `• ${tool.subcategory}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition-all"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              {tool.github && (
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Launch Date</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                {formattedDate || 'Verified Standard'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Pricing Model</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                {tool.pricing || 'Freemium'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Open Source</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                {tool.openSource ? 'Yes (Public Code)' : 'Proprietary'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Platforms</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                {tool.platform?.join(', ') || 'Web, API'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Overview & Capabilities
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {tool.description}
            </p>
            {tool.overview && (
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
                {tool.overview}
              </p>
            )}
          </div>

          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Core Architectural Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Target Engineering Workflows
              </h2>
              <div className="space-y-2">
                {tool.useCases.map((uc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Related tools section */}
        {relatedTools.length > 0 && (
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Related Tools in {tool.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/tools/${rel.slug || rel.id}`}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-teal-500/50 shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    {rel.logo ? (
                      <img src={rel.logo} alt={rel.name} className="h-8 w-8 rounded-lg object-contain bg-slate-50 dark:bg-slate-800 p-1" />
                    ) : (
                      <div className="h-8 w-8 rounded-lg bg-teal-600/10 text-teal-600 font-bold text-xs flex items-center justify-center">
                        {rel.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors truncate">
                      {rel.name}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-2">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
