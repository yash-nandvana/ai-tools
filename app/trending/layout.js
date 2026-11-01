export const metadata = {
  title: 'Trending Tools & Repositories — Real-time Velocity Radar',
  description: 'Track developer tools, AI coding agents, and open-source GitHub repositories experiencing accelerated community adoption and velocity today.',
  alternates: {
    canonical: '/trending',
  },
  openGraph: {
    title: 'Trending Developer Tools & GitHub Repositories | DevAtlas',
    description: 'Track high-velocity tools and repositories in modern software engineering.',
    url: 'https://devatlas.dev/trending',
    images: ['/og-image.png'],
  },
};

export default function TrendingLayout({ children }) {
  return children;
}
