'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface ConversionUnit {
  name: string
  symbol: string
  factor: number
}

interface ConversionCategory {
  name: string
  units: ConversionUnit[]
}

const conversionCategories: Record<string, ConversionCategory> = {
  length: {
    name: 'Length',
    units: [
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Mile', symbol: 'mi', factor: 1609.344 }
    ]
  },
  weight: {
    name: 'Weight',
    units: [
      { name: 'Gram', symbol: 'g', factor: 1 },
      { name: 'Kilogram', symbol: 'kg', factor: 1000 },
      { name: 'Ounce', symbol: 'oz', factor: 28.3495 },
      { name: 'Pound', symbol: 'lb', factor: 453.592 },
      { name: 'Stone', symbol: 'st', factor: 6350.29 },
      { name: 'Ton', symbol: 't', factor: 1000000 }
    ]
  },
  temperature: {
    name: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { name: 'Kelvin', symbol: 'K', factor: 1 }
    ]
  },
  volume: {
    name: 'Volume',
    units: [
      { name: 'Milliliter', symbol: 'ml', factor: 1 },
      { name: 'Liter', symbol: 'l', factor: 1000 },
      { name: 'Fluid Ounce', symbol: 'fl oz', factor: 29.5735 },
      { name: 'Cup', symbol: 'cup', factor: 236.588 },
      { name: 'Pint', symbol: 'pt', factor: 473.176 },
      { name: 'Quart', symbol: 'qt', factor: 946.353 },
      { name: 'Gallon', symbol: 'gal', factor: 3785.41 }
    ]
  }
}

function convertUnits(value: number, fromUnit: string, toUnit: string, category: string): number {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit)
  }

  const categoryData = conversionCategories[category]
  const fromFactor = categoryData.units.find(u => u.symbol === fromUnit)?.factor || 1
  const toFactor = categoryData.units.find(u => u.symbol === toUnit)?.factor || 1
  
  return (value * fromFactor) / toFactor
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value
  
  // Convert to Celsius first
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
  const [selectedCategory, setSelectedCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('cm')
  const [toUnit, setToUnit] = useState('m')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Unit Converter', url: '/tools/unit-converter', isLast: true }
  ]

  const currentCategory = conversionCategories[selectedCategory]

  const handleConvert = () => {
    const value = parseFloat(inputValue)
    if (!isNaN(value)) {
      const converted = convertUnits(value, fromUnit, toUnit, selectedCategory)
      setResult(converted)
    }
  }

  const handleClear = () => {
    setInputValue('')
    setResult(null)
  }

  // Auto convert on input change
  React.useEffect(() => {
    if (inputValue && !isNaN(parseFloat(inputValue))) {
      const converted = convertUnits(parseFloat(inputValue), fromUnit, toUnit, selectedCategory)
      setResult(converted)
    } else {
      setResult(null)
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory])

  // Reset units when category changes
  React.useEffect(() => {
    if (currentCategory.units.length > 0) {
      setFromUnit(currentCategory.units[0].symbol)
      setToUnit(currentCategory.units[1]?.symbol || currentCategory.units[0].symbol)
    }
  }, [selectedCategory])

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Unit Converter - CM to Meter, KG to LB, Celsius to Fahrenheit',
        'https://utilivia.com/tools/unit-converter',
        'Convert units instantly! CM to meter, inch to cm, kg to pounds, liter to gallon, celsius to fahrenheit. Free online unit converter.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Unit Converter
              </h1>
              <p className="text-xl text-gray-600">
                Convert between different units of measurement instantly
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(conversionCategories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === key
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Value */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Value
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value to convert"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {currentCategory.units.map(unit => (
                      <option key={unit.symbol} value={unit.symbol}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result */}
              {result !== null && inputValue && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {inputValue} {fromUnit} = {result.toFixed(6)} {toUnit}
                    </div>
                    <p className="text-blue-700">
                      {result.toFixed(2)} {toUnit} (rounded)
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleConvert}
                  disabled={!inputValue}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Convert
                </button>
                <button
                  onClick={handleClear}
                  className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors font-medium"
                >
                  Clear
                </button>
              </div>

              {!inputValue && (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">📏</div>
                  <p className="text-lg">Enter a value above to convert units</p>
                </div>
              )}
            </div>

            {/* Popular Conversions - SEO Link Building */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Unit Conversions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Length Conversions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Length</h3>
                  <div className="space-y-2">
                    <Link href="/tools/unit-converter/cm/to/meter" className="block text-blue-600 hover:text-blue-800 text-sm">
                      CM to Meter →
                    </Link>
                    <Link href="/tools/unit-converter/inch/to/cm" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Inch to CM →
                    </Link>
                    <Link href="/tools/unit-converter/ft/to/meter" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Feet to Meter →
                    </Link>
                    <Link href="/tools/unit-converter/km/to/mile" className="block text-blue-600 hover:text-blue-800 text-sm">
                      KM to Miles →
                    </Link>
                    <Link href="/tools/unit-converter/meter/to/cm" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Meter to CM →
                    </Link>
                    <Link href="/tools/unit-converter/mile/to/km" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Miles to KM →
                    </Link>
                  </div>
                </div>

                {/* Weight Conversions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Weight</h3>
                  <div className="space-y-2">
                    <Link href="/tools/unit-converter/kg/to/lb" className="block text-blue-600 hover:text-blue-800 text-sm">
                      KG to Pounds →
                    </Link>
                    <Link href="/tools/unit-converter/lb/to/kg" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Pounds to KG →
                    </Link>
                    <Link href="/tools/unit-converter/gram/to/oz" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Grams to Ounces →
                    </Link>
                    <Link href="/tools/unit-converter/oz/to/gram" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Ounces to Grams →
                    </Link>
                    <Link href="/tools/unit-converter/kg/to/gram" className="block text-blue-600 hover:text-blue-800 text-sm">
                      KG to Grams →
                    </Link>
                    <Link href="/tools/unit-converter/ton/to/kg" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Ton to KG →
                    </Link>
                  </div>
                </div>

                {/* Temperature Conversions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Temperature</h3>
                  <div className="space-y-2">
                    <Link href="/tools/unit-converter/celsius/to/fahrenheit" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Celsius to Fahrenheit →
                    </Link>
                    <Link href="/tools/unit-converter/fahrenheit/to/celsius" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Fahrenheit to Celsius →
                    </Link>
                    <Link href="/tools/unit-converter/celsius/to/kelvin" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Celsius to Kelvin →
                    </Link>
                    <Link href="/tools/unit-converter/kelvin/to/celsius" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Kelvin to Celsius →
                    </Link>
                    <Link href="/tools/unit-converter/fahrenheit/to/kelvin" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Fahrenheit to Kelvin →
                    </Link>
                    <Link href="/tools/unit-converter/kelvin/to/fahrenheit" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Kelvin to Fahrenheit →
                    </Link>
                  </div>
                </div>

                {/* Volume Conversions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Volume</h3>
                  <div className="space-y-2">
                    <Link href="/tools/unit-converter/liter/to/gallon" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Liter to Gallon →
                    </Link>
                    <Link href="/tools/unit-converter/gallon/to/liter" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Gallon to Liter →
                    </Link>
                    <Link href="/tools/unit-converter/ml/to/floz" className="block text-blue-600 hover:text-blue-800 text-sm">
                      ML to FL OZ →
                    </Link>
                    <Link href="/tools/unit-converter/cup/to/ml" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Cup to ML →
                    </Link>
                    <Link href="/tools/unit-converter/floz/to/ml" className="block text-blue-600 hover:text-blue-800 text-sm">
                      FL OZ to ML →
                    </Link>
                    <Link href="/tools/unit-converter/pint/to/liter" className="block text-blue-600 hover:text-blue-800 text-sm">
                      Pint to Liter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* All Conversions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Available Conversions</h2>
              <p className="text-gray-600 mb-4">
                Our unit converter supports hundreds of conversion combinations. Click on any conversion below to get started:
              </p>
              
              <div className="text-center">
                <Link 
                  href="/tools/unit-converter/cm/to/meter"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mr-4 mb-2"
                >
                  Browse All Length Conversions
                </Link>
                <Link 
                  href="/tools/unit-converter/kg/to/lb"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mr-4 mb-2"
                >
                  Browse All Weight Conversions
                </Link>
                <Link 
                  href="/tools/unit-converter/celsius/to/fahrenheit"
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium mr-4 mb-2"
                >
                  Browse All Temperature Conversions
                </Link>
                <Link 
                  href="/tools/unit-converter/liter/to/gallon"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium mb-2"
                >
                  Browse All Volume Conversions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 