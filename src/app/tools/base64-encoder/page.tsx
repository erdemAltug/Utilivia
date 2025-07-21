'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
    return 'Error: Invalid Base64 input'
  }
}

export default function Base64Encoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Base64 Encoder', url: '/tools/base64-encoder', isLast: true }
  ]

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('')
      return
    }

    if (mode === 'encode') {
      setOutput(encodeBase64(input))
    } else {
      setOutput(decodeBase64(input))
    }
  }

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleSwap = () => {
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  // Auto convert on input change
  React.useEffect(() => {
    if (input.trim()) {
      handleConvert()
    } else {
      setOutput('')
    }
  }, [input, mode])

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Base64 Encoder/Decoder - Online Base64 Converter',
        'https://utilivia.com/tools/base64-encoder',
        'Encode and decode Base64 strings instantly. Free online Base64 converter for developers, API testing, and data transmission.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Base64 Encoder/Decoder
              </h1>
              <p className="text-xl text-gray-600">
                Encode and decode Base64 strings instantly
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Mode Toggle */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setMode('encode')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      mode === 'encode'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => setMode('decode')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      mode === 'decode'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              {/* Input Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    mode === 'encode'
                      ? 'Enter text to encode to Base64...'
                      : 'Enter Base64 string to decode...'
                  }
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono"
                />
              </div>

              {/* Output Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
                  </label>
                  <div className="flex space-x-2">
                    {output && (
                      <>
                        <button
                          onClick={handleCopy}
                          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          Copy
                        </button>
                        <button
                          onClick={handleSwap}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                        >
                          Swap
                        </button>
                      </>
                    )}
                    <button
                      onClick={handleClear}
                      className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 resize-none font-mono text-sm"
                  placeholder={
                    mode === 'encode'
                      ? 'Base64 encoded result will appear here...'
                      : 'Decoded text will appear here...'
                  }
                />
              </div>

              {!input && (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">🔤</div>
                  <p className="text-lg">
                    Enter text above to {mode === 'encode' ? 'encode' : 'decode'}
                  </p>
                </div>
              )}
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Base64 Encoding</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What is Base64?</h3>
                  <p className="text-gray-600 mb-4">
                    Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format. 
                    It's commonly used to encode binary data for transmission over text-based protocols 
                    like HTTP and email.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Use Cases</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Embedding images in HTML/CSS</li>
                    <li>API authentication tokens</li>
                    <li>Email attachments</li>
                    <li>Data URLs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Instant real-time conversion</li>
                    <li>Encode and decode in one tool</li>
                    <li>Copy results with one click</li>
                    <li>Swap input/output easily</li>
                    <li>No file upload required</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Safety & Privacy</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>All processing happens in your browser</li>
                    <li>No data is sent to servers</li>
                    <li>Completely private and secure</li>
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