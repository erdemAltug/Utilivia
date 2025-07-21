import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free Lorem Ipsum Generator - Placeholder Text for Web Design',
  description: 'Generate Lorem Ipsum placeholder text instantly. Create custom paragraphs, sentences, or words for web design and development. Free online Lorem generator.',
  keywords: [
    'lorem ipsum generator',
    'placeholder text',
    'dummy text',
    'lorem ipsum',
    'text generator',
    'web design placeholder',
    'development text',
    'mockup text',
    'design text',
    'sample text'
  ],
  openGraph: {
    title: 'Free Lorem Ipsum Generator - Placeholder Text for Web Design | Utilivia',
    description: 'Generate Lorem Ipsum placeholder text instantly. Create custom paragraphs, sentences, or words for web design and development.',
    type: 'website',
    url: 'https://utilivia.com/tools/lorem-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lorem Ipsum Generator - Placeholder Text for Web Design',
    description: 'Generate Lorem Ipsum placeholder text instantly. Create custom paragraphs, sentences, or words for web design and development.',
  },
  alternates: {
    canonical: '/tools/lorem-generator',
  },
}

export default function LoremGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 