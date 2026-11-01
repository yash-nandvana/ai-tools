export const metadata = {
  title: 'Open-Source Repositories — 1,250+ GitHub Projects with Star Trends',
  description: 'Explore 1,250+ open-source GitHub repositories with active stars, forks, install commands, and release metrics.',
  alternates: {
    canonical: '/repositories',
  },
  openGraph: {
    title: 'Open Source Repositories Directory | DevAtlas',
    description: 'Explore 1,250+ open source GitHub repositories.',
    url: 'https://devatlas.dev/repositories',
    images: ['/og-image.png'],
  },
};

export default function RepositoriesLayout({ children }) {
  return children;
}
