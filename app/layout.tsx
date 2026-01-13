import type { Metadata } from 'next'
import './globals.css'

const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/portfolio-site' : ''
const siteUrl = isProd ? 'https://mmuuhmmtt.github.io/portfolio-site' : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Muhammet Coşgun - Frontend Geliştirici | React, Next.js, TypeScript',
  description: 'Kullanıcı deneyimini ön planda tutan, modern teknolojilerle güçlendirilmiş web uygulamaları geliştiren frontend geliştiricisi. Next.js, React, TypeScript uzmanı.',
  keywords: ['Frontend Geliştirici', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Tasarım'],
  authors: [{ name: 'Muhammet Coşgun' }],
  creator: 'Muhammet Coşgun',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    siteName: 'Muhammet Coşgun Portfolio',
    title: 'Muhammet Coşgun - Frontend Geliştirici',
    description: 'Kullanıcı deneyimini ön planda tutan, modern teknolojilerle güçlendirilmiş web uygulamaları geliştiren frontend geliştiricisi.',
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Muhammet Coşgun Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammet Coşgun - Frontend Geliştirici',
    description: 'Modern teknolojilerle web uygulamaları geliştiren frontend uzmanı',
    creator: '@mmuuhmmtt',
  },
  icons: {
    icon: `${basePath}/favicon.png`,
    apple: `${basePath}/favicon.png`,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: 'index, follow',
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* Font Preloading */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://github.com" />
        {/* Preload critical resources */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}

