import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRepositoryBySlug, repositoriesData } from '@/data';
import { 
  ArrowLeft, ExternalLink, Github, Check, BookOpen, 
  Star, GitFork, Shield, Code, Terminal, Calendar
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingBadge from '@/components/PricingBadge';

export function generateStaticParams() {
  return repositoriesData.slice(0, 100).map((repo) => ({
    slug: repo.slug || repo.id,
  }));
}

export function generateMetadata({ params }) {
  const repo = getRepositoryBySlug(params.slug);
  if (!repo) return { title: 'Repository Not Found' };
  return {
    title: `${repo.fullName} — Open Source GitHub Repository`,
    description: repo.description,
    alternates: {
      canonical: `/repositories/${repo.slug || repo.id}`,
    },
    openGraph: {
      title: `${repo.fullName} — Open Source GitHub Repository | DevAtlas`,
      description: repo.description,
      url: `https://devatlas.dev/repositories/${repo.slug || repo.id}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${repo.fullName} on DevAtlas`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${repo.fullName} | DevAtlas`,
      description: repo.description,
      images: ['/og-image.png'],
    },
  };
}

export default function RepositoryDetailPage({ params }) {
  const repo = getRepositoryBySlug(params.slug);
  if (!repo) notFound();

  // Related repos in same category
  const relatedRepos = repositoriesData
    .filter((r) => r.category === repo.category && r.id !== repo.id)
    .slice(0, 4);

  const displayDate = repo.launchDate || repo.releaseDate;
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F1] dark:bg-[#070B14] relative">
      <Navbar activeTab="repositories" />

      <main className="flex-1 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link
            href="/repositories"
            className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Repositories</span>
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">{repo.fullName}</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl dark:bg-slate-800 shadow-md">
                <Github className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {repo.fullName}
                  </h1>
                  <PricingBadge pricing="Open Source" openSource={true} />
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {repo.category} {repo.subcategory ? `• ${repo.subcategory}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition-all"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {repo.documentation && (
                <a
                  href={repo.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Docs</span>
                </a>
              )}
            </div>
          </div>

          {/* GitHub Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">GitHub Stars</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span>{repo.stars?.toLocaleString() || 0}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Forks</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
                <GitFork className="h-3.5 w-3.5 text-slate-500" />
                <span>{repo.forks?.toLocaleString() || 0}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Language</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.languageColor || '#0D9488' }} />
                <span>{repo.language || 'Code'}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">License</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block font-mono">
                {repo.license || 'Permissive'}
              </span>
            </div>
          </div>

          {/* Install Command */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Clone Command
            </h2>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner">
              <span>{repo.installCommand || `git clone ${repo.githubUrl}.git`}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Repository Description
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {repo.description}
            </p>
          </div>

          {/* Key Features */}
          {repo.features && repo.features.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {repo.features.map((feat, idx) => (
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

          {/* Getting Started */}
          {repo.gettingStarted && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Getting Started Guide
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {repo.gettingStarted}
              </div>
            </div>
          )}

        </div>

        {/* Related Repos */}
        {relatedRepos.length > 0 && (
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Related Repositories in {repo.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedRepos.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/repositories/${rel.slug || rel.id}`}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-teal-500/50 shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors truncate">
                      {rel.name}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-2">
                    {rel.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{rel.language}</span>
                    <span>⭐ {rel.stars?.toLocaleString() || 0}</span>
                  </div>
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
