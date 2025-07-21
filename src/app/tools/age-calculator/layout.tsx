import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free Age Calculator - Calculate Your Exact Age Online',
  description: 'Calculate your exact age in years, months, and days. Find out your zodiac sign, next birthday countdown, and discover fun facts about your life. Free online age calculator.',
  keywords: [
    'age calculator',
    'calculate age',
    'birth date calculator',
    'age finder',
    'birthday calculator',
    'zodiac sign calculator',
    'birthday countdown',
    'date calculator',
    'exact age',
    'how old am i'
  ],
  openGraph: {
    title: 'Free Age Calculator - Calculate Your Exact Age Online | Utilivia',
    description: 'Calculate your exact age in years, months, and days. Find out your zodiac sign, next birthday countdown, and discover fun facts about your life.',
    type: 'website',
    url: 'https://utilivia.com/tools/age-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Age Calculator - Calculate Your Exact Age Online',
    description: 'Calculate your exact age in years, months, and days. Find out your zodiac sign, next birthday countdown, and discover fun facts about your life.',
  },
  alternates: {
    canonical: '/tools/age-calculator',
  },
}

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 