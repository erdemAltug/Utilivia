'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

function generateLorem(type: 'paragraphs' | 'sentences' | 'words', count: number, startWithLorem: boolean): string {
  if (count <= 0) return ''

  const getRandomWords = (num: number): string[] => {
    const words = []
    for (let i = 0; i < num; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words
  }

  const generateSentence = (wordCount: number = Math.floor(Math.random() * 10) + 5): string => {
    const words = getRandomWords(wordCount)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ') + '.'
  }

  const generateParagraph = (sentenceCount: number = Math.floor(Math.random() * 5) + 3): string => {
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(' ')
  }

  let result = []

  switch (type) {
    case 'words':
      const words = getRandomWords(count)
      if (startWithLorem) {
        words[0] = 'Lorem'
        words[1] = 'ipsum'
      }
      result = [words.join(' ')]
      break

    case 'sentences':
      for (let i = 0; i < count; i++) {
        result.push(generateSentence())
      }
      if (startWithLorem) {
        result[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
      break

    case 'paragraphs':
      for (let i = 0; i < count; i++) {
        result.push(generateParagraph())
      }
      if (startWithLorem) {
        result[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      }
      break
  }

  return result.join('\n\n')
}

export default function LoremGenerator() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [generatedText, setGeneratedText] = useState('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Lorem Generator', url: '/tools/lorem-generator', isLast: true }
  ]

  const handleGenerate = () => {
    const text = generateLorem(type, count, startWithLorem)
    setGeneratedText(text)
  }

  const handleCopy = async () => {
    if (generatedText) {
      await navigator.clipboard.writeText(generatedText)
    }
  }

  const handleClear = () => {
    setGeneratedText('')
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Lorem Ipsum Generator - Placeholder Text for Web Design',
        'https://utilivia.com/tools/lorem-generator',
        'Generate Lorem Ipsum placeholder text instantly. Create custom paragraphs, sentences, or words for web design and development.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Lorem Ipsum Generator
              </h1>
              <p className="text-xl text-gray-600">
                Generate placeholder text for your web design projects
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Generator Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'paragraphs' | 'sentences' | 'words')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Count
                  </label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={startWithLorem}
                      onChange={(e) => setStartWithLorem(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Start with "Lorem ipsum"
                    </span>
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleGenerate}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Generate Lorem Ipsum
                </button>
              </div>

              {/* Generated Text Output */}
              {generatedText && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Generated Text
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
                  <div className="bg-gray-50 border border-gray-300 rounded-md p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans leading-relaxed">
                      {generatedText}
                    </pre>
                  </div>
                </div>
              )}

              {!generatedText && (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-lg">Click generate to create Lorem Ipsum text</p>
                </div>
              )}
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Lorem Ipsum</h2>
              
              <p className="text-gray-600 mb-4">
                Lorem Ipsum is placeholder text commonly used in the printing and typesetting industry. 
                It has been the industry standard dummy text since the 1500s, when an unknown printer 
                took a galley of type and scrambled it to make a type specimen book.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why Use Lorem Ipsum?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Focus on Design:</strong> Prevents distraction from content when focusing on layout</li>
                <li><strong>Standard Length:</strong> Provides predictable text length for testing layouts</li>
                <li><strong>Language Neutral:</strong> Doesn't favor any particular language</li>
                <li><strong>Professional:</strong> Industry standard for placeholder text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} // Deploy trigger
