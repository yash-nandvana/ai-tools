export const metadata = {
  title: 'Engineering Taxonomy & Categories (27 Technical Domains)',
  description: 'Explore the complete DevAtlas directory taxonomy across 27 specialized engineering domains including AI coding assistants, agent runtimes, and QA automation.',
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Directory Taxonomy & Categories | DevAtlas',
    description: 'Explore 27 standardized software engineering categories.',
    url: 'https://devatlas.dev/categories',
    images: ['/og-image.png'],
  },
};

export default function CategoriesLayout({ children }) {
  return children;
}
