export default function PricingBadge({ pricing, openSource }) {
  const getBadgeStyle = () => {
    const p = (pricing || '').toLowerCase();
    
    if (openSource) {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/80';
    }
    if (p.includes('freemium')) {
      return 'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/80';
    }
    if (p.includes('free')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/80';
    }
    if (p.includes('paid') || p.includes('commercial')) {
      return 'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/80';
    }
    if (p.includes('enterprise')) {
      return 'bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/80';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide border shadow-2xs ${getBadgeStyle()}`}
    >
      {openSource ? 'Open Source' : (pricing || 'Free')}
    </span>
  );
}
