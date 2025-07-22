import React from 'react'
import { notFound } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'
import ConversionClient from './ConversionClient'

interface ConversionUnit {
  name: string
  symbol: string
  factor: number
  category: string
}

const allUnits: ConversionUnit[] = [
  // Length
  { name: 'Millimeter', symbol: 'mm', factor: 0.001, category: 'length' },
  { name: 'Centimeter', symbol: 'cm', factor: 0.01, category: 'length' },
  { name: 'Meter', symbol: 'meter', factor: 1, category: 'length' },
  { name: 'Kilometer', symbol: 'km', factor: 1000, category: 'length' },
  { name: 'Inch', symbol: 'inch', factor: 0.0254, category: 'length' },
  { name: 'Foot', symbol: 'ft', factor: 0.3048, category: 'length' },
  { name: 'Yard', symbol: 'yard', factor: 0.9144, category: 'length' },
  { name: 'Mile', symbol: 'mile', factor: 1609.344, category: 'length' },
  
  // Weight  
  { name: 'Gram', symbol: 'gram', factor: 1, category: 'weight' },
  { name: 'Kilogram', symbol: 'kg', factor: 1000, category: 'weight' },
  { name: 'Ounce', symbol: 'oz', factor: 28.3495, category: 'weight' },
  { name: 'Pound', symbol: 'lb', factor: 453.592, category: 'weight' },
  { name: 'Stone', symbol: 'stone', factor: 6350.29, category: 'weight' },
  { name: 'Ton', symbol: 'ton', factor: 1000000, category: 'weight' },
  
  // Temperature
  { name: 'Celsius', symbol: 'celsius', factor: 1, category: 'temperature' },
  { name: 'Fahrenheit', symbol: 'fahrenheit', factor: 1, category: 'temperature' },
  { name: 'Kelvin', symbol: 'kelvin', factor: 1, category: 'temperature' },
  
  // Volume
  { name: 'Milliliter', symbol: 'ml', factor: 1, category: 'volume' },
  { name: 'Liter', symbol: 'liter', factor: 1000, category: 'volume' },
  { name: 'Fluid Ounce', symbol: 'floz', factor: 29.5735, category: 'volume' },
  { name: 'Cup', symbol: 'cup', factor: 236.588, category: 'volume' },
  { name: 'Pint', symbol: 'pint', factor: 473.176, category: 'volume' },
  { name: 'Quart', symbol: 'quart', factor: 946.353, category: 'volume' },
  { name: 'Gallon', symbol: 'gallon', factor: 3785.41, category: 'volume' }
]

// Generate all valid conversion combinations
export async function generateStaticParams() {
  const params: { from: string; to: string }[] = []
  
  for (const fromUnit of allUnits) {
    for (const toUnit of allUnits) {
      if (fromUnit.category === toUnit.category && fromUnit.symbol !== toUnit.symbol) {
        params.push({
          from: fromUnit.symbol,
          to: toUnit.symbol
        })
      }
    }
  }
  
  return params
}

interface PageProps {
  params: {
    from: string
    to: string
  }
}

export default function ConversionPage({ params }: PageProps) {
  const fromUnit = allUnits.find(u => u.symbol === params.from)
  const toUnit = allUnits.find(u => u.symbol === params.to)
  
  if (!fromUnit || !toUnit || fromUnit.category !== toUnit.category) {
    notFound()
  }
  
  const conversionTitle = `${fromUnit.name} to ${toUnit.name}`
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Unit Converter', url: '/tools/unit-converter' },
    { name: conversionTitle, url: `/tools/unit-converter/${params.from}/to/${params.to}`, isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        `${conversionTitle} Converter - Convert ${params.from} to ${params.to}`,
        `https://utilivia.com/tools/unit-converter/${params.from}/to/${params.to}`,
        `Convert ${params.from} to ${params.to} instantly. Free ${conversionTitle} converter with accurate results and real-time calculations.`
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {conversionTitle} Converter
              </h1>
              <p className="text-xl text-gray-600">
                Convert {params.from} to {params.to} instantly with our free calculator
              </p>
            </div>

            <ConversionClient 
              fromUnit={fromUnit}
              toUnit={toUnit}
              params={params}
              allUnits={allUnits}
            />
          </div>
        </div>
      </div>
    </>
  )
} 