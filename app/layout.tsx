import type { Metadata } from 'next'
import './globals.css'

const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/portfolio-site' : ''

export const metadata: Metadata = {
  title: 'Muhammet Coşgun - Frontend Geliştirici',
  description: 'Kullanıcı deneyimini ön planda tutan, modern teknolojilerle güçlendirilmiş web uygulamaları geliştiren frontend geliştiricisi.',
  icons: {
    icon: `${basePath}/favicon.png`,
    apple: `${basePath}/favicon.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}

