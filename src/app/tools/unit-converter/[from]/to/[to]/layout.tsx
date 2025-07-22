import type { Metadata } from 'next'
import React from 'react'

const allUnits = [
  // Length
  { name: 'Millimeter', symbol: 'mm', category: 'length' },
  { name: 'Centimeter', symbol: 'cm', category: 'length' },
  { name: 'Meter', symbol: 'meter', category: 'length' },
  { name: 'Kilometer', symbol: 'km', category: 'length' },
  { name: 'Inch', symbol: 'inch', category: 'length' },
  { name: 'Foot', symbol: 'ft', category: 'length' },
  { name: 'Yard', symbol: 'yard', category: 'length' },
  { name: 'Mile', symbol: 'mile', category: 'length' },
  
  // Weight  
  { name: 'Gram', symbol: 'gram', category: 'weight' },
  { name: 'Kilogram', symbol: 'kg', category: 'weight' },
  { name: 'Ounce', symbol: 'oz', category: 'weight' },
  { name: 'Pound', symbol: 'lb', category: 'weight' },
  { name: 'Stone', symbol: 'stone', category: 'weight' },
  { name: 'Ton', symbol: 'ton', category: 'weight' },
  
  // Temperature
  { name: 'Celsius', symbol: 'celsius', category: 'temperature' },
  { name: 'Fahrenheit', symbol: 'fahrenheit', category: 'temperature' },
  { name: 'Kelvin', symbol: 'kelvin', category: 'temperature' },
  
  // Volume
  { name: 'Milliliter', symbol: 'ml', category: 'volume' },
  { name: 'Liter', symbol: 'liter', category: 'volume' },
  { name: 'Fluid Ounce', symbol: 'floz', category: 'volume' },
  { name: 'Cup', symbol: 'cup', category: 'volume' },
  { name: 'Pint', symbol: 'pint', category: 'volume' },
  { name: 'Quart', symbol: 'quart', category: 'volume' },
  { name: 'Gallon', symbol: 'gallon', category: 'volume' }
]

interface Props {
  params: {
    from: string
    to: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fromUnit = allUnits.find(u => u.symbol === params.from)
  const toUnit = allUnits.find(u => u.symbol === params.to)
  
  if (!fromUnit || !toUnit || fromUnit.category !== toUnit.category) {
    return {
      title: 'Conversion Not Found'
    }
  }

  const conversionTitle = `${fromUnit.name} to ${toUnit.name}`
  const shortTitle = `${params.from} to ${params.to}`
  const category = fromUnit.category

  // SEO-optimized keywords based on category
  const categoryKeywords: Record<string, string[]> = {
    length: [
      `${params.from} to ${params.to}`,
      `convert ${params.from} to ${params.to}`,
      `${params.from} to ${params.to} converter`,
      `how to convert ${params.from} to ${params.to}`,
      `${shortTitle} calculation`,
      `${shortTitle} formula`,
      `${fromUnit.name} to ${toUnit.name}`,
      `${fromUnit.name} ${toUnit.name} conversion`,
      'length converter',
      'distance converter',
      'measurement converter',
      'unit conversion'
    ],
    weight: [
      `${params.from} to ${params.to}`,
      `convert ${params.from} to ${params.to}`,
      `${params.from} to ${params.to} converter`,
      `weight converter`,
      `mass converter`,
      `${fromUnit.name} to ${toUnit.name}`,
      `how many ${params.to} in ${params.from}`,
      'weight conversion',
      'mass conversion'
    ],
    temperature: [
      `${params.from} to ${params.to}`,
      `convert ${params.from} to ${params.to}`,
      `temperature converter`,
      `${fromUnit.name} to ${toUnit.name}`,
      'temperature conversion',
      'weather converter'
    ],
    volume: [
      `${params.from} to ${params.to}`,
      `convert ${params.from} to ${params.to}`,
      `volume converter`,
      `liquid converter`,
      `${fromUnit.name} to ${toUnit.name}`,
      'volume conversion',
      'capacity converter'
    ]
  }

  return {
    title: `Convert ${conversionTitle} - ${shortTitle.toUpperCase()} Converter`,
    description: `Free ${conversionTitle} converter. Convert ${params.from} to ${params.to} instantly with accurate results. ${shortTitle} conversion calculator with formula and examples.`,
    keywords: categoryKeywords[category] || [],
    authors: [{ name: 'Utilivia' }],
    creator: 'Utilivia',
    metadataBase: new URL('https://utilivia.com'),
    alternates: {
      canonical: `/tools/unit-converter/${params.from}/to/${params.to}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://utilivia.com/tools/unit-converter/${params.from}/to/${params.to}`,
      title: `${conversionTitle} Converter - Convert ${shortTitle}`,
      description: `Convert ${params.from} to ${params.to} instantly. Free ${conversionTitle} converter with accurate results and real-time calculations.`,
      siteName: 'Utilivia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${conversionTitle} Converter`,
      description: `Convert ${params.from} to ${params.to} instantly. Free online ${category} converter.`,
      creator: '@utilivia',
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
  }
}

export default function ConversionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 