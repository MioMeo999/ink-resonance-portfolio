import type { Metadata, Viewport } from 'next'
import { Archivo, Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const structureSans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const displaySerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-playfair',
  display: 'swap',
})

const bodySans = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
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
    <html lang="en" className={`${structureSans.variable} ${displaySerif.variable} ${bodySans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
