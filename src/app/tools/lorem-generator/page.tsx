'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import { useSearchParams, useRouter } from 'next/navigation'
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
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
  'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
  'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo', 'nemo',
  'ipsam', 'quia', 'voluptas', 'aspernatur', 'odit', 'aut', 'fugit'
]

function generateLorem(type: 'words' | 'sentences' | 'paragraphs', count: number): string {
  const getRandomWords = (wordCount: number): string => {
    const words = []
    for (let i = 0; i < wordCount; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words.join(' ')
  }

  const generateSentence = (): string => {
    const wordCount = Math.floor(Math.random() * 10) + 8 // 8-17 words per sentence
    const sentence = getRandomWords(wordCount)
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
  }

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4 // 4-7 sentences per paragraph
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(' ')
  }

  switch (type) {
    case 'words':
      return getRandomWords(count)
    case 'sentences':
      const sentences = []
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence())
      }
      return sentences.join(' ')
    case 'paragraphs':
      const paragraphs = []
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph())
      }
      return paragraphs.join('\n\n')
    default:
      return ''
  }
}

export default function LoremGenerator() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [result, setResult] = useState('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/#tools' },
    { name: 'Lorem Ipsum Generator', url: '/tools/lorem-generator', isLast: true }
  ]

  // Initialize from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type') as 'words' | 'sentences' | 'paragraphs'
    const countParam = searchParams.get('count')
    const loremParam = searchParams.get('lorem')

    if (typeParam && ['words', 'sentences', 'paragraphs'].includes(typeParam)) {
      setType(typeParam)
    }
    if (countParam) setCount(parseInt(countParam))
    if (loremParam !== null) setStartWithLorem(loremParam === 'true')
  }, [searchParams])

  const updateURL = (newType?: 'words' | 'sentences' | 'paragraphs', newCount?: number, newLorem?: boolean) => {
    const params = new URLSearchParams()
    
    const t = newType ?? type
    const c = newCount ?? count
    const l = newLorem ?? startWithLorem

    if (t && t !== 'paragraphs') params.set('type', t)
    if (c && c !== 3) params.set('count', c.toString())
    if (!l) params.set('lorem', 'false')

    const query = params.toString()
    router.push(`/tools/lorem-generator${query ? `?${query}` : ''}`, { scroll: false })
  }

  const handleGenerate = () => {
    let generated = generateLorem(type, count)
    
    if (startWithLorem && type === 'paragraphs') {
      generated = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ${generated.substring(generated.indexOf(' ') + 1)}`
    }
    
    setResult(generated)
    updateURL()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Free Lorem Ipsum Generator - Placeholder Text for Web Design',
        'https://utilivia.com/tools/lorem-generator',
        'Generate Lorem Ipsum placeholder text for web design and development. Create custom paragraphs, sentences, or words instantly.'
      )} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />

    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
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
            📄 Lorem Ipsum Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate placeholder text for web design and development. Create custom Lorem Ipsum paragraphs, sentences, or words instantly.
          </p>
        </div>

        {/* Generator Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Generate Lorem Ipsum</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generate
              </label>
              <select
                value={type}
                onChange={(e) => {
                  const newType = e.target.value as 'words' | 'sentences' | 'paragraphs'
                  setType(newType)
                  updateURL(newType)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            {/* Count Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many?
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => {
                  const newCount = parseInt(e.target.value) || 1
                  setCount(newCount)
                  updateURL(undefined, newCount)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Start with Lorem checkbox */}
            <div className="flex items-center justify-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => {
                    setStartWithLorem(e.target.checked)
                    updateURL(undefined, undefined, e.target.checked)
                  }}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Start with "Lorem ipsum"</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium"
          >
            Generate Lorem Ipsum
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Text</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {result.split(' ').length} words, {result.length} characters
                </span>
                <button
                  onClick={copyToClipboard}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm"
                >
                  📋 Copy
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border max-h-64 overflow-y-auto">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {result}
              </p>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lorem Ipsum Generator - Placeholder Text Tool</h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Lorem Ipsum is the industry standard placeholder text used in web design, graphic design, and publishing. 
              Our generator creates custom Lorem Ipsum text for your projects, mockups, and layouts.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why Use Lorem Ipsum?</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Focus on Design:</strong> Prevents content from distracting during design</li>
              <li><strong>Standard Practice:</strong> Industry standard since the 1500s</li>
              <li><strong>Uniform Length:</strong> Consistent word and letter distribution</li>
              <li><strong>Professional:</strong> Used by designers and developers worldwide</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Use Cases</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Website mockups and wireframes</li>
              <li>Print design layouts</li>
              <li>App interface development</li>
              <li>Content management system testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 