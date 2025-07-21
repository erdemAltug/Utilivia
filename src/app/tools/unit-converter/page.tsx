'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
// import { useSearchParams, useRouter } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

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

function UnitConverterContent() {
  // const searchParams = useSearchParams()
  // const router = useRouter()
  
  const [selectedCategory, setSelectedCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<number | null>(null)

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
        'Unit Converter - CM to Meter, KG to LB, Celsius to Fahrenheit',
        'https://utilivia.com/tools/unit-converter',
        'Convert units instantly! CM to meter, inch to cm, kg to pounds, liter to gallon, celsius to fahrenheit. Free online unit converter.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Unit Converter
              </h1>
              <p className="text-xl text-gray-600">
                Convert between different units of measurement instantly
              </p>
            </div>

            <Suspense fallback={
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading converter...</p>
              </div>
            }>
              <UnitConverterContent />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default function UnitConverter() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Unit Converter', url: '/tools/unit-converter', isLast: true }
  ]

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
          
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Unit Converter
              </h1>
              <p className="text-xl text-gray-600">
                Convert between different units of measurement instantly
              </p>
            </div>

            <Suspense fallback={
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading converter...</p>
              </div>
            }>
              <UnitConverterContent />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
} 