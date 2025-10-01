
import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import { generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utilivia - Free Online Utility Tools',
  description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator, age calculator and more useful tools.',
  keywords: ['utility tools', 'calculator', 'converter', 'BMI calculator', 'unit converter', 'password generator', 'free online tools'],
  openGraph: {
    title: 'Utilivia - Free Online Utility Tools',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator and more.',
    url: 'https://utilivia.com',
    siteName: 'Utilivia',
    images: [
      {
        url: 'https://utilivia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Utilivia - Free Online Utility Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utilivia - Free Online Utility Tools',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator and more.',
    images: ['https://utilivia.com/og-image.jpg'],
  },
}

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
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Compare time zones like EST→GMT worldwide',
    category: 'Date & Time',
    difficulty: 4,
    icon: '🌍',
    searchQueries: ['timezone converter', 'time zone', 'world clock']
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                🛠️ <span className="ml-2">Utilivia</span>
              </h1>
              <span className="ml-3 bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2 py-1 rounded">
                Free Tools
              </span>
            </div>
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#tools" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Tools</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">FAQ</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
            </nav>
            <button className="md:hidden text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium">New tools added weekly</span>
          </div>
          
          <div>
            <h6 className="font-semibold text-lg mb-6">Resources</h6>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Free Online <span className="text-yellow-300">Utility Tools</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Powerful, fast, and free tools for everyday tasks. Calculate, convert, generate, and optimize - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#tools"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Explore Tools
            </a>
            <a
              href="#features"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1"
            >
              Discover Features
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">✓ No Registration</span>
            <span className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">✓ 100% Free</span>
            <span className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">✓ Privacy First</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-1 mb-4">
              <span className="text-sm font-semibold">OUR TOOLS</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-blue-600">Tool</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade utilities designed for speed, accuracy, and ease of use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-2 transform"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{tool.icon}</span>
                    <StarRating rating={tool.difficulty} />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h4>
                  
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                    <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 flex items-center">
                      Try Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/tools"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              View All Tools
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-1 mb-4">
              <span className="text-sm font-semibold">WHY CHOOSE US</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful <span className="text-blue-600">Features</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for efficient and secure utility calculations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Lightning Fast</h4>
              <p className="text-gray-600">Instant results with optimized algorithms and modern web technology.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">🎯</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Accurate Results</h4>
              <p className="text-gray-600">Precision-engineered calculations and conversions you can trust.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <span className="text-3xl">🔒</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Privacy First</h4>
              <p className="text-gray-600">All calculations happen in your browser. Your data never leaves your device.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-yellow-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
                <span className="text-3xl">📱</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Mobile Friendly</h4>
              <p className="text-gray-600">Fully responsive design works perfectly on all devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-1 mb-4">
              <span className="text-sm font-semibold">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our free utility tools
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Still Have Questions? Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <h5 className="text-2xl font-bold">🛠️ Utilivia</h5>
              </div>
              <p className="text-gray-400 mb-6 max-w-lg">
                Your go-to destination for free, fast, and reliable online utility tools.
                Simplifying everyday tasks with professional-grade tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold text-lg mb-6">Popular Tools</h6>
              <ul className="space-y-3">
                <li><Link href="/tools/bmi-calculator" className="text-gray-400 hover:text-white transition-colors">BMI Calculator</Link></li>
                <li><Link href="/tools/password-generator" className="text-gray-400 hover:text-white transition-colors">Password Generator</Link></li>
                <li><Link href="/tools/unit-converter" className="text-gray-400 hover:text-white transition-colors">Unit Converter</Link></li>
                <li><Link href="/tools/currency-converter" className="text-gray-400 hover:text-white transition-colors">Currency Converter</Link></li>
                <li><Link href="/tools/qr-generator" className="text-gray-400 hover:text-white transition-colors">QR Code Generator</Link></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold text-lg mb-6">Resources</h6>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors">Resource Hub</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Utilivia. All rights reserved. Made with ❤️ for productivity.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
} 