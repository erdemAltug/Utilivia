'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'

interface ConversionUnit {
  name: string
  symbol: string
  factor: number // factor to convert to base unit
}

interface ConversionCategory {
  name: string
  baseUnit: string
  units: ConversionUnit[]
  popular: { from: string, to: string, query: string }[]
}

const conversionCategories: Record<string, ConversionCategory> = {
  length: {
    name: 'Length / Distance',
    baseUnit: 'meter',
    units: [
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Mile', symbol: 'mi', factor: 1609.34 }
    ],
    popular: [
      { from: 'cm', to: 'm', query: 'cm to meter' },
      { from: 'in', to: 'cm', query: 'inch to cm' },
      { from: 'ft', to: 'm', query: 'feet to meter' },
      { from: 'km', to: 'mi', query: 'km to miles' }
    ]
  },
  weight: {
    name: 'Weight / Mass',
    baseUnit: 'kilogram',
    units: [
      { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { name: 'Stone', symbol: 'st', factor: 6.35029 },
      { name: 'Ton', symbol: 't', factor: 1000 }
    ],
    popular: [
      { from: 'kg', to: 'lb', query: 'kg to pounds' },
      { from: 'lb', to: 'kg', query: 'pounds to kg' },
      { from: 'g', to: 'oz', query: 'grams to ounces' },
      { from: 'oz', to: 'g', query: 'ounces to grams' }
    ]
  },
  volume: {
    name: 'Volume / Capacity',
    baseUnit: 'liter',
    units: [
      { name: 'Milliliter', symbol: 'ml', factor: 0.001 },
      { name: 'Liter', symbol: 'l', factor: 1 },
      { name: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
      { name: 'Gallon (UK)', symbol: 'gal (UK)', factor: 4.54609 },
      { name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735 },
      { name: 'Cup (US)', symbol: 'cup', factor: 0.236588 },
      { name: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
      { name: 'Quart (US)', symbol: 'qt', factor: 0.946353 }
    ],
    popular: [
      { from: 'l', to: 'gal', query: 'liter to gallon' },
      { from: 'ml', to: 'fl oz', query: 'ml to fl oz' },
      { from: 'gal', to: 'l', query: 'gallon to liter' },
      { from: 'cup', to: 'ml', query: 'cup to ml' }
    ]
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'celsius',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { name: 'Kelvin', symbol: 'K', factor: 1 }
    ],
    popular: [
      { from: '°C', to: '°F', query: 'celsius to fahrenheit' },
      { from: '°F', to: '°C', query: 'fahrenheit to celsius' },
      { from: '°C', to: 'K', query: 'celsius to kelvin' },
      { from: 'K', to: '°C', query: 'kelvin to celsius' }
    ]
  }
}

function convertUnits(value: number, fromUnit: ConversionUnit, toUnit: ConversionUnit, category: string): number {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit.symbol, toUnit.symbol)
  }
  
  // Convert to base unit first, then to target unit
  const baseValue = value * fromUnit.factor
  return baseValue / toUnit.factor
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value
  
  // Convert everything to Celsius first
  let celsius = value
  if (from === '°F') {
    celsius = (value - 32) * 5/9
  } else if (from === 'K') {
    celsius = value - 273.15
  }
  
  // Convert from Celsius to target
  if (to === '°F') {
    return celsius * 9/5 + 32
  } else if (to === 'K') {
    return celsius + 273.15
  }
  
  return celsius
}

export default function UnitConverter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [selectedCategory, setSelectedCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/#tools' },
    { name: 'Unit Converter', url: '/tools/unit-converter', isLast: true }
  ]

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'length'
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')
    const valueParam = searchParams.get('value')

    setSelectedCategory(categoryParam)
    
    if (fromParam) setFromUnit(fromParam)
    if (toParam) setToUnit(toParam)
    if (valueParam) setInputValue(valueParam)

    // Auto-select first units if not specified
    const category = conversionCategories[categoryParam]
    if (category) {
      if (!fromParam) setFromUnit(category.units[0].symbol)
      if (!toParam) setToUnit(category.units[1].symbol)
    }
  }, [searchParams])

  const updateURL = (newCategory?: string, newFrom?: string, newTo?: string, newValue?: string) => {
    const params = new URLSearchParams()
    
    const cat = newCategory ?? selectedCategory
    const from = newFrom ?? fromUnit
    const to = newTo ?? toUnit
    const val = newValue ?? inputValue

    if (cat && cat !== 'length') params.set('category', cat)
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    if (val) params.set('value', val)

    const query = params.toString()
    router.push(`/tools/unit-converter${query ? `?${query}` : ''}`, { scroll: false })
  }

  const handleConvert = () => {
    if (!inputValue || !fromUnit || !toUnit) return

    const category = conversionCategories[selectedCategory]
    const fromUnitObj = category.units.find(u => u.symbol === fromUnit)
    const toUnitObj = category.units.find(u => u.symbol === toUnit)

    if (fromUnitObj && toUnitObj) {
      const convertedValue = convertUnits(parseFloat(inputValue), fromUnitObj, toUnitObj, selectedCategory)
      setResult(convertedValue)
      updateURL()
    }
  }

  const handleQuickConversion = (from: string, to: string) => {
    setFromUnit(from)
    setToUnit(to)
    updateURL(undefined, from, to)
  }

  const currentCategory = conversionCategories[selectedCategory]

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Free Unit Converter - Length, Weight, Volume, Temperature',
        'https://utilivia.com/tools/unit-converter',
        'Convert between different units instantly. Support for length (cm to meter), weight (kg to lb), volume (liter to gallon), temperature (celsius to fahrenheit) and more.'
      )} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🛠️</span>
              <span className="text-xl font-bold text-gray-900">Utilivia</span>
            </Link>
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back to Tools
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📏 Unit Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Convert between different units instantly. Length (cm to meter), Weight (kg to lb), Volume (liter to gallon), Temperature (celsius to fahrenheit) and more.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.entries(conversionCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  setResult(null)
                  updateURL(key)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Converter Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">{currentCategory.name} Converter</h2>
            
            {/* Input Value */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  updateURL(undefined, undefined, undefined, e.target.value)
                }}
                placeholder="Enter value to convert"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Unit Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <select
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value)
                    updateURL(undefined, e.target.value)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {currentCategory.units.map(unit => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value)
                    updateURL(undefined, undefined, e.target.value)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {currentCategory.units.map(unit => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={!inputValue}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Convert Units
            </button>

            {/* Result */}
            {result !== null && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {inputValue} {fromUnit} = {result.toFixed(6)} {toUnit}
                  </div>
                  <p className="text-green-700">
                    {result.toFixed(2)} {toUnit} (rounded)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Conversions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Popular {currentCategory.name} Conversions</h3>
            
            <div className="space-y-3">
              {currentCategory.popular.map((conv, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickConversion(conv.from, conv.to)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    {conv.from} → {conv.to}
                  </div>
                  <div className="text-sm text-gray-600">
                    {conv.query}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Converter - Convert Any Unit Instantly</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Length Conversions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>CM to Meter:</strong> Convert centimeters to meters easily</li>
                <li>• <strong>Inch to CM:</strong> Imperial to metric length conversion</li>
                <li>• <strong>Feet to Meter:</strong> Convert feet to meters instantly</li>
                <li>• <strong>KM to Miles:</strong> Distance conversion for travel</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Weight Conversions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>KG to Pounds:</strong> Convert kilograms to pounds</li>
                <li>• <strong>Pounds to KG:</strong> Imperial to metric weight</li>
                <li>• <strong>Grams to Ounces:</strong> Small weight conversions</li>
                <li>• <strong>Ounces to Grams:</strong> Cooking measurements</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Volume Conversions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Liter to Gallon:</strong> Fuel and liquid measurements</li>
                <li>• <strong>ML to FL OZ:</strong> Small volume conversions</li>
                <li>• <strong>Cup to ML:</strong> Recipe conversions</li>
                <li>• <strong>Gallon to Liter:</strong> US to metric volume</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Temperature Conversions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Celsius to Fahrenheit:</strong> Most common temp conversion</li>
                <li>• <strong>Fahrenheit to Celsius:</strong> US to metric temperature</li>
                <li>• <strong>Celsius to Kelvin:</strong> Scientific temperature scale</li>
                <li>• <strong>Kelvin to Celsius:</strong> Lab to everyday temperature</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 