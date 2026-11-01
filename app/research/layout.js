export const metadata = {
  title: 'Research & Community Verification Audit Queue',
  description: 'Inspect live verification logs and submit new software platforms, AI frameworks, or open-source repositories to the DevAtlas engineering directory.',
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'Research & Verification Queue | DevAtlas',
    description: 'Submit software platforms and audit verification logs.',
    url: 'https://devatlas.dev/research',
    images: ['/og-image.png'],
  },
};

export default function ResearchLayout({ children }) {
  return children;
}
