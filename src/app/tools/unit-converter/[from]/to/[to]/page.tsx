'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

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

function convertUnits(value: number, fromUnit: ConversionUnit, toUnit: ConversionUnit): number {
  if (fromUnit.category !== toUnit.category) return 0
  
  if (fromUnit.category === 'temperature') {
    return convertTemperature(value, fromUnit.symbol, toUnit.symbol)
  }
  
  return (value * fromUnit.factor) / toUnit.factor
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value
  
  let celsius = value
  if (from === 'fahrenheit') {
    celsius = (value - 32) * 5/9
  } else if (from === 'kelvin') {
    celsius = value - 273.15
  }
  
  if (to === 'fahrenheit') {
    return celsius * 9/5 + 32
  } else if (to === 'kelvin') {
    return celsius + 273.15
  }
  
  return celsius
}

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
  const [inputValue, setInputValue] = useState('1')
  const [result, setResult] = useState<number | null>(null)
  
  const fromUnit = allUnits.find(u => u.symbol === params.from)
  const toUnit = allUnits.find(u => u.symbol === params.to)
  
  if (!fromUnit || !toUnit || fromUnit.category !== toUnit.category) {
    notFound()
  }
  
  const conversionTitle = `${fromUnit.name} to ${toUnit.name}`
  const shortTitle = `${params.from} to ${params.to}`
  
  useEffect(() => {
    if (inputValue && !isNaN(parseFloat(inputValue))) {
      const converted = convertUnits(parseFloat(inputValue), fromUnit, toUnit)
      setResult(converted)
    } else {
      setResult(null)
    }
  }, [inputValue, fromUnit, toUnit])
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Unit Converter', url: '/tools/unit-converter' },
    { name: conversionTitle, url: `/tools/unit-converter/${params.from}/to/${params.to}`, isLast: true }
  ]

  const examples = [
    { input: 1, label: '1' },
    { input: 10, label: '10' },
    { input: 100, label: '100' },
    { input: 1000, label: '1000' }
  ]

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        `${conversionTitle} Converter - Convert ${shortTitle}`,
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

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Conversion Input */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fromUnit.name} ({params.from})
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>
                
                <div className="flex justify-center">
                  <div className="text-2xl font-bold text-blue-600">=</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {toUnit.name} ({params.to})
                  </label>
                  <div className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-md text-lg font-mono">
                    {result !== null ? result.toFixed(6) : '0'}
                  </div>
                </div>
              </div>

              {/* Quick Examples */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Conversions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {examples.map((example, index) => {
                    const exampleResult = convertUnits(example.input, fromUnit, toUnit)
                    return (
                      <button
                        key={index}
                        onClick={() => setInputValue(example.input.toString())}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm"
                      >
                        <div className="font-medium">{example.input} {params.from}</div>
                        <div className="text-gray-600">{exampleResult.toFixed(4)} {params.to}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Conversion Formula */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How to Convert {fromUnit.name} to {toUnit.name}
                </h3>
                <p className="text-gray-700 mb-4">
                  To convert {params.from} to {params.to}, {fromUnit.category === 'temperature' ? 
                    'use the temperature conversion formula' : 
                    `multiply the ${params.from} value by ${(fromUnit.factor / toUnit.factor).toFixed(8)}`
                  }.
                </p>
                {result !== null && (
                  <div className="bg-white rounded border p-3 font-mono text-sm">
                    {inputValue} {params.from} × {(fromUnit.factor / toUnit.factor).toFixed(8)} = {result.toFixed(6)} {params.to}
                  </div>
                )}
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {conversionTitle} - Conversion Guide
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About {fromUnit.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {fromUnit.name} ({params.from}) is a unit of {fromUnit.category} measurement 
                    commonly used in various applications.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Common {fromUnit.name} Conversions</h3>
                  <ul className="space-y-1 text-gray-600">
                    {allUnits
                      .filter(u => u.category === fromUnit.category && u.symbol !== params.from)
                      .slice(0, 4)
                      .map(unit => (
                        <li key={unit.symbol}>
                          • <Link 
                            href={`/tools/unit-converter/${params.from}/to/${unit.symbol}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {params.from} to {unit.symbol}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About {toUnit.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {toUnit.name} ({params.to}) is a unit of {toUnit.category} measurement 
                    used worldwide for precise measurements.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Conversions</h3>
                  <ul className="space-y-1 text-gray-600">
                    {allUnits
                      .filter(u => u.category === toUnit.category && u.symbol !== params.to)
                      .slice(0, 4)
                      .map(unit => (
                        <li key={unit.symbol}>
                          • <Link 
                            href={`/tools/unit-converter/${unit.symbol}/to/${params.to}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {unit.symbol} to {params.to}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 