import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { BookmarksProvider } from '@/components/BookmarksContext';
import { ToastProvider } from '@/components/ToastContext';

export const metadata = {
  metadataBase: new URL('https://devatlas.dev'),
  title: {
    default: 'DevAtlas — Discover 3,300+ Curated Developer Tools & GitHub Repositories',
    template: '%s | DevAtlas',
  },
  description: 'The definitive developer directory. Discover verified AI coding assistants, autonomous testing agents, runtime infrastructure, and open-source GitHub repositories to build faster and ship better.',
  applicationName: 'DevAtlas',
  keywords: [
    'developer tools',
    'ai coding assistants',
    'ai coding agents',
    'open source repositories',
    'github trending',
    'mcp tools',
    'developer directory',
    'software engineering tools',
    'autonomous test automation',
    'coding copilot',
    'best developer platforms',
    'devatlas',
  ],
  authors: [{ name: 'DevAtlas Engineering Team', url: 'https://devatlas.dev' }],
  creator: 'DevAtlas',
  publisher: 'DevAtlas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DevAtlas — Discover 3,300+ Curated Developer Tools & GitHub Repositories',
    description: 'Explore verified developer tools, AI coding agents, and open-source ecosystems. Unbiased metrics, factual timelines, and zero sponsored rankings.',
    url: 'https://devatlas.dev',
    siteName: 'DevAtlas',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevAtlas — Curated Developer Tools & GitHub Repositories',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevAtlas — Discover 3,300+ Curated Developer Tools & GitHub Repositories',
    description: 'The premier curated directory of developer tools, AI coding agents, and open-source GitHub repositories.',
    images: ['/og-image.png'],
    creator: '@devatlas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  // JSON-LD structured data for Google Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://devatlas.dev/#website',
        'url': 'https://devatlas.dev',
        'name': 'DevAtlas',
        'description': 'Discover 3,300+ curated developer tools, AI coding assistants, and open-source GitHub repositories.',
        'publisher': {
          '@type': 'Organization',
          'name': 'DevAtlas',
          'url': 'https://devatlas.dev',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://devatlas.dev/icon-512.png',
            'width': 512,
            'height': 512,
          },
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://devatlas.dev/tools?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://devatlas.dev/#organization',
        'name': 'DevAtlas',
        'url': 'https://devatlas.dev',
        'logo': 'https://devatlas.dev/icon-512.png',
        'sameAs': [
          'https://github.com',
          'https://twitter.com/devatlas',
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="theme-color" content="#0D9488" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans bg-[#F8FAFC] dark:bg-[#070B14] text-slate-800 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          <BookmarksProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </BookmarksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
