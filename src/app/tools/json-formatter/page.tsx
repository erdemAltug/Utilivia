'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

export default function JSONFormatter() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string>('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'JSON Formatter', url: '/tools/json-formatter', isLast: true }
  ]

  const formatJSON = () => {
    try {
      if (!input.trim()) {
        setOutput('')
        setIsValid(null)
        setError('')
        return
      }
      
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setIsValid(true)
      setError('')
    } catch (err: any) {
      setOutput('')
      setIsValid(false)
      setError(err.message)
    }
  }

  const minifyJSON = () => {
    try {
      if (!input.trim()) {
        setOutput('')
        setIsValid(null)
        setError('')
        return
      }
      
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setIsValid(true)
      setError('')
    } catch (err: any) {
      setOutput('')
      setIsValid(false)
      setError(err.message)
    }
  }

  const validateJSON = () => {
    try {
      if (!input.trim()) {
        setIsValid(null)
        setError('')
        return
      }
      
      JSON.parse(input)
      setIsValid(true)
      setError('')
    } catch (err: any) {
      setIsValid(false)
      setError(err.message)
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setIsValid(null)
    setError('')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const sampleJSON = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "skills": [
    "JavaScript",
    "React",
    "Node.js"
  ],
  "address": {
    "street": "123 Main St",
    "zipcode": "10001"
  },
  "isActive": true
}`

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'JSON Formatter & Validator - Beautify & Minify JSON',
        'https://utilivia.com/tools/json-formatter',
        'Format, validate, and minify JSON data instantly. Free online JSON formatter with syntax highlighting and error detection.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                JSON Formatter & Validator
              </h1>
              <p className="text-xl text-gray-600">
                Format, validate, and minify JSON data
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Controls */}
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={formatJSON}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Format JSON
                </button>
                <button
                  onClick={minifyJSON}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Minify JSON
                </button>
                <button
                  onClick={validateJSON}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Validate JSON
                </button>
                <button
                  onClick={clearAll}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setInput(sampleJSON)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Load Sample
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Input JSON
                    </label>
                    <button
                      onClick={() => copyToClipboard(input)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Copy
                    </button>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste your JSON here..."
                    className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  />
                </div>

                {/* Output */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Output
                    </label>
                    <button
                      onClick={() => copyToClipboard(output)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      value={output}
                      readOnly
                      placeholder="Formatted JSON will appear here..."
                      className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-gray-50"
                    />
                    {isValid === false && (
                      <div className="absolute top-3 right-3 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        Invalid JSON
                      </div>
                    )}
                    {isValid === true && (
                      <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Valid JSON
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              {isValid !== null && (
                <div className={`mt-6 p-4 rounded-lg ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-5 w-5 ${isValid ? 'text-green-400' : 'text-red-400'}`}>
                      {isValid ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                        {isValid ? 'Valid JSON' : 'Invalid JSON'}
                      </h3>
                      {!isValid && error && (
                        <div className="mt-2 text-sm text-red-700">
                          <p>Error: {error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* JSON Tips */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">JSON Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Formatting Guidelines</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use consistent indentation (2 or 4 spaces)</li>
                    <li>Add trailing commas for cleaner diffs</li>
                    <li>Keep line lengths reasonable for readability</li>
                    <li>Group related properties together</li>
                    <li>Use meaningful property names</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Mistakes</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Missing commas between properties</li>
                    <li>Trailing commas in older browsers</li>
                    <li>Using single quotes instead of double quotes</li>
                    <li>Comments in JSON (not supported)</li>
                    <li>Trailing commas at the end of objects/arrays</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About JSON Formatting</h2>
              
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  JSON (JavaScript Object Notation) is a lightweight data-interchange format that is 
                  easy for humans to read and write and easy for machines to parse and generate. 
                  Our JSON formatter helps you beautify, validate, and minify JSON data for 
                  development, debugging, and data processing tasks.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why Format JSON?</h3>
                <p className="mb-4">
                  Properly formatted JSON improves readability, reduces errors, and makes debugging easier. 
                  Whether you're working with APIs, configuration files, or data storage, formatting 
                  ensures your JSON is clean and maintainable.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">JSON vs XML</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>JSON is more compact than XML</li>
                  <li>JSON is faster to parse</li>
                  <li>JSON supports arrays natively</li>
                  <li>XML supports comments and namespaces</li>
                  <li>JSON is language-independent</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Advanced JSON Operations</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Transform JSON structures with mapping</li>
                  <li>Filter and query JSON data</li>
                  <li>Convert between JSON and other formats</li>
                  <li>Validate JSON against schemas</li>
                  <li>Compress large JSON datasets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}