'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo'

// Tüm araçlar
const allTools = [
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index with height and weight',
    category: 'Health & Fitness',
    difficulty: 4,
    icon: '⚖️',
    searchQueries: ['bmi calculator', 'body mass index', 'weight calculator']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age based on birth date with precision',
    category: 'Date & Time',
    difficulty: 3,
    icon: '📅',
    searchQueries: ['age calculator', 'birth date calculator', 'age finder']
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between cm↔inch, kg↔lb, L↔gallon and more',
    category: 'Math & Conversion',
    difficulty: 4,
    icon: '📏',
    searchQueries: ['unit converter', 'metric conversion', 'length converter']
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Real-time currency exchange rates and conversion',
    category: 'Finance',
    difficulty: 5,
    icon: '💱',
    searchQueries: ['currency converter', 'exchange rate', 'money converter']
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text to lowercase, UPPERCASE, camelCase formats',
    category: 'Text Tools',
    difficulty: 3,
    icon: '📝',
    searchQueries: ['text case converter', 'uppercase lowercase', 'camelcase']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format and validate JSON data with error detection',
    category: 'Developer Tools',
    difficulty: 4,
    icon: '🔧',
    searchQueries: ['json formatter', 'json validator', 'json beautify']
  },
  {
    id: 'ip-lookup',
    name: 'IP Address Lookup',
    description: 'Get location and device information from IP address',
    category: 'Network Tools',
    difficulty: 3,
    icon: '🌐',
    searchQueries: ['ip lookup', 'ip address', 'location finder']
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for web design and development',
    category: 'Content Creation',
    difficulty: 3,
    icon: '📄',
    searchQueries: ['lorem ipsum', 'placeholder text', 'dummy text']
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator', 
    description: 'Convert text or URL to QR code for marketing and sharing',
    category: 'Marketing',
    difficulty: 4,
    icon: '📱',
    searchQueries: ['qr code generator', 'qr code', 'barcode generator']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords for all your accounts',
    category: 'Security',
    difficulty: 4,
    icon: '🔒',
    searchQueries: ['password generator', 'secure password', 'strong password']
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encode/Decode',
    description: 'Encode and decode text using Base64 encoding',
    category: 'Developer Tools',
    difficulty: 3,
    icon: '🔐',
    searchQueries: ['base64 encoder', 'base64 decoder', 'encoding']
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Compare time zones like EST→GMT worldwide',
    category: 'Date & Time',
    difficulty: 4,
    icon: '🌍',
    searchQueries: ['timezone converter', 'time zone', 'world clock']
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

export default function ToolsPage() {
  const router = useRouter()
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'All Tools', url: '/tools', isLast: true }
  ]

  // Kategorilere göre araçları grupla
  const toolsByCategory: Record<string, typeof allTools> = {}
  allTools.forEach(tool => {
    if (!toolsByCategory[tool.category]) {
      toolsByCategory[tool.category] = []
    }
    toolsByCategory[tool.category].push(tool)
  })

  return (
    <>
      <JsonLD data={generateWebApplicationSchema()} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                All Utility Tools
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our complete collection of free online utility tools designed to 
                simplify your daily tasks and boost productivity.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for tools..."
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tools by Category */}
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category} className="mb-16">
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                  <div className="ml-4 h-px flex-grow bg-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">{tool.icon}</span>
                          <StarRating rating={tool.difficulty} />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
                            {tool.category}
                          </span>
                          <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
                            Try Now →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{allTools.length}</div>
                  <div className="text-gray-600">Total Tools</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {Object.keys(toolsByCategory).length}
                  </div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-gray-600">Free to Use</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}