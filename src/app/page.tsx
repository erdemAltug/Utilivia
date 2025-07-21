
import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import { generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'

const tools = [
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
  // {
  //   id: 'timezone-converter',
  //   name: 'Time Zone Converter',
  //   description: 'Compare time zones like EST→GMT worldwide',
  //   category: 'Date & Time',
  //   difficulty: 4,
  //   icon: '🌍',
  //   searchQueries: ['timezone converter', 'time zone', 'world clock']
  // },
  // {
  //   id: 'currency-converter',
  //   name: 'Currency Converter',
  //   description: 'Real-time currency exchange rates and conversion',
  //   category: 'Finance',
  //   difficulty: 5,
  //   icon: '💱',
  //   searchQueries: ['currency converter', 'exchange rate', 'money converter']
  // },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text to lowercase, UPPERCASE, camelCase formats',
    category: 'Text Tools',
    difficulty: 3,
    icon: '📝',
    searchQueries: ['text case converter', 'uppercase lowercase', 'camelcase']
  },
  // {
  //   id: 'json-formatter',
  //   name: 'JSON Formatter & Validator',
  //   description: 'Format and validate JSON data with error detection',
  //   category: 'Developer Tools',
  //   difficulty: 4,
  //   icon: '🔧',
  //   searchQueries: ['json formatter', 'json validator', 'json beautify']
  // },
  // {
  //   id: 'ip-lookup',
  //   name: 'IP Address Lookup',
  //   description: 'Get location and device information from IP address',
  //   category: 'Network Tools',
  //   difficulty: 3,
  //   icon: '🌐',
  //   searchQueries: ['ip lookup', 'ip address', 'location finder']
  // },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for web design and development',
    category: 'Content Creation',
    difficulty: 3,
    icon: '📄',
    searchQueries: ['lorem ipsum', 'placeholder text', 'dummy text']
  },
  // {
  //   id: 'qr-generator',
  //   name: 'QR Code Generator', 
  //   description: 'Convert text or URL to QR code for marketing and sharing',
  //   category: 'Marketing',
  //   difficulty: 4,
  //   icon: '📱',
  //   searchQueries: ['qr code generator', 'qr code', 'barcode generator']
  // },
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

export default function HomePage() {
  const faqData = [
    {
      question: "Are these utility tools completely free to use?",
      answer: "Yes, all our utility tools are 100% free to use. No registration, no hidden fees, no limitations."
    },
    {
      question: "Do you store or track my data when using the tools?",
      answer: "No, we prioritize your privacy. All calculations are performed locally in your browser and we don't store any personal data."
    },
    {
      question: "Can I use these tools on mobile devices?",
      answer: "Absolutely! All our tools are mobile-responsive and work seamlessly on smartphones and tablets."
    },
    {
      question: "How accurate are the calculations?",
      answer: "Our tools use industry-standard formulas and algorithms to ensure maximum accuracy in all calculations."
    }
  ]

  return (
    <>
      <JsonLD data={generateWebApplicationSchema()} />
      <JsonLD data={generateFAQSchema(faqData)} />
      
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">🛠️ Utilivia</h1>
              <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Free Tools
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#tools" className="text-gray-600 hover:text-gray-900">Tools</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Free Online Utility Tools
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Powerful, fast, and free tools for everyday tasks. Calculate, convert, generate, and optimize - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tools"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Tools
            </a>
            <a
              href="#about"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Tool
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade utilities designed for speed, accuracy, and ease of use.
            </p>
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
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h4>
                  
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
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-gray-600">Instant results with optimized algorithms and modern web technology.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Accurate Results</h4>
              <p className="text-gray-600">Precision-engineered calculations and conversions you can trust.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Privacy First</h4>
              <p className="text-gray-600">All calculations happen in your browser. Your data never leaves your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our free utility tools
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h5 className="text-2xl font-bold mb-4">🛠️ Utilivia</h5>
              <p className="text-gray-400 mb-4">
                Your go-to destination for free, fast, and reliable online utility tools. 
                Simplifying everyday tasks with professional-grade tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Popular Tools</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/tools/bmi-calculator" className="hover:text-white">BMI Calculator</Link></li>
                <li><Link href="/tools/password-generator" className="hover:text-white">Password Generator</Link></li>
                <li><Link href="/tools/unit-converter" className="hover:text-white">Unit Converter</Link></li>
                <li><Link href="/tools/qr-generator" className="hover:text-white">QR Code Generator</Link></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Categories</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Calculators</a></li>
                <li><a href="#" className="hover:text-white">Converters</a></li>
                <li><a href="#" className="hover:text-white">Generators</a></li>
                <li><a href="#" className="hover:text-white">Developer Tools</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Utilivia. All rights reserved. Made with ❤️ for productivity.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
} 