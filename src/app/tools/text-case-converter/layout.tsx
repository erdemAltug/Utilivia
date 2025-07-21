import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free Text Case Converter - UPPERCASE, lowercase, camelCase, snake_case',
  description: 'Convert text to different cases instantly. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case conversions. Free online text converter.',
  keywords: [
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'camelcase converter',
    'snake case converter',
    'kebab case converter',
    'title case converter',
    'pascal case converter',
    'text formatter',
    'case converter'
  ],
  openGraph: {
    title: 'Free Text Case Converter - UPPERCASE, lowercase, camelCase | Utilivia',
    description: 'Convert text to different cases instantly. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case conversions.',
    type: 'website',
    url: 'https://utilivia.com/tools/text-case-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Case Converter - UPPERCASE, lowercase, camelCase',
    description: 'Convert text to different cases instantly. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case conversions.',
  },
  alternates: {
    canonical: '/tools/text-case-converter',
  },
}

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 