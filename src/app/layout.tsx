import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101416',
}

export const metadata: Metadata = {
  title: 'Ink & Resonance · Lijun Zhang',
  description:
    'The portfolio of Lijun Zhang — Guzheng artist, researcher, and cultural connector based in Leeds.',
  openGraph: {
    title: 'Ink & Resonance · Lijun Zhang',
    description:
      'Guzheng performance, research, cultural engagement, and community practice.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
