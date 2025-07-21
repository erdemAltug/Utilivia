'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import { useSearchParams, useRouter } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface CaseConversion {
  name: string
  key: string
  description: string
  example: string
}

const conversions: CaseConversion[] = [
  {
    name: 'UPPERCASE',
    key: 'upper',
    description: 'Convert all letters to uppercase/capital letters',
    example: 'HELLO WORLD'
  },
  {
    name: 'lowercase',
    key: 'lower',
    description: 'Convert all letters to lowercase/small letters',
    example: 'hello world'
  },
  {
    name: 'Title Case',
    key: 'title',
    description: 'Capitalize the first letter of each word',
    example: 'Hello World'
  },
  {
    name: 'Sentence case',
    key: 'sentence',
    description: 'Capitalize only the first letter of the sentence',
    example: 'Hello world'
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
    description: 'Capitalize first letter of each word, no spaces',
    example: 'HelloWorld'
  },
  {
    name: 'snake_case',
    key: 'snake',
    description: 'Replace spaces with underscores, all lowercase',
    example: 'hello_world'
  },
  {
    name: 'kebab-case',
    key: 'kebab',
    description: 'Replace spaces with hyphens, all lowercase',
    example: 'hello-world'
  }
]

function convertText(text: string, caseType: string): string {
  if (!text) return ''
  
  switch (caseType) {
    case 'upper':
      return text.toUpperCase()
    case 'lower':
      return text.toLowerCase()
    case 'title':
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case 'camel':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
    case 'pascal':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
        .replace(/^(.)/, (match, chr) => chr.toUpperCase())
    case 'snake':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
    case 'kebab':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    default:
      return text
  }
}

export default function TextCaseConverter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/#tools' },
    { name: 'Text Case Converter', url: '/tools/text-case-converter', isLast: true }
  ]

  // Initialize from URL params
  useEffect(() => {
    const textParam = searchParams.get('text')
    if (textParam) {
      setInputText(decodeURIComponent(textParam))
    }
  }, [searchParams])

  const updateURL = (newText?: string) => {
    const params = new URLSearchParams()
    const text = newText ?? inputText

    if (text) {
      params.set('text', encodeURIComponent(text))
    }

    const query = params.toString()
    router.push(`/tools/text-case-converter${query ? `?${query}` : ''}`, { scroll: false })
  }

  const handleConvert = () => {
    if (!inputText.trim()) return

    const newResults: Record<string, string> = {}
    conversions.forEach(conversion => {
      newResults[conversion.key] = convertText(inputText, conversion.key)
    })
    
    setResults(newResults)
    updateURL()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Free Text Case Converter - UPPERCASE, lowercase, camelCase, snake_case',
        'https://utilivia.com/tools/text-case-converter',
        'Convert text to different cases instantly. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case conversions.'
      )} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📝 Text Case Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert text to different cases instantly. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, and kebab-case.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Enter Your Text</h2>
          
          <div className="mb-4">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value)
                updateURL(e.target.value)
              }}
              placeholder="Type or paste your text here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {inputText.length} characters
            </span>
            <button
              onClick={handleConvert}
              disabled={!inputText.trim()}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Convert Text
            </button>
          </div>
        </div>

        {/* Results Section */}
        {Object.keys(results).length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Converted Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conversions.map((conversion) => (
                <div key={conversion.key} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {conversion.name}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(results[conversion.key] || '')}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                    >
                      📋 Copy
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {conversion.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border">
                    <code className="text-gray-900 break-all">
                      {results[conversion.key] || ''}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Case Converter - All Text Formats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Text Cases</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>UPPERCASE:</strong> ALL CAPITAL LETTERS</li>
                <li>• <strong>lowercase:</strong> all small letters</li>
                <li>• <strong>Title Case:</strong> First Letter Of Each Word</li>
                <li>• <strong>Sentence case:</strong> First letter only</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Programming Cases</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>camelCase:</strong> JavaScript variable names</li>
                <li>• <strong>PascalCase:</strong> Class names and components</li>
                <li>• <strong>snake_case:</strong> Python variable names</li>
                <li>• <strong>kebab-case:</strong> CSS classes and URLs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 