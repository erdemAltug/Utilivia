'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import { useSearchParams, useRouter } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

function encodeBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)))
  } catch (error) {
    return 'Error: Invalid input for encoding'
  }
}

function decodeBase64(base64: string): string {
  try {
    return decodeURIComponent(escape(atob(base64)))
  } catch (error) {
    return 'Error: Invalid Base64 string'
  }
}

export default function Base64Encoder() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/#tools' },
    { name: 'Base64 Encode/Decode', url: '/tools/base64-encoder', isLast: true }
  ]

  // Initialize from URL params
  useEffect(() => {
    const modeParam = searchParams.get('mode') as 'encode' | 'decode'
    const textParam = searchParams.get('text')

    if (modeParam && ['encode', 'decode'].includes(modeParam)) {
      setMode(modeParam)
    }
    if (textParam) {
      setInputText(decodeURIComponent(textParam))
    }
  }, [searchParams])

  const updateURL = (newMode?: 'encode' | 'decode', newText?: string) => {
    const params = new URLSearchParams()
    
    const m = newMode ?? mode
    const t = newText ?? inputText

    if (m !== 'encode') params.set('mode', m)
    if (t) params.set('text', encodeURIComponent(t))

    const query = params.toString()
    router.push(`/tools/base64-encoder${query ? `?${query}` : ''}`, { scroll: false })
  }

  const handleConvert = () => {
    if (!inputText.trim()) {
      setResult('')
      return
    }

    const converted = mode === 'encode' 
      ? encodeBase64(inputText)
      : decodeBase64(inputText)
    
    setResult(converted)
    updateURL()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
    updateURL(undefined, value)
    
    // Auto-convert as user types
    if (value.trim()) {
      const converted = mode === 'encode' 
        ? encodeBase64(value)
        : decodeBase64(value)
      setResult(converted)
    } else {
      setResult('')
    }
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Free Base64 Encoder/Decoder - Online Base64 Converter',
        'https://utilivia.com/tools/base64-encoder',
        'Encode and decode Base64 strings instantly. Free online Base64 converter for developers and web professionals.'
      )} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100">
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
            🔐 Base64 Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encode and decode Base64 strings instantly. Perfect for developers, API testing, and data transmission.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => {
                setMode('encode')
                setResult('')
                updateURL('encode')
              }}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === 'encode'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => {
                setMode('decode')
                setResult('')
                updateURL('decode')
              }}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === 'decode'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </h2>
            
            <textarea
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === 'encode' 
                  ? 'Enter text to encode...' 
                  : 'Enter Base64 string to decode...'
              }
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none font-mono text-sm"
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
              <button
                onClick={handleConvert}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
              </h2>
              {result && (
                <button
                  onClick={() => copyToClipboard(result)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  📋 Copy
                </button>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border min-h-48 max-h-48 overflow-y-auto">
              <code className="text-sm text-gray-900 whitespace-pre-wrap break-all">
                {result || 'Result will appear here...'}
              </code>
            </div>
            
            {result && (
              <div className="mt-4 text-sm text-gray-500">
                {result.length} characters
              </div>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Encoding Example</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Original Text:</span>
                  <div className="bg-gray-50 rounded p-2 font-mono text-sm">
                    Hello, World!
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Base64 Encoded:</span>
                  <div className="bg-gray-50 rounded p-2 font-mono text-sm break-all">
                    SGVsbG8sIFdvcmxkIQ==
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Decoding Example</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Base64 String:</span>
                  <div className="bg-gray-50 rounded p-2 font-mono text-sm break-all">
                    VXRpbGl2aWE=
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Decoded Text:</span>
                  <div className="bg-gray-50 rounded p-2 font-mono text-sm">
                    Utilivia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Base64 Encoder/Decoder - Online Converter</h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Base64 is a encoding scheme used to represent binary data in ASCII string format. 
              Our online Base64 encoder/decoder makes it easy to convert between text and Base64 encoding.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Email Attachments:</strong> Encoding binary files for email transmission</li>
              <li><strong>Web Development:</strong> Embedding images and files in HTML/CSS</li>
              <li><strong>API Integration:</strong> Transmitting binary data over HTTP</li>
              <li><strong>Data Storage:</strong> Storing binary data in text-based formats like JSON or XML</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How Base64 Works</h3>
            <p className="mb-4">
              Base64 encoding converts binary data into a text string using 64 ASCII characters: 
              A-Z, a-z, 0-9, +, and /. The = character is used for padding when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 