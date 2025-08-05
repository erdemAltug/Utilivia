import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Utilivia - Free Online Utility Tools',
    template: '%s | Utilivia'
  },
  description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator, currency converter and more useful tools.',
  keywords: [
    'utility tools',
    'calculator',
    'converter',
    'BMI calculator',
    'unit converter',
    'password generator',
    'currency converter',
    'free tools',
    'online tools',
    'web tools',
    'cm to meter',
    'kg to lb',
    'celsius to fahrenheit',
    'BMI calculator metric',
    'age calculator',
    'text case converter',
    'lorem ipsum generator',
    'base64 encoder decoder'
  ],
  authors: [{ name: 'Utilivia' }],
  creator: 'Utilivia',
  publisher: 'Utilivia',
  metadataBase: new URL('https://utilivia.com'),
  alternates: {
    canonical: '/',
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
  verification: {
    google: 'your-google-verification-code', // Google Search Console'dan alacaksın
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://utilivia.com',
    title: 'Utilivia - Free Online Utility Tools',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator, currency converter and more useful tools.',
    siteName: 'Utilivia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utilivia - Free Online Utility Tools',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator, currency converter and more useful tools.',
    creator: '@utilivia',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
} 