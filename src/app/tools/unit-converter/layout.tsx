import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free Unit Converter - CM to Meter, KG to LB, Celsius to Fahrenheit',
  description: 'Convert units instantly! CM to meter, inch to cm, kg to pounds, liter to gallon, celsius to fahrenheit. Free online unit converter for length, weight, volume, temperature.',
  keywords: [
    // Length conversions
    'unit converter',
    'cm to meter',
    'cm to meter calculator',
    'inch to cm',
    'feet to meter',
    'km to miles',
    'length converter',
    'distance converter',
    // Weight conversions  
    'kg to pounds',
    'kg to lb',
    'pounds to kg',
    'grams to ounces',
    'weight converter',
    'mass converter',
    // Volume conversions
    'liter to gallon',
    'ml to fl oz',
    'cup to ml',
    'gallon to liter',
    'volume converter',
    // Temperature conversions
    'celsius to fahrenheit',
    'fahrenheit to celsius',
    'celsius to kelvin',
    'temperature converter',
    // General terms
    'metric to imperial',
    'imperial to metric',
    'free unit converter',
    'online converter'
  ],
  openGraph: {
    title: 'Free Unit Converter - CM to Meter, KG to LB, Celsius to Fahrenheit | Utilivia',
    description: 'Convert units instantly! CM to meter, inch to cm, kg to pounds, liter to gallon, celsius to fahrenheit. Free online unit converter.',
    type: 'website',
    url: 'https://utilivia.com/tools/unit-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Unit Converter - CM to Meter, KG to LB, Celsius to Fahrenheit',
    description: 'Convert units instantly! CM to meter, inch to cm, kg to pounds, liter to gallon, celsius to fahrenheit. Free online unit converter.',
  },
  alternates: {
    canonical: '/tools/unit-converter',
  },
}

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 