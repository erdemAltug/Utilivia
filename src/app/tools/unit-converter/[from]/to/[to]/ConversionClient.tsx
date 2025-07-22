'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface ConversionUnit {
  name: string
  symbol: string
  factor: number
  category: string
}

interface Props {
  fromUnit: ConversionUnit
  toUnit: ConversionUnit
  params: {
    from: string
    to: string
  }
  allUnits: ConversionUnit[]
}

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

export default function ConversionClient({ fromUnit, toUnit, params, allUnits }: Props) {
  const [inputValue, setInputValue] = useState('1')
  const [result, setResult] = useState<number | null>(null)
  
  const conversionTitle = `${fromUnit.name} to ${toUnit.name}`
  
  useEffect(() => {
    if (inputValue && !isNaN(parseFloat(inputValue))) {
      const converted = convertUnits(parseFloat(inputValue), fromUnit, toUnit)
      setResult(converted)
    } else {
      setResult(null)
    }
  }, [inputValue, fromUnit, toUnit])
  
  const examples = [
    { input: 1, label: '1' },
    { input: 10, label: '10' },
    { input: 100, label: '100' },
    { input: 1000, label: '1000' }
  ]

  return (
    <>
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
    </>
  )
} 