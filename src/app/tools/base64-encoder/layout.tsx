import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free Base64 Encoder/Decoder - Online Base64 Converter',
  description: 'Encode and decode Base64 strings instantly. Free online Base64 converter for developers, API testing, and data transmission. No file upload required.',
  keywords: [
    'base64 encoder',
    'base64 decoder', 
    'base64 converter',
    'encode base64',
    'decode base64',
    'base64 online',
    'base64 tool',
    'encoding decoder',
    'text encoder',
    'developer tools'
  ],
  openGraph: {
    title: 'Free Base64 Encoder/Decoder - Online Base64 Converter | Utilivia',
    description: 'Encode and decode Base64 strings instantly. Free online Base64 converter for developers, API testing, and data transmission.',
    type: 'website',
    url: 'https://utilivia.com/tools/base64-encoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Encoder/Decoder - Online Base64 Converter',
    description: 'Encode and decode Base64 strings instantly. Free online Base64 converter for developers, API testing, and data transmission.',
  },
  alternates: {
    canonical: '/tools/base64-encoder',
  },
}

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 