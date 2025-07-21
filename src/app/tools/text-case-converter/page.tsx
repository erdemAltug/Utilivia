'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface CaseConversion {
  name: string
  key: string
  description: string
  example: string
}

const caseConversions: CaseConversion[] = [
  {
    name: 'UPPERCASE',
    key: 'uppercase',
    description: 'Converts all letters to uppercase',
    example: 'HELLO WORLD'
  },
  {
    name: 'lowercase',
    key: 'lowercase', 
    description: 'Converts all letters to lowercase',
    example: 'hello world'
  },
  {
    name: 'Title Case',
    key: 'title',
    description: 'Capitalizes the first letter of each word',
    example: 'Hello World'
  },
  {
    name: 'camelCase',
    key: 'camel',
    description: 'First word lowercase, subsequent words capitalized',
    example: 'helloWorld'
  },
  {
    name: 'PascalCase',
    key: 'pascal',
    description: 'First letter of each word capitalized, no spaces',
    example: 'HelloWorld'
  },
  {
    name: 'snake_case',
    key: 'snake',
    description: 'Words separated by underscores, all lowercase',
    example: 'hello_world'
  },
  {
    name: 'kebab-case',
    key: 'kebab',
    description: 'Words separated by hyphens, all lowercase', 
    example: 'hello-world'
  }
]

function convertText(text: string, caseType: string): string {
  if (!text) return ''

  switch (caseType) {
    case 'uppercase':
      return text.toUpperCase()
    
    case 'lowercase':
      return text.toLowerCase()
    
    case 'title':
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    
    case 'camel':
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, '')
    
    case 'pascal':
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
        .replace(/\s+/g, '')
    
    case 'snake':
      return text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_')
    
    case 'kebab':
      return text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('-')
    
    default:
      return text
  }
}

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState('')
  const [selectedCase, setSelectedCase] = useState('uppercase')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Text Case Converter', url: '/tools/text-case-converter', isLast: true }
  ]

  const convertedText = convertText(inputText, selectedCase)

  const handleCopy = async () => {
    if (convertedText) {
      await navigator.clipboard.writeText(convertedText)
      // You could add a toast notification here
    }
  }

  const handleClear = () => {
    setInputText('')
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Text Case Converter - UPPERCASE, lowercase, camelCase',
        'https://utilivia.com/tools/text-case-converter',
        'Convert text to different cases instantly. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case conversions.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Text Case Converter
              </h1>
              <p className="text-xl text-gray-600">
                Convert text to different case formats instantly
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Input Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Your Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Case Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Case Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {caseConversions.map((conversion) => (
                    <button
                      key={conversion.key}
                      onClick={() => setSelectedCase(conversion.key)}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        selectedCase === conversion.key
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">
                        {conversion.name}
                      </div>
                      <div className="text-xs opacity-75">
                        {conversion.example}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Section */}
              {inputText && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Converted Text
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCopy}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        onClick={handleClear}
                        className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-300 rounded-md p-3 min-h-[100px]">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900">
                      {convertedText}
                    </pre>
                  </div>
                </div>
              )}

              {!inputText && (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg">Enter text above to see the conversion</p>
                </div>
              )}
            </div>

            {/* Case Type Descriptions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Case Types</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseConversions.map((conversion) => (
                  <div key={conversion.key} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {conversion.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {conversion.description}
                    </p>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-sm font-mono text-gray-800">
                        {conversion.example}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>camelCase & PascalCase:</strong> Programming variable and function names</li>
                  <li><strong>snake_case:</strong> Database column names, Python variables</li>
                  <li><strong>kebab-case:</strong> URL slugs, CSS class names</li>
                  <li><strong>UPPERCASE:</strong> Constants, environment variables</li>
                  <li><strong>Title Case:</strong> Headlines, document titles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 